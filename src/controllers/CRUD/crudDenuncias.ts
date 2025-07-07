// Importa los modelos de la base de datos
import victimas from '../../models/victimas'
import victimario from '../../models/victimario'
import denuncia from '../../models/denuncias'
import terceros from '../../models/terceros'
import { deleteVictimario } from './crudVictimarios'
import { deleteVictima } from './crudVictimas'
import { deleteTercero } from './crudTerceros'
import { agregarActividadReciente } from './crudActividadReciente'
import path from 'path'

const formidable = require('formidable'); //Módulo para formularios
const fs = require('fs') //Módulo para guardar imagenes


// Obtener denuncias
export const getDenuncias = async (req, res) => {
    interface Query {
        fecha?: {
            $gte?: string;
            $lte?: string;
        };
        _id?: string;
        numero_de_expediente?: string;
        is_expediente_completo?: boolean;
        unidad_de_carga?: string;
        municipio?: string;
        jurisdiccion_policial?: string
        relacion_victima_victimario?: string
        aprehension?: boolean
    }
    // Obtener los parámetros de la URL
    const { desde, hasta, numero_de_expediente, is_expediente_completo, id_denuncia, division, municipio, comisaria, manual, relacion_victima_victimario, aprehension } = req.params;
    // Crear el objeto de consulta
    const query: Query = {};

    // Si se ingresó un valor, se agrega a la consulta
    if (desde !== 'no_ingresado') {
        query.fecha = { $gte: desde };
    }

    // Si se ingresó un valor, se agrega a la consulta
    if (hasta !== 'no_ingresado') {
        query.fecha = query.fecha || {};
        query.fecha.$lte = hasta;
    }

    // Si se ingresó un valor, se agrega a la consulta
    if (id_denuncia !== 'no_ingresado') {
        query._id = id_denuncia;
    }

    if (numero_de_expediente !== 'no_ingresado') {
        query.numero_de_expediente = numero_de_expediente;
    }

    if (is_expediente_completo !== 'no_ingresado') {
        query.is_expediente_completo = !is_expediente_completo;
    }
    if (division !== 'no_ingresado') {
        query.unidad_de_carga = division
    }
    if (municipio !== 'no_ingresado') {
        query.municipio = municipio
    }
    if (comisaria !== 'no_ingresado') {
        query.jurisdiccion_policial = comisaria
    }
    if (relacion_victima_victimario !== 'no_ingresado') {
        query.relacion_victima_victimario = relacion_victima_victimario
    }
    if (aprehension !== 'no_ingresado') {
        query.aprehension = aprehension === 'true' ? true : false
    }
    // Obtener las denuncias
    try {

        const denuncias = await denuncia.find(query);
        if (manual) {
            // Agrega a la actividad reciente
            await agregarActividadReciente(`Búsqueda de denuncias`, "Denuncia", `Varias`, req.cookies)
        }
        res.json(denuncias);
    } catch (error) {
        // Error al obtener las denuncias
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }

}

// Obtener denuncias
export const getDenunciasPlus = async (req, res) => {
    interface Query {
        fecha?: {
            $gte?: string;
            $lte?: string;
        };
        _id?: string;
        numero_de_expediente?: string;
        is_expediente_completo?: boolean;
        unidad_de_carga?: string;
        municipio?: string;
        jurisdiccion_policial?: string
        relacion_victima_victimario?: string
        aprehension?: boolean
    }
    // Obtener los parámetros de la URL
    const { desde, hasta, numero_de_expediente, is_expediente_completo, id_denuncia, division, municipio, comisaria, relacion_victima_victimario, aprehension } = req.params;
    
    // Crear el objeto de consulta
    const query: Query = {};

    // Si se ingresó un valor, se agrega a la consulta
    if (desde !== 'no_ingresado') {
        query.fecha = { $gte: desde };
    }

    // Si se ingresó un valor, se agrega a la consulta
    if (hasta !== 'no_ingresado') {
        query.fecha = query.fecha || {};
        query.fecha.$lte = hasta;
    }

    // Si se ingresó un valor, se agrega a la consulta
    if (id_denuncia !== 'no_ingresado') {
        query._id = id_denuncia;
    }

    if (numero_de_expediente !== 'no_ingresado') {
        query.numero_de_expediente = numero_de_expediente;
    }

    if (is_expediente_completo !== 'no_ingresado') {
        query.is_expediente_completo = !is_expediente_completo;
    }
    if (division !== 'no_ingresado') {
        query.unidad_de_carga = division
    }
    if (municipio !== 'no_ingresado') {
        query.municipio = municipio
    }
    if (comisaria !== 'no_ingresado') {
        query.jurisdiccion_policial = comisaria
    }
    if (relacion_victima_victimario !== 'no_ingresado') {
        query.relacion_victima_victimario = relacion_victima_victimario
    }
    if (aprehension !== 'no_ingresado') {
        query.aprehension = aprehension === 'true' ? true : false
    }
    // Obtener las denuncias
  try {

    let denuncias: any[] = await denuncia.find(query);

    // Usamos map para procesar todo en paralelo
    denuncias = await Promise.all(
        denuncias.map(async (den) => {
            const victimaFind = await victimas.findById(den.victima_ID);
            const victimarioFind = await victimario.findById(den.victimario_ID);

            let tercero = null;
            if (den.tercero_ID != "Sin tercero") {
                tercero = await terceros.findById(den.tercero_ID);
            }

            return {
                ...den.toObject(), // importante si es un doc de Mongoose
                Victima: victimaFind,
                Victimario: victimarioFind,
                Tercero: tercero,
            };
        })
    );

    res.json(denuncias);

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error' });
}

}

