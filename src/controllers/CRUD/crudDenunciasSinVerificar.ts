// Importa los modelos de la base de datos
import denunciaSinVerificar from '../../models/denunciaSinVerificar'
import usuarios from '../../models/usuarios'

// Denuncias cargadas por agentes (Sin verificar)
export const createDenunciaSinVerificar = async (req, res) => {
    try {
        // Obtener la división del usuario
        const usuario = await usuarios.findById(req.user.id)
        const division = usuario?.unidad
        // Obtener los datos de la denuncia
        const { nombre_victima, numero_de_expediente, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, SabeLeerYEscribir, observaciones, AsistidaPorDichoOrganismo, ExaminadaMedicoPolicial, AccionarPenalmente, AgregarQuitarOEnmendarAlgo, nombre_completo_secretario, jerarquia_secretario, plaza_secretario, nombre_completo_instructor, jerarquia_instructor, agrega } = req.body
        // Crear la denuncia
        const newDenunciaSinVerificar = new denunciaSinVerificar({
            estado: "En verificación",
            cargado_por: req.user.id,
            numero_de_expediente: numero_de_expediente,
            division: division,
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
                desea_ser_asistida: AsistidaPorDichoOrganismo == "Sí" ? true : false,
                desea_ser_examinada_por_medico: ExaminadaMedicoPolicial == "Sí" ? true : false,
                desea_accionar_penalmente: AccionarPenalmente == "Sí" ? true : false,
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
        // Guardar la denuncia
        const denunciaSinVerificarSaved = await newDenunciaSinVerificar.save()
        res.send('Denuncia creada con exito')

    } catch (error) {
        console.log(error)
    }
}
// Obtener todas las denuncias sin verificar
export const getDenunciasSinVerificar = async (req, res) => {
    try {
        // Haz el find solamente de los que tengan como estado "En verificación"
        const obtenerDenunciasSinVerificar = await denunciaSinVerificar.find({ estado: "En verificación" })
        res.json(obtenerDenunciasSinVerificar);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }

}

// Editar denuncias sin verificar y que cambie a estado Aprobado
export const validarDenuncia = async (req, res) => {
    try {
        const { id } = req.params
        const denunciaSinVerificarUpdateState = await denunciaSinVerificar.findByIdAndUpdate(id, { estado: "Aprobada" })
        res.json(denunciaSinVerificarUpdateState)
    } catch (error) {
        console.log(error)
    }
}

// Eliminar denuncias sin verificar
export const deleteDenunciaSinVerificar = async (req, res) => {
    try {
        // En lugar de eliminarlo, quiero que cambies el estado a "Rechazada"
        const { id } = req.params
        const denunciaSinVerificarDeleted = await denunciaSinVerificar.findByIdAndUpdate(id, { estado: "Rechazada" })
        res.json(denunciaSinVerificarDeleted)
    } catch (error) {
        console.log(error)
    }
}

// Listar mis denuncias sin verificar
export const listarMisDenunciasSinVerificar = async (req, res) => {
    try {
        console.log(req.user.id)
        const misDenunciasSinVerificar = await denunciaSinVerificar.find({ cargado_por: req.user.id })
        res.json(misDenunciasSinVerificar)
    } catch (error) {
        console.log(error)
    }
}