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
        const { nombre_victima, numero_de_expediente, fecha, hora, ampliado_de, apellido_victima, genero, edad_victima, dni_victima, estado_civil_victima, modo_actuacion, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, SabeLeerYEscribir, observaciones, AsistidaPorDichoOrganismo, ExaminadaMedicoPolicial, AccionarPenalmente, AgregarQuitarOEnmendarAlgo, nombre_completo_secretario, jerarquia_secretario, plaza_secretario, nombre_completo_instructor, jerarquia_instructor, agrega, direccion, telefono } = req.body
        // Crear la denuncia
        const newDenunciaSinVerificar = new denunciaSinVerificar({
            estado: "En verificación",
            cargado_por: req.user.id,
            numero_de_expediente: numero_de_expediente,
            fecha: fecha,
            hora: hora,
            division: division,
            direccion: direccion,
            telefono: telefono,
            ampliado_de: ampliado_de ? ampliado_de : "",
            nombre_victima: nombre_victima,
            apellido_victima: apellido_victima,
            edad_victima: edad_victima,
            DNI_victima: dni_victima,
            genero_victima: genero,
            estado_civil_victima: estado_civil_victima,
            ocupacion_victima: ocupacion_victima,
            nacionalidad_victima: nacionalidad_victima,
            direccion_victima: direccion_victima,
            telefono_victima: telefono_victima,
            modo_actuacion: modo_actuacion,
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
                plaza_secretario: plaza_secretario ? plaza_secretario : 'Sin plaza',
            },
            instructor: {
                nombre_completo_instructor: nombre_completo_instructor,
                jerarquia_instructor: jerarquia_instructor,
            }
        })
        // Guardar la denuncia
        const denunciaSinVerificarSaved = await newDenunciaSinVerificar.save()
        res.json(denunciaSinVerificarSaved)

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

export const getDenunciasSinVerificarId = async (req, res) => {
    try {
        const { id } = req.params
        // Haz el find solamente de los que tengan como estado "En verificación"
        const obtenerDenunciasSinVerificar = await denunciaSinVerificar.findById(id)
        res.json(obtenerDenunciasSinVerificar);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }

}
type Query = {
    _id?: string,
    numero_de_expediente?: string,
    fecha?: { $gte: Date, $lte: Date },
    division?: string,
    ampliado_de?: { $exists: boolean, $ne: null }
    modo_actuacion?: string
}
export const getDenunciasSinVerificarAvanzado = async (req, res) => {
    try {
        const { division, municipio, comisaria, desde, hasta, id, expediente, mostrar_ampliaciones } = req.params;

        // Build divisionJunto string
        const divisionJunto = division + (municipio !== "no_ingresado" ? ", " + municipio + (comisaria !== "no_ingresado" ? ", " + comisaria : "") : "");

        // Base query object
        let query: Query = {};

        // Add conditions to query based on provided parameters
        if (id !== "no_ingresado") {
            query._id = id;
        } else if (expediente !== "no_ingresado") {
            query.numero_de_expediente = expediente;
            query.division = division;
        } else if (desde !== "no_ingresado" && hasta !== "no_ingresado") {
            query.fecha = { $gte: desde, $lte: hasta };
            if (division !== "no_ingresado") {
                query.division = divisionJunto;
            }
            if(mostrar_ampliaciones === "true") {
                query.modo_actuacion = "Ampliación de denuncia";
            }// Si mostrar_ampliaciones es false que no muestre cuando dice "Ampliación de denuncia"
            else {
                // @ts-ignore
                query.modo_actuacion = { $ne: "Ampliación de denuncia" };
            }   
        }

        // Execute the query
        const obtenerDenunciasSinVerificar = await denunciaSinVerificar.find(query);

        // Check if results were found
        if (!obtenerDenunciasSinVerificar || obtenerDenunciasSinVerificar.length === 0) {
            return res.status(404).json({ message: 'Denuncias no encontradas' });
        }

        // Ensure single ID result is returned as an array for consistency
        res.json(id !== "no_ingresado" ? [obtenerDenunciasSinVerificar[0]] : obtenerDenunciasSinVerificar);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }
};

export const getDenunciasSinVerificarByIdArray = async (req, res) => {

    try {
        let listaDenunciasArray: any = []
        const { id } = req.params
        // Busca por id a la denuncia
        const denunciaFound = await denunciaSinVerificar.findById(id)

        // Ahora itera sobre el array de id de ampliaciones y devuelvelelo

        if (!denunciaFound) {
            res.status(404).json({ message: 'No se encontró la denuncia.' });
            return
        }

        // @ts-ignore
        for (const id of denunciaFound?.ampliaciones_IDs) {
            const denunciaAmpliadaFound = await denunciaSinVerificar.findById(id)
            listaDenunciasArray.push(denunciaAmpliadaFound)
        }

        res.json(listaDenunciasArray)
    } catch (error) {
        console.log(error)
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
        const misDenunciasSinVerificar = await denunciaSinVerificar.find({ cargado_por: req.user.id })
        res.json(misDenunciasSinVerificar)
    } catch (error) {
        console.log(error)
    }
}

export const agregarAmpliacionDenuncia = async (req, res) => {
    try {
        const { id, idAmpliacion } = req.params

        const denunciaSinVerificarUpdate = await denunciaSinVerificar.findByIdAndUpdate(id, { $push: { ampliaciones_IDs: idAmpliacion } })
        res.json(denunciaSinVerificarUpdate)
    } catch (error) {
        console.log(error)
    }
}