// Obtener denuncias del usuario para mostrarlos
export const getMisDenuncias = async (req, res) => {

    // Query con consultas opcionales para filtrar
    interface Query {
        denunciada_cargada_por: string;
        fecha?: {
            $gte?: string;
            $lte?: string;
        };
        numero_de_expediente?: string;
        is_expediente_completo?: boolean;
    }
    // Obtener los parámetros de la URL
    const { desde, hasta, numero_de_expediente, is_expediente_completo } = req.params;

    // Crear el objeto de consulta
    const query: Query = { denunciada_cargada_por: req.user.id };

    // Si se ingresó un valor, se agrega a la consulta
    if (desde !== 'no_ingresado') {
        query.fecha = { $gte: desde };
    }

    if (hasta !== 'no_ingresado') {
        query.fecha = query.fecha || {};
        query.fecha.$lte = hasta;
    }

    if (numero_de_expediente !== 'no_ingresado') {
        query.numero_de_expediente = numero_de_expediente;
    }

    if (is_expediente_completo !== 'no_ingresado') {
        query.is_expediente_completo = !is_expediente_completo;
    }

    // Obtener las denuncias
    try {
        const denuncias = await denuncia.find(query);
        res.json(denuncias);
    } catch (error) {
        // Error al obtener las denuncias
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }
}

