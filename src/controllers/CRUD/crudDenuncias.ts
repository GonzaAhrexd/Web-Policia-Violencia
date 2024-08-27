// Importa los modelos de la base de datos
import victimas from '../../models/victimas'
import victimario from '../../models/victimario'
import denuncia from '../../models/denuncias'
import terceros from '../../models/terceros'
import { deleteVictimario } from './crudVictimarios'
import { deleteVictima } from './crudVictimas'
import { deleteTercero } from './crudTerceros'
import { agregarActividadReciente } from './crudActividadReciente'

// DENUNCIAS
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
    }
    // Obtener los parámetros de la URL
    const { desde, hasta, numero_de_expediente, is_expediente_completo, id_denuncia, division, municipio, comisaria } = req.params;
    // Crear el objeto de consulta
    const query: Query = { };

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
    if (division !== 'no_ingresado'){
        query.unidad_de_carga = division
    }
    if(municipio !== 'no_ingresado'){ 
        query.municipio = municipio
    }
    if(comisaria !== 'no_ingresado'){
        query.jurisdiccion_policial = comisaria
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
    try {
        // Obtener los datos de la denuncia
        const { user_id, victima_ID, victimario_ID, tercero_ID, nombre_victima, apellido_victima, nombre_victimario, apellido_victimario, dni_victima, dni_victimario, vinculo_con_agresor_victima, convivencia, dependencia_economica, genero, fecha, direccion, GIS, barrio, tipo_de_lugar, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, juzgado_interviniente_numero, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio,
            derecho_de_comunicacion, boton_antipanico, prohibicion_de_acercamiento_dispuesta, exclusion_de_hogar_dispuesta, boton_antipanico_dispuesta, solicitud_de_aprehension_dispuesta, expedientes_con_cautelar_dispuesta, aprehension, denunciado_por_tercero, dni_tercero, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, is_expediente_completo, politica, cantidad_hijos_con_agresor, ninguna} = req.body
        // Buscar si la victima y victimario ya existen        
        const findVictima = await victimas.findOne({ DNI: dni_victima })
        let findVictimario

        // Si el DNI del victimario es S/N, se asigna el ID del victimario
        if (dni_victimario == "S/N") {
            findVictimario = await victimario.findById(victimario_ID)
        } else {
            findVictimario = await victimario.findOne({ DNI: dni_victimario })
        }
        // Busca al tercero por dni si este ya existe
        let findTercero, IdTercero
        if(denunciado_por_tercero){
        findTercero = await terceros.findOne({ DNI: dni_tercero })
        IdTercero = findTercero?._id ? findTercero._id : tercero_ID
        }
        // Si el tercero no existe, se crea uno nuevo
        // Crear la denuncia
        const newDenuncia = new denuncia({
            victima_ID: findVictima?._id ? findVictima._id : victima_ID,
            victimario_ID: findVictimario?._id ? findVictimario._id : victimario_ID,
            victima_nombre: findVictima ? findVictima.nombre + ' ' + findVictima.apellido : nombre_victima + ' ' + apellido_victima,
            victimario_nombre: findVictimario ? (findVictimario.nombre + ' ' + findVictimario.apellido) : (nombre_victimario + ' ' + apellido_victimario),
            relacion_victima_victimario: vinculo_con_agresor_victima,
            hijos_victima_con_victimario: cantidad_hijos_con_agresor ? cantidad_hijos_con_agresor : 0,
            convivencia: convivencia === "Sí" ? true : false,
            dependencia_economica: dependencia_economica === "Sí" ? true : false,
            genero,
            fecha,
            direccion,
            GIS: GIS ? GIS : "No específicado",
            barrio: barrio ? barrio : 'No específicado',
            tipo_de_lugar: tipo_de_lugar,
            unidad_de_carga,
            municipio,
            jurisdiccion_policial: jurisdiccion_policial ? jurisdiccion_policial : 'No existe',
            cuadricula: cuadricula ? cuadricula : 'No existe',
            isDivision,
            numero_de_expediente,
            is_expediente_completo,
            juzgado_interviniente,
            juzgado_interviniente_numero,
            dependencia_derivada,
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
            empleo_de_armas: empleo_de_armas ? empleo_de_armas : false,
            arma_empleada: (arma_empleada && empleo_de_armas) ? arma_empleada : 'Sin armas',
            medida: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined ) ? prohibicion_de_acercamiento : false,
                restitucion_de_menor: (restitucion_de_menor !== undefined ) ? restitucion_de_menor : false,
                exclusion_de_hogar: (exclusion_de_hogar !== undefined ) ? exclusion_de_hogar : false,
                alimento_provisorio: (alimento_provisorio !== undefined ) ? alimento_provisorio : false,
                derecho_de_comunicacion: (derecho_de_comunicacion !== undefined ) ? derecho_de_comunicacion : false,
                boton_antipanico: (boton_antipanico !== undefined) ? boton_antipanico : false,
            },
            medida_dispuesta: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento_dispuesta !== undefined ) ? prohibicion_de_acercamiento_dispuesta : false,
                exclusion_de_hogar: (exclusion_de_hogar_dispuesta !== undefined) ? exclusion_de_hogar_dispuesta : false,
                boton_antipanico: (boton_antipanico_dispuesta !== undefined) ? boton_antipanico_dispuesta : false,
                solicitud_de_aprehension: (solicitud_de_aprehension_dispuesta !== undefined) ? solicitud_de_aprehension_dispuesta : false,
                expedientes_con_cautelar: (expedientes_con_cautelar_dispuesta !== undefined) ? expedientes_con_cautelar_dispuesta : false,
                ninguna: (ninguna !== undefined) ? ninguna : false
            },
            tercero_ID: (denunciado_por_tercero && IdTercero) ? IdTercero : 'Sin tercero',
            vinculo_con_la_victima_tercero:(denunciado_por_tercero && vinculo_con_la_victima) ? vinculo_con_la_victima : 'Sin vínculo',
            denunciado_por_tercero: denunciado_por_tercero ? denunciado_por_tercero : false,
            aprehension: (aprehension !== null && solicitud_de_aprehension_dispuesta) ? aprehension : false,
            observaciones,
            denunciada_cargada_por: user_id
        })
        // Guardar la denuncia
        const denunciaSaved = await newDenuncia.save()
        // Agrega el ID de la denuncia nueva al array que tiene la victima con sus denuncias cargadas
        await victimas.findByIdAndUpdate(findVictima?._id ? findVictima._id : victima_ID, { $push: { denuncias_realizadas: denunciaSaved._id } })
       // Agrega el ID de la denuncia nueva al array que tiene el victimario con sus denuncias cargadas
        await victimario.findByIdAndUpdate(findVictimario?._id ? findVictimario._id : victimario_ID, { $push: { denuncias_en_contra: denunciaSaved._id } })        
        // Agrega esta denuncia al tercero
        await terceros.findByIdAndUpdate(findTercero?._id, { $push: { denuncias_realizadas: denunciaSaved._id } })
        
        await denuncia.updateMany({
            victima_ID: findVictima?._id ? findVictima._id : victima_ID
        }, {
            victima_nombre: `${nombre_victima} ${apellido_victima}`
        });

        
        await denuncia.updateMany({
            victimario_ID: findVictimario?._id ? findVictimario._id : victima_ID
        }, {
            victimario_nombre: `${nombre_victimario} ${apellido_victimario}`
        });
        
        await agregarActividadReciente(`Carga de denuncia`, "Denuncia", denunciaSaved._id, req.cookies )
        res.send('Denuncia creada con exito')
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
        console.log(req.cookies)
        // Buscar la victima y victimario y restarle 1 denuncia para desvincular
        const denunciaABorrar = await denuncia.findById(id)

        deleteVictima(denunciaABorrar?.victima_ID, id)
        deleteVictimario(denunciaABorrar?.victimario_ID, id)
        denunciaABorrar?.tercero_ID != "Sin tercero" && deleteTercero(denunciaABorrar?.tercero_ID, id)

        const denunciaDeleted = await denuncia.findByIdAndDelete(id)

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
        const { nombre_victima, apellido_victima, nombre_victimario, apellido_victimario, vinculo_con_agresor_victima, cantidad_hijos_con_agresor, convivencia, dependencia_economica,  genero, fecha, direccion, GIS, barrio, tipo_de_lugar, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, juzgado_interviniente_numero, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio, derecho_de_comunicacion, prohibicion_de_acercamiento_dispuesta, exclusion_de_hogar_dispuesta, boton_antipanico_dispuesta, solicitud_de_aprehension_dispuesta, expedientes_con_cautelar_dispuesta, nuevoExpediente, boton_antipanico, denunciado_por_tercero, tercero_ID, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, politica, isExpedienteCompleto, aprehension, ninguna} = req.body
        // Buscar al tercero si se agregó
         
        let findTercero
        // Busca si hay tercero
       /* if(denunciado_por_tercero && tercero_ID !== "Sin tercero"){
            findTercero = await terceros.findById(tercero_ID)
        }*/ 
        // Actualiza la denuncia        
        const denunciaUpdated = await denuncia.findByIdAndUpdate(id, {
            victima_nombre: nombre_victima + ' ' + apellido_victima,
            victimario_nombre: nombre_victimario + ' ' + apellido_victimario,
            relacion_victima_victimario: vinculo_con_agresor_victima,
            hijos_victima_con_victimario: cantidad_hijos_con_agresor ? cantidad_hijos_con_agresor : 0,
            convivencia: convivencia === "Sí" ? true : false,
            dependencia_economica: dependencia_economica === "Sí" ? true : false,
            genero,
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
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined ) ? prohibicion_de_acercamiento : false,
                restitucion_de_menor: (restitucion_de_menor !== undefined ) ? restitucion_de_menor : false,
                exclusion_de_hogar: (exclusion_de_hogar !== undefined ) ? exclusion_de_hogar : false,
                alimento_provisorio: (alimento_provisorio !== undefined ) ? alimento_provisorio : false,
                derecho_de_comunicacion: (derecho_de_comunicacion !== undefined ) ? derecho_de_comunicacion : false,
                boton_antipanico: (boton_antipanico !== undefined) ? boton_antipanico : false,
            },
            medida_dispuesta: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento_dispuesta !== undefined ) ? prohibicion_de_acercamiento_dispuesta : false,
                exclusion_de_hogar: (exclusion_de_hogar_dispuesta !== undefined) ? exclusion_de_hogar_dispuesta : false,
                boton_antipanico: (boton_antipanico_dispuesta !== undefined) ? boton_antipanico_dispuesta : false,
                solicitud_de_aprehension: (solicitud_de_aprehension_dispuesta !== undefined) ? solicitud_de_aprehension_dispuesta : false,
                expedientes_con_cautelar: (expedientes_con_cautelar_dispuesta !== undefined) ? expedientes_con_cautelar_dispuesta : false,
                ninguna: (ninguna !== undefined) ? ninguna : false
            },
            denunciado_por_tercero: denunciado_por_tercero,
            tercero_ID: (denunciado_por_tercero)? tercero_ID  : ('Sin tercero'),
            vinculo_con_la_victima_tercero: (denunciado_por_tercero) ? vinculo_con_la_victima : 'Sin vínculo',
            aprehension: (aprehension !==undefined && solicitud_de_aprehension_dispuesta) ? aprehension : false,
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
        if(denunciado_por_tercero){
        await terceros.findByIdAndUpdate(tercero_ID, { $push: { denuncias_realizadas: denunciaUpdated?._id } })
        }

        await agregarActividadReciente(`Edición de denuncia`, "Denuncia", id, req.cookies)
        
        res.json(denunciaUpdated)
    } catch (error) {
        console.log(error)
    }
}

// Obtener denuncias por ID
export const getDenunciasId = async (req, res) => {
    try {
        const { id } = req.params
        const denunciaByID = await denuncia.findById(id)
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