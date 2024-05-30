// Importa los modelos de la base de datos
import victimas from '../models/victimas'
import victimario from '../models/victimario'
import denuncia from '../models/denuncias'
import denunciaSinVerificar from '../models/denunciaSinVerificar'
import exposicion from '../models/exposicion'
import usuarios from '../models/usuarios'

import { deleteVictimario } from './CRUD/crudVictimarios'
import { deleteVictima } from './CRUD/crudVictimas'
// DENUNCIAS
export const getDenuncias = async (req, res) => {
    interface Query {
        fecha?: {
            $gte?: string;
            $lte?: string;
        };
        numero_de_expediente?: string;
        is_expediente_completo?: boolean;
        unidad_de_carga?: string;
        municipio?: string;
        jurisdiccion_policial?: string
    }
    // Obtener los parámetros de la URL
    const { desde, hasta, numero_de_expediente, is_expediente_completo, division, municipio, comisaria } = req.params;
    // Crear el objeto de consulta
    console.log(req.params)

    console.log(comisaria)
    const query: Query = { };

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
    if (division !== 'no_ingresado'){
        query.unidad_de_carga = division
    }
    if(municipio !== 'no_ingresado'){ 
        query.municipio = municipio
    }
    if(comisaria !== 'no_ingresado'){
        query.jurisdiccion_policial = comisaria
    }

    console.log(query)
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
        const { user_id, victima_ID, victimario_ID, nombre_victima, apellido_victima, nombre_victimario, apellido_victimario, dni_victima, dni_victimario, genero, fecha, direccion, GIS, barrio, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio,
            derecho_de_comunicacion, boton_antipanico, denunciado_por_tercero, nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, is_expediente_completo, politica } = req.body

        // Buscar si la victima y victimario ya existen
        const findVictima = await victimas.findOne({ DNI: dni_victima })
        let findVictimario

        // Si el DNI del victimario es S/N, se asigna el ID del victimario
        if (dni_victimario == "S/N") {
            findVictimario = victimario_ID
        } else {
            findVictimario = await victimario.findOne({ DNI: dni_victimario })
        }
        // Crear la denuncia
        const newDenuncia = new denuncia({
            victima_ID: findVictima?._id ? findVictima._id : victima_ID,
            victimario_ID: findVictimario?._id ? findVictimario._id : victimario_ID,
            victima_nombre: nombre_victima + ' ' + apellido_victima,
            victimario_nombre: nombre_victimario + ' ' + apellido_victimario,
            genero,
            fecha,
            direccion,
            GIS,
            barrio,
            unidad_de_carga,
            municipio,
            jurisdiccion_policial: jurisdiccion_policial ? jurisdiccion_policial : 'No existe',
            cuadricula: cuadricula ? cuadricula : 'No existe',
            isDivision,
            numero_de_expediente,
            is_expediente_completo,
            juzgado_interviniente,
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
            arma_empleada: arma_empleada ? arma_empleada : 'Sin armas',
            medida_solicitada_por_la_victima: medida_solicitada_por_la_victima ? medida_solicitada_por_la_victima : false,
            medida_dispuesta_por_autoridad_judicial: medida_dispuesta_por_autoridad_judicial ? medida_dispuesta_por_autoridad_judicial : false,
            medida: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? prohibicion_de_acercamiento : false,
                restitucion_de_menor: (restitucion_de_menor !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? restitucion_de_menor : false,
                exclusion_de_hogar: (exclusion_de_hogar !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? exclusion_de_hogar : false,
                alimento_provisorio: (alimento_provisorio !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? alimento_provisorio : false,
                derecho_de_comunicacion: (derecho_de_comunicacion !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? derecho_de_comunicacion : false,
                boton_antipanico: (boton_antipanico !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? boton_antipanico : false,
            },
            denunciado_por_tercero: denunciado_por_tercero ? denunciado_por_tercero : false,
            nombre_tercero: nombre_tercero ? nombre_tercero : 'Sin tercero',
            apellido_tercero: apellido_tercero ? apellido_tercero : 'Sin tercero',
            dni_tercero: dni_tercero ? dni_tercero : 'Sin tercero',
            vinculo_con_victima: vinculo_con_la_victima ? vinculo_con_la_victima : 'Sin tercero',
            observaciones,
            denunciada_cargada_por: user_id
        })
        // Guardar la denuncia
        const denunciaSaved = await newDenuncia.save()
        // Agrega el ID de la denuncia nueva al array que tiene la victima con sus denuncias cargadas
        await victimas.findByIdAndUpdate(findVictima?._id ? findVictima._id : victima_ID, { $push: { denuncias_realizadas: denunciaSaved._id } })
       // Agrega el ID de la denuncia nueva al array que tiene el victimario con sus denuncias cargadas
        await victimario.findByIdAndUpdate(findVictimario?._id ? findVictimario._id : victimario_ID, { $push: { denuncias_en_contra: denunciaSaved._id } })
       
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

        // Buscar la victima y victimario y restarle 1 denuncia para desvincular
        const denunciaABorrar = await denuncia.findById(id)

        deleteVictima(denunciaABorrar?.victima_ID, id)
        deleteVictimario(denunciaABorrar?.victimario_ID, id)

        const denunciaDeleted = await denuncia.findByIdAndDelete(id)
        res.json(denunciaDeleted)
    } catch (error) {
        console.log(error)
    }
}


// Actualizar denuncias

// AQUÍ HAY UN ERROR, NO FUNCIONA LA EDICIÓN, SOLUCIONAR URGENTE
export const updateDenuncia = async (req, res) => {
    try {
        //Edita los parametros de la denuncia salvo los id de la victima y victimario
        const { id } = req.params
        const { nombre_victima, apellido_victima, nombre_victimario, apellido_victimario, genero, fecha, direccion, GIS, barrio, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio,
            derecho_de_comunicacion, nuevoExpediente, boton_antipanico, denunciado_por_tercero, nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, politica, isExpedienteCompleto } = req.body
        console.log(id)
        const denunciaUpdated = await denuncia.findByIdAndUpdate(id, {
            victima_nombre: nombre_victima + ' ' + apellido_victima,
            victimario_nombre: nombre_victimario + ' ' + apellido_victimario,
            genero,
            fecha,
            direccion,
            GIS,
            barrio,
            unidad_de_carga,
            municipio,
            jurisdiccion_policial: jurisdiccion_policial,
            cuadricula: cuadricula,
            isDivision,
            numero_de_expediente: nuevoExpediente,
            juzgado_interviniente,
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
            arma_empleada: arma_empleada,
            medida_solicitada_por_la_victima: medida_solicitada_por_la_victima,
            medida_dispuesta_por_autoridad_judicial: medida_dispuesta_por_autoridad_judicial,
            medida: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? prohibicion_de_acercamiento : false,
                restitucion_de_menor: (restitucion_de_menor !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? restitucion_de_menor : false,
                exclusion_de_hogar: (exclusion_de_hogar !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? exclusion_de_hogar : false,
                alimento_provisorio: (alimento_provisorio !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? alimento_provisorio : false,
                derecho_de_comunicacion: (derecho_de_comunicacion !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? derecho_de_comunicacion : false,
                boton_antipanico: (boton_antipanico !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? boton_antipanico : false,
            },
            denunciado_por_tercero: denunciado_por_tercero,
            nombre_tercero: nombre_tercero,
            apellido_tercero: apellido_tercero,
            dni_tercero: dni_tercero,
            vinculo_con_victima: vinculo_con_la_victima,
            observaciones: observaciones,
        }, { new: true })
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


// EXPOSICIÓN
export const createExposicion = async (req, res) => {
    try {
        const { nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, SabeLeerYEscribir, observaciones, AgregarQuitarOEnmendarAlgo, nombre_completo_secretario, jerarquia_secretario, plaza_secretario, nombre_completo_instructor, jerarquia_instructor, agrega } = req.body
        console.log("LLegó")
        console.log("Expocisión", req.body)
        const newExposicion = new exposicion({
            nombre_victima: nombre_victima,
            apellido_victima: apellido_victima,
            edad_victima: edad_victima,
            DNI_victima: dni_victima,
            estado_civil_victima: estado_civil_victima,
            ocupacion_victima: ocupacion_victima,
            nacionalidad_victima: nacionalidad_victima,
            direccion_victima: direccion_victima,
            telefono_victima: telefono_victima,
            sabe_leer_y_escribir_victima: SabeLeerYEscribir == "Sí" ? true : false,
            observaciones: observaciones,
            preguntas: {
                desea_agregar_quitar_o_enmendar: AgregarQuitarOEnmendarAlgo == "Sí" ? true : false
            },
            agrega: agrega ? agrega : 'No se agregó nada',
            secretario: {
                nombre_completo_secretario: nombre_completo_secretario,
                jerarquia_secretario: jerarquia_secretario,
                plaza_secretario: plaza_secretario
            },
            instructor: {
                nombre_completo_instructor: nombre_completo_instructor,
                jerarquia_instructor: jerarquia_instructor,
            }
        })

        const expoSave = await newExposicion.save()
        res.send('Exposición creada con exito')

    } catch (error) {
        console.log(error)
    }
}