// Crear denuncias
export const createDenuncia = async (req, res) => {
    const form = new formidable.IncomingForm()

    try {
        form.parse(req, async (err, fields, files) => {

            // Obtener los datos de la denuncia

            const { user_id, modo_actuacion, victima_ID, victimario_ID, tercero_ID, nombre_victima, apellido_victima, nombre_victimario, apellido_victimario, dni_victima, dni_victimario, vinculo_con_agresor_victima, convivencia, dependencia_economica, genero, fecha, direccion, GIS, barrio, tipo_de_lugar, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, juzgado_interviniente_numero, dependencia_derivada, violencia, modalidades, empleo_de_armas, arma_empleada, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio,
                derecho_de_comunicacion, ninguna_solicitada, restitucion_de_bienes,  boton_antipanico, prohibicion_de_acercamiento_dispuesta, exclusion_de_hogar_dispuesta, boton_antipanico_dispuesta, solicitud_de_aprehension_dispuesta, expedientes_con_cautelar_dispuesta, aprehension, denunciado_por_tercero, dni_tercero, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, is_expediente_completo, politica, cantidad_hijos_con_agresor, en_libertad, cese_de_hostigamiento, notificacion_expediente, ninguna } = fields
            // Buscar si la victima y victimario ya existen        
            const findVictima = await victimas.findOne({ DNI: dni_victima[0] })
            let findVictimario


            // Si el DNI del victimario es S/N, se asigna el ID del victimario
            if (dni_victimario == "S/N") {
                findVictimario = await victimario.findById(victimario_ID[0])
            } else {
                findVictimario = await victimario.findOne({ DNI: dni_victimario[0] })
            }
            // Busca al tercero por dni si este ya existe
            let findTercero, IdTercero
            if (denunciado_por_tercero) {
                findTercero = await terceros.findOne({ DNI: dni_tercero })
                IdTercero = findTercero?._id ? findTercero._id : tercero_ID
            }
            // Si el tercero no existe, se crea uno nuevo
            // Crear la denuncia
            const newDenuncia = new denuncia({
                victima_ID: findVictima?._id ? findVictima._id : victima_ID[0],
                victimario_ID: findVictimario?._id ? findVictimario._id : victimario_ID[0],
                victima_nombre: findVictima ? (findVictima.nombre[0] + ' ' + findVictima.apellido[0]) : (nombre_victima[0] + ' ' + apellido_victima[0]),
                victimario_nombre: findVictimario ? (findVictimario.nombre[0] + ' ' + findVictimario.apellido[0]) : (nombre_victimario[0] + ' ' + apellido_victimario[0]),
                relacion_victima_victimario: vinculo_con_agresor_victima[0],
                hijos_victima_con_victimario: cantidad_hijos_con_agresor ? cantidad_hijos_con_agresor[0] : 0,
                modo_actuacion: modo_actuacion[0],
                convivencia: convivencia[0] === "Sí" ? true : false,
                dependencia_economica: dependencia_economica[0] === "Sí" ? true : false,
                fecha: fecha[0],
                direccion: direccion[0],
                GIS: GIS ? GIS[0] : "No específicado",
                barrio: barrio ? barrio[0] : 'No específicado',
                tipo_de_lugar: tipo_de_lugar[0],
                unidad_de_carga: unidad_de_carga[0],
                municipio: municipio[0],
                jurisdiccion_policial: jurisdiccion_policial ? jurisdiccion_policial[0] : 'No existe',
                cuadricula: cuadricula ? cuadricula[0] : 'No existe',
                isDivision: isDivision[0],
                numero_de_expediente: numero_de_expediente[0],
                is_expediente_completo: is_expediente_completo[0],
                juzgado_interviniente: juzgado_interviniente[0],
                juzgado_interviniente_numero: juzgado_interviniente_numero[0],
                dependencia_derivada: dependencia_derivada[0],
                violencia: violencia[0],
                modalidades: modalidades[0],
                tipo_de_violencia: {
                    Fisica: fisica[0],
                    Psicologica: psicologica[0],
                    Sexual: sexual[0],
                    Economica_y_patrimonial: economica_y_patrimonial[0],
                    Simbolica: simbolica[0],
                    Politica: politica[0],
                },
                empleo_de_armas: empleo_de_armas ? empleo_de_armas[0] : false,
                arma_empleada: (arma_empleada && empleo_de_armas) ? arma_empleada[0] : 'Sin armas',
                medida: {
                    prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined) ? prohibicion_de_acercamiento[0] : false,
                    restitucion_de_menor: (restitucion_de_menor !== undefined) ? restitucion_de_menor[0] : false,
                    exclusion_de_hogar: (exclusion_de_hogar !== undefined) ? exclusion_de_hogar[0] : false,
                    alimento_provisorio: (alimento_provisorio !== undefined) ? alimento_provisorio[0] : false,
                    derecho_de_comunicacion: (derecho_de_comunicacion !== undefined) ? derecho_de_comunicacion[0] : false,
                    boton_antipanico: (boton_antipanico !== undefined) ? boton_antipanico[0] : false,
                    restitucion_de_bienes: (restitucion_de_bienes !== undefined) ? restitucion_de_bienes[0] : false,
                    ninguna_solicitada: (ninguna_solicitada !== undefined) ? ninguna_solicitada[0] : false
                },
                medida_dispuesta: {
                    prohibicion_de_acercamiento: (prohibicion_de_acercamiento_dispuesta !== undefined) ? prohibicion_de_acercamiento_dispuesta[0] : false,
                    exclusion_de_hogar: (exclusion_de_hogar_dispuesta !== undefined) ? exclusion_de_hogar_dispuesta[0] : false,
                    boton_antipanico: (boton_antipanico_dispuesta !== undefined) ? boton_antipanico_dispuesta[0] : false,
                    solicitud_de_aprehension: (solicitud_de_aprehension_dispuesta !== undefined) ? solicitud_de_aprehension_dispuesta[0] : false,
                    expedientes_con_cautelar: (expedientes_con_cautelar_dispuesta !== undefined) ? expedientes_con_cautelar_dispuesta[0] : false,
                    en_libertad: (en_libertad !== undefined) ? en_libertad[0] : false,
                    cese_de_hostigamiento: (cese_de_hostigamiento !== undefined) ? cese_de_hostigamiento[0] : false,
                    notificacion_expediente: (notificacion_expediente !== undefined) ? notificacion_expediente[0] : false,
                    ninguna: (ninguna !== undefined) ? ninguna[0] : false
                },
                tercero_ID: (denunciado_por_tercero && IdTercero) ? IdTercero[0] : 'Sin tercero',
                vinculo_con_la_victima_tercero: (denunciado_por_tercero && vinculo_con_la_victima) ? vinculo_con_la_victima[0] : 'Sin vínculo',
                denunciado_por_tercero: denunciado_por_tercero ? denunciado_por_tercero[0] : false,
                aprehension: (aprehension !== null && solicitud_de_aprehension_dispuesta) ? aprehension[0] : false,
                observaciones: observaciones[0],
                denunciada_cargada_por: user_id[0]
            })

            // Guardar la denuncia
            const denunciaSaved = await newDenuncia.save()
            
            if (err) {
                console.error("Error parsing the form: ", err);
                return res.status(500).send({ error: "Error procesando el formulario: " + err.message });
            }
            if (files.imagen != undefined) {
                const file = files?.imagen[0]

                if (file.originalFilename === "") { //Validación si no se sube archivos
                    throw new Error("Agrega una imagen para continuar")
                }
             

                if (file.size > 50 * 1024 * 1024) { //Tamaño máximo de 50mb
                    throw new Error("Ingrese un archivo de menos de 50mb")
                }

                let separado = file?.mimetype?.split("/");
                let formato = separado[1];

                let dirFile = path.join(__dirname, `../../imagesFromDB/Denuncias/${denunciaSaved._id}.${formato}`) //crear la  ruta para guardar la imagen    
                // Crear la carpeta si no existe
                const dirPath = path.dirname(dirFile);
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }
                fs.copyFile(file.filepath, dirFile, function (err) {
                    if (err) throw err;
                }); //Copiar archivo desde la ruta original al servidor

                let nuevo = denunciaSaved._id + '.' + formato //Guardar nombre de la imagen para pasarlo a la base de datos

                denunciaSaved.imagen = nuevo //Guardar el nombre de la imagen en la base de datos

                await denunciaSaved.save()
            }

            // Agrega el ID de la denuncia nueva al array que tiene la victima con sus denuncias cargadas
            await victimas.findByIdAndUpdate(findVictima?._id ? findVictima._id : victima_ID, { $push: { denuncias_realizadas: denunciaSaved._id } })

            // Agrega el ID de la denuncia nueva al array que tiene el victimario con sus denuncias cargadas
            await victimario.findByIdAndUpdate(findVictimario?._id ? findVictimario._id : victimario_ID, { $push: { denuncias_en_contra: denunciaSaved._id } })

            // Agrega esta denuncia al tercero
            await terceros.findByIdAndUpdate(findTercero?._id, { $push: { denuncias_realizadas: denunciaSaved._id } })

            // Actualiza el nombre de la victima en todas las denuncias que tengan el mismo ID
            await denuncia.updateMany({
                victima_ID: findVictima?._id ? findVictima._id : victima_ID
            }, {
                victima_nombre: `${nombre_victima} ${apellido_victima}`
            });

            // Actualiza el nombre del victimario en todas las denuncias que tengan el mismo ID
            await denuncia.updateMany({
                victimario_ID: findVictimario?._id ? findVictimario._id : victima_ID
            }, {
                victimario_nombre: `${nombre_victimario} ${apellido_victimario}`
            });
            // Agrega a la actividad reciente
            await agregarActividadReciente(`Carga de denuncia`, "Denuncia", denunciaSaved._id, req.cookies)

            // Respuesta de la API
            res.send('Denuncia creada con exito')
        })
    } catch (error) {
        console.log(error)
        res.send('No se ingresaron datos')
    }
}

// Eliminar denuncias
export const deleteDenuncia = async (req, res) => {
    try {
        const { id } = req.params
        // Cómo obtengo el id si este está guardado en las cookies?
        const user_id = req.cookies.token.id
        // Buscar la victima y victimario y restarle 1 denuncia para desvincular
        const denunciaABorrar = await denuncia.findById(id)
        // Elimina la denuncia de la victima y victimario
        deleteVictima(denunciaABorrar?.victima_ID, id, req)
        // Elimina la denuncia del victimario
        deleteVictimario(denunciaABorrar?.victimario_ID, id, req)

        // Si la denuncia fue realizada por un tercero, se elimina
        denunciaABorrar?.tercero_ID != "Sin tercero" && deleteTercero(denunciaABorrar?.tercero_ID, id)

        // Elimina la denuncia
        const denunciaDeleted = await denuncia.findByIdAndDelete(id)

        // Agrega a la actividad reciente
        await agregarActividadReciente(`Eliminación de denuncia`, "Denuncia", id, req.cookies)

        res.json(denunciaDeleted)
    } catch (error) {
        console.log(error)
    }
}

// Actualizar denuncias
export const updateDenuncia = async (req, res) => {
    try {
        //Edita los parametros de la denuncia salvo los id de la victima y victimario
        const { id } = req.params
        const { nombre_victima, apellido_victima, modo_actuacion, nombre_victimario, apellido_victimario, vinculo_con_agresor_victima, cantidad_hijos_con_agresor, convivencia, dependencia_economica, fecha, direccion, GIS, barrio, tipo_de_lugar, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, juzgado_interviniente, juzgado_interviniente_numero, dependencia_derivada, violencia, modalidades,  empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio, derecho_de_comunicacion, restitucion_de_bienes, ninguna_solicitada, prohibicion_de_acercamiento_dispuesta, exclusion_de_hogar_dispuesta, boton_antipanico_dispuesta, solicitud_de_aprehension_dispuesta, expedientes_con_cautelar_dispuesta, nuevoExpediente, boton_antipanico, denunciado_por_tercero, tercero_ID, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, politica, isExpedienteCompleto, aprehension, en_libertad, cese_de_hostigamiento, notificacion_expediente, ninguna } = req.body
        // Buscar al tercero si se agregó

        // Actualiza la denuncia        
        const denunciaUpdated = await denuncia.findByIdAndUpdate(id, {
            victima_nombre: nombre_victima + ' ' + apellido_victima,
            victimario_nombre: nombre_victimario + ' ' + apellido_victimario,
            relacion_victima_victimario: vinculo_con_agresor_victima,
            hijos_victima_con_victimario: cantidad_hijos_con_agresor ? cantidad_hijos_con_agresor : 0,
            convivencia: convivencia === "Sí" ? true : false,
            dependencia_economica: dependencia_economica === "Sí" ? true : false,
            modo_actuacion,
            fecha,
            direccion,
            GIS,
            barrio,
            tipo_de_lugar,
            unidad_de_carga,
            municipio,
            jurisdiccion_policial: jurisdiccion_policial,
            cuadricula: cuadricula,
            isDivision,
            numero_de_expediente: nuevoExpediente,
            juzgado_interviniente,
            juzgado_interviniente_numero,
            dependencia_derivada,
            is_expediente_completo: isExpedienteCompleto,
            violencia,
            modalidades,
            tipo_de_violencia: {
                Fisica: fisica,
                Psicologica: psicologica,
                Sexual: sexual,
                Economica_y_patrimonial: economica_y_patrimonial,
                Simbolica: simbolica,
                Politica: politica,
            },
            empleo_de_armas: empleo_de_armas,
            arma_empleada: (arma_empleada && empleo_de_armas) ? arma_empleada : 'Sin armas',
            medida_solicitada_por_la_victima: medida_solicitada_por_la_victima,
            medida_dispuesta_por_autoridad_judicial: medida_dispuesta_por_autoridad_judicial,
            medida: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined) ? prohibicion_de_acercamiento : false,
                restitucion_de_menor: (restitucion_de_menor !== undefined) ? restitucion_de_menor : false,
                exclusion_de_hogar: (exclusion_de_hogar !== undefined) ? exclusion_de_hogar : false,
                alimento_provisorio: (alimento_provisorio !== undefined) ? alimento_provisorio : false,
                derecho_de_comunicacion: (derecho_de_comunicacion !== undefined) ? derecho_de_comunicacion : false,
                boton_antipanico: (boton_antipanico !== undefined) ? boton_antipanico : false,
                restitucion_de_bienes: (restitucion_de_bienes !== undefined) ? restitucion_de_bienes : false,
                ninguna_solicitada: (ninguna_solicitada !== undefined) ? ninguna_solicitada : false
            },
            medida_dispuesta: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento_dispuesta !== undefined) ? prohibicion_de_acercamiento_dispuesta : false,
                exclusion_de_hogar: (exclusion_de_hogar_dispuesta !== undefined) ? exclusion_de_hogar_dispuesta : false,
                boton_antipanico: (boton_antipanico_dispuesta !== undefined) ? boton_antipanico_dispuesta : false,
                solicitud_de_aprehension: (solicitud_de_aprehension_dispuesta !== undefined) ? solicitud_de_aprehension_dispuesta : false,
                expedientes_con_cautelar: (expedientes_con_cautelar_dispuesta !== undefined) ? expedientes_con_cautelar_dispuesta : false,
                en_libertad: (en_libertad !== undefined) ? en_libertad : false,
                cese_de_hostigamiento: (cese_de_hostigamiento !== undefined) ? cese_de_hostigamiento : false ,
                notificacion_expediente: (notificacion_expediente !== undefined) ? notificacion_expediente : false,
                ninguna: (ninguna !== undefined) ? ninguna : false
            },
            denunciado_por_tercero: denunciado_por_tercero,
            tercero_ID: (denunciado_por_tercero) ? tercero_ID : ('Sin tercero'),
            vinculo_con_la_victima_tercero: (denunciado_por_tercero) ? vinculo_con_la_victima : 'Sin vínculo',
            aprehension: (aprehension !== undefined && solicitud_de_aprehension_dispuesta) ? aprehension : false,
            observaciones: observaciones,
        }, { new: true })

        // Actualiza el nombre de la victima en todas las denuncias que tengan el mismo ID
        await denuncia.updateMany({
            victima_ID: denunciaUpdated?.victima_ID
        }, {
            victima_nombre: `${nombre_victima} ${apellido_victima}`
        });

        // Actualiza el nombre del victimario en todas las denuncias que tengan el mismo ID
        await denuncia.updateMany({
            victimario_ID: denunciaUpdated?.victimario_ID
        }, {
            victimario_nombre: `${nombre_victimario} ${apellido_victimario}`
        });

        // Si se agrega un tercero, se le agrega la denuncia
        if (denunciado_por_tercero) {
            await terceros.findByIdAndUpdate(tercero_ID, { $push: { denuncias_realizadas: denunciaUpdated?._id } })
        }

        // Agrega a la actividad reciente
        await agregarActividadReciente(`Edición de denuncia`, "Denuncia", id, req.cookies)

        res.json(denunciaUpdated)
    } catch (error) {
        console.log(error)
    }
}

// Obtener denuncias por ID
export const getDenunciasId = async (req, res) => {
    try {
        // Obtiene la denuncia por ID
        const { id } = req.params
        // Busca la denuncia por ID
        const denunciaByID = await denuncia.findById(id)
        // Respuesta de la API
        res.json(denunciaByID)
    } catch (error) {
        console.log(error)
    }
}

// Obtener en números, la cantidad de denuncias cargadas entre dos fechas específicas
export const getCantidadDenuncias = async (req, res) => {
    try {
        const { desde, hasta } = req.params
        const denuncias = await denuncia.find({ fecha: { $gte: desde, $lte: hasta } })
        res.json(denuncias.length)
    } catch (error) {
        console.log(error)
    }

}

// Editar imagen de la denuncia
export const editarImagenDenuncia = async (req, res) => {
    try {
        const form = new formidable.IncomingForm()

        form.parse(req, async (err, fields, files) => {
            const { id } = fields
            const file = files?.imagen[0]

            if (file.originalFilename === "") { //Validación si no se sube archivos
                throw new Error("Agrega una imagen para continuar")
            }
            if (file.size > 50 * 1024 * 1024) { //Tamaño máximo de 50mb
                throw new Error("Ingrese un archivo de menos de 50mb")
            }
            let separado = file?.mimetype?.split("/");
            let formato = separado[1];
            let dirFile = path.join(__dirname, `../../imagesFromDB/Denuncias/${id[0]}.${formato}`) //crear la  ruta para guardar la imagen    
            // Crear la carpeta si no existe
            const dirPath = path.dirname(dirFile);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            fs.copyFile(file.filepath, dirFile, function (err) {
                if (err) throw err;
            }); //Copiar archivo desde la ruta original al servidor
            let nuevo = id + '.' + formato //Guardar nombre de la imagen para pasarlo a la base de datos
            await denuncia.findByIdAndUpdate(id, { imagen: nuevo })
            res.send('Imagen actualizada')
        })
    } catch (error) {
        console.log(error)
    }


}


export const getDenunciasFullYear = async (req, res) => {
    // Devuelve en un array la cantidad de denuncias por mes del año en curso
    try {
        const currentYear = new Date().getFullYear(); // Obtener el año actual
        const meses = [
            { mes: 'Enero', desde: `${currentYear}-01-01`, hasta: `${currentYear}-01-31` },
            { mes: 'Febrero', desde: `${currentYear}-02-01`, hasta: `${currentYear}-02-29` },
            { mes: 'Marzo', desde: `${currentYear}-03-01`, hasta: `${currentYear}-03-31` },
            { mes: 'Abril', desde: `${currentYear}-04-01`, hasta: `${currentYear}-04-30` },
            { mes: 'Mayo', desde: `${currentYear}-05-01`, hasta: `${currentYear}-05-31` },
            { mes: 'Junio', desde: `${currentYear}-06-01`, hasta: `${currentYear}-06-30` },
            { mes: 'Julio', desde: `${currentYear}-07-01`, hasta: `${currentYear}-07-31` },
            { mes: 'Agosto', desde: `${currentYear}-08-01`, hasta: `${currentYear}-08-31` },
            { mes: 'Septiembre', desde: `${currentYear}-09-01`, hasta: `${currentYear}-09-30` },
            { mes: 'Octubre', desde: `${currentYear}-10-01`, hasta: `${currentYear}-10-31` },
            { mes: 'Noviembre', desde: `${currentYear}-11-01`, hasta: `${currentYear}-11-30` },
            { mes: 'Diciembre', desde: `${currentYear}-12-01`, hasta: `${currentYear}-12-31` },
        ];


        const denunciasPorMes = await Promise.all(meses.map(async (mes) => {
            const denuncias = await denuncia.find({
                fecha: {
                    $gte: mes.desde,
                    $lte: mes.hasta
                }
            });
            return { name: mes.mes, total: denuncias.length };
        }));

        res.json(denunciasPorMes);
    } catch (error) {
        console.log(error)
    }
}

export const getDenunciasTotalesPeriodo = async (req, res) => {
  // Obtener fecha actual
  const ahora = new Date();

  // Día de hoy (inicio y fin)
  const inicioDia = new Date(ahora);
  inicioDia.setUTCHours(0, 0, 0, 0);

  const finDia = new Date(ahora);
  finDia.setUTCHours(23, 59, 59, 999);

  // Desde hace 7 días
  const desde7Dias = new Date(ahora);
  desde7Dias.setDate(ahora.getDate() - 7);
  desde7Dias.setUTCHours(0 , 0, 0, 0);

  // Desde hace 30 días
  const desde30Dias = new Date(ahora);
  desde30Dias.setDate(ahora.getDate() - 30);
  desde30Dias.setUTCHours(0, 0, 0, 0);

  // Desde el 1 de enero al 31 de diciembre del año actual
  const desde1Enero = new Date(ahora.getFullYear(), 0, 1);
  desde1Enero.setUTCHours(0, 0, 0, 0);

  const hasta31Diciembre = new Date(ahora.getFullYear(), 11, 31);
  hasta31Diciembre.setUTCHours(23, 59, 59, 999);

  try {
    const [denunciasHoy, denuncias7Dias, denuncias30Dias, denunciasAnioCompleto] = await Promise.all([
      denuncia.find({ fecha: { $gte: inicioDia, $lte: finDia } }),
      denuncia.find({ fecha: { $gte: desde7Dias, $lte: ahora } }),
      denuncia.find({ fecha: { $gte: desde30Dias, $lte: ahora } }),
      denuncia.find({ fecha: { $gte: desde1Enero, $lte: hasta31Diciembre } })
    ]);

    res.json({
      hoy: denunciasHoy.length,
      semana: denuncias7Dias.length,
      mes: denuncias30Dias.length,
      anio: denunciasAnioCompleto.length
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las denuncias' });
  }
};
