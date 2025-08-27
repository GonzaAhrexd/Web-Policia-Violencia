// Importa los modelos de la base de datos
import denunciaSinVerificar from '../../models/denunciaSinVerificar'
import { agregarActividadReciente } from './crudActividadReciente'
import usuarios from '../../models/usuarios'

type denunciaSinVerificarType = {
    estado: string,
    cargado_por: string,
    numero_de_expediente: string,
    fecha: Date,
    hora: string,
    direccion: string,
    telefono: string,
    division: string,
    ampliado_de?: string,
    nombre_victima: string,
    apellido_victima: string,
    edad_victima: number,
    DNI_victima: string,
    estado_civil_victima: string,
    etnia_victima: string,
    modo_actuacion: string,
    ocupacion_victima: string,
    nacionalidad_victima?: string,
    genero_victima: string,
    direccion_victima?: string,
    telefono_victima?: string,
    sabe_leer_y_escribir_victima?: boolean,
    observaciones?: string,
    preguntas: {
        desea_ser_asistida: boolean,
        desea_ser_examinada_por_medico: boolean,
        desea_accionar_penalmente: boolean,
        desea_agregar_quitar_o_enmendar: boolean,
    },
    secretario: {
        nombre_completo_secretario: string,
        jerarquia_secretario: string,
        plaza_secretario?: string,
    },
    instructor: {
        nombre_completo_instructor: string,
        jerarquia_instructor: string,
        plaza_instructor?: string,
    }
    ampliaciones_IDs?: string[],
    preventivo_ID?: string,
    radiograma_ID?: string

}



// POST: Denuncias cargadas por agentes (Sin verificar)
export const createDenunciaSinVerificar = async (req, res) => {
    try {
        // Obtener la división del usuario
        const usuario = await usuarios.findById(req.user._id)
        const division = usuario?.unidad
        // Obtener los datos de la denuncia
        const { nombre_victima, numero_de_expediente, fecha, hora, ampliado_de, apellido_victima, genero, edad_victima, dni_victima, estado_civil_victima, modo_actuacion, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, etnia_victima, SabeLeerYEscribir, observaciones, AsistidaPorDichoOrganismo, ExaminadaMedicoPolicial, AccionarPenalmente, AgregarQuitarOEnmendarAlgo, nombre_completo_secretario, jerarquia_secretario, plaza_secretario, nombre_completo_instructor, jerarquia_instructor, agrega, direccion, telefono } = req.body
        // Crear la denuncia
        const newDenunciaSinVerificar = new denunciaSinVerificar({
            estado: "En verificación",
            cargado_por: req.user._id,
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
            etnia_victima: etnia_victima,
            modo_actuacion: modo_actuacion,
            sabe_leer_y_escribir_victima: SabeLeerYEscribir == "Sí" ? true : false,
            observaciones: observaciones,
            preguntas: {
                desea_ser_asistida: AsistidaPorDichoOrganismo == "Sí" ? true : false,
                desea_ser_examinada_por_medico: ExaminadaMedicoPolicial == "Sí" ? true : false,
                desea_accionar_penalmente: AccionarPenalmente == "Sí" ? true : false,
                desea_agregar_quitar_o_enmendar: AgregarQuitarOEnmendarAlgo == "Sí" ? true : false
            },
            agrega: agrega ? agrega : '',
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

        // Agregar actividad reciente
        await agregarActividadReciente(`Se creó una denuncia sin verificar con el número de expediente ${denunciaSinVerificarSaved.numero_de_expediente}`, "Denuncia Sin Verificar", denunciaSinVerificarSaved._id, req.cookies)


        res.json(denunciaSinVerificarSaved)

    } catch (error) {
        console.log(error)
    }
}
// GET: Obtener todas las denuncias sin verificar
export const getDenunciasSinVerificar = async (req, res) => {
    try {
        // Haz el find solamente de los que tengan como estado "En verificación"
        const obtenerDenunciasSinVerificar = await denunciaSinVerificar.find({ estado: "En verificación" })
        res.json(obtenerDenunciasSinVerificar);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }

}

// GET: Obtener una denuncia sin verificar por ID
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
    division?: { $regex: string, $options: string } | string,
    ampliado_de?: { $exists: boolean, $ne: null }
    modo_actuacion?: { $ne: string } | string,
}

// GET: Obtener denuncias sin verificar con filtros avanzados
export const getDenunciasSinVerificarAvanzado = async (req, res) => {
    try {
        
        const { division, municipio, comisaria, desde, hasta, id, expediente, mostrar_ampliaciones } = req.params;
        
        // DivisionJunto string
        const divisionJunto = division + (municipio !== "no_ingresado" ? "," + municipio + (comisaria !== "no_ingresado" ? "," + comisaria : "") : "");
  
        console.log(division)
        let query: Query = {};
        
        // Add conditions to query based on provided parameters
        if (id !== "no_ingresado") {
            query._id = id;
        } else if (expediente !== "no_ingresado") {
            query.numero_de_expediente = expediente;
        } else if (desde !== "no_ingresado" && hasta !== "no_ingresado") {
            query.fecha = { $gte: desde, $lte: hasta };

            if (division != "no_ingresado") {
                query.division =  { $regex: divisionJunto, $options: 'i' };
            }
            if (mostrar_ampliaciones === "true") {
                query.modo_actuacion = "Ampliación de denuncia";
            }// Si mostrar_ampliaciones es false que no muestre cuando dice "Ampliación de denuncia"
            else {
              
                query.modo_actuacion = { $ne: "Ampliación de denuncia" };
            }
        }
        
        console.log(query)
        // Busca las denuncias sin verificar según el query construido
        const obtenerDenunciasSinVerificar = await denunciaSinVerificar.find(query);
        
        // Si no se encuentran denuncias, devuelve un mensaje de error
        if (!obtenerDenunciasSinVerificar || obtenerDenunciasSinVerificar.length === 0) {
            return res.status(404).json({ message: 'Denuncias no encontradas' });
        }

        await agregarActividadReciente("Se realizó una búsqueda de denuncias sin verificar", "Denuncia Sin Verificar", "Varias", req.cookies);
        // Devuelve las denuncias encontradas
        res.json(id !== "no_ingresado" ? [obtenerDenunciasSinVerificar[0]] : obtenerDenunciasSinVerificar);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }
};

// GET: Obtener denuncias sin verificar por ID de ampliaciones
export const getDenunciasSinVerificarByIdArray = async (req, res) => {
    try {
        let listaDenunciasArray: any = []
        const { id } = req.params
        // Busca por id a la denuncia
        const denunciaFound: denunciaSinVerificarType | null = await denunciaSinVerificar.findById(id)

        // Ahora itera sobre el array de id de ampliaciones y devuelvelelo

        if (!denunciaFound) {
            res.status(404).json({ message: 'No se encontró la denuncia.' });
            return
        }

        if(denunciaFound.ampliaciones_IDs) {
            for (const id of denunciaFound.ampliaciones_IDs) {
                const denunciaAmpliadaFound = await denunciaSinVerificar.findById(id)
                listaDenunciasArray.push(denunciaAmpliadaFound)
            }
        }else{
            res.status(404).json({ message: 'No se encontraron ampliaciones para esta denuncia.' });
            return
        }

        res.json(listaDenunciasArray)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }
}

// POST: Editar denuncias sin verificar y que cambie a estado Aprobado
export const validarDenuncia = async (req, res) => {
    try {
        const { id } = req.params
        const denunciaSinVerificarUpdateState: any = await denunciaSinVerificar.findByIdAndUpdate(id, { estado: "Aprobada" })

        // Agregar actividad reciente
        await agregarActividadReciente(`Se aprobó una denuncia sin verificar con el número de expediente ${denunciaSinVerificarUpdateState?.numero_de_expediente}`, "Denuncia Sin Verificar", denunciaSinVerificarUpdateState?._id, req.cookies)

        res.json(denunciaSinVerificarUpdateState)
    } catch (error) {
        console.log(error)
    }
}

// DELETE: Eliminar denuncias sin verificar
export const deleteDenunciaSinVerificar = async (req, res) => {
    try {
        // En lugar de eliminarlo, quiero que cambies el estado a "Rechazada"
        const { id } = req.params
        const denunciaSinVerificarDeleted: any = await denunciaSinVerificar.findByIdAndUpdate(id, { estado: "Rechazada" })
        // Agregar actividad reciente
        await agregarActividadReciente(`Se rechazó una denuncia sin verificar con el número de expediente ${denunciaSinVerificarDeleted?.numero_de_expediente}`, "Denuncia Sin Verificar", denunciaSinVerificarDeleted?._id, req.cookies)
        res.json(denunciaSinVerificarDeleted)
    } catch (error) {
        console.log(error)
    }
}

// GET: Listar mis denuncias sin verificar
export const listarMisDenunciasSinVerificar = async (req, res) => {
    try {
        const misDenunciasSinVerificar = await denunciaSinVerificar.find({ cargado_por: req.user._id })

        // Agregar actividad reciente
        await agregarActividadReciente("Se listaron las denuncias sin verificar del usuario", "Denuncia Sin Verificar", "Varias", req.cookies)
        res.json(misDenunciasSinVerificar)
    } catch (error) {
        console.log(error)
    }
}

// POST: Agregar ampliación a una denuncia sin verificar
export const agregarAmpliacionDenuncia = async (req, res) => {
    try {
        const { id, idAmpliacion } = req.params

        const denunciaSinVerificarUpdate: any = await denunciaSinVerificar.findByIdAndUpdate(id, { $push: { ampliaciones_IDs: idAmpliacion } })
        
        // Agregar actividad reciente
        await agregarActividadReciente(`Se agregó una ampliación a la denuncia sin verificar con el número de expediente ${denunciaSinVerificarUpdate?.numero_de_expediente}`, "Denuncia Sin Verificar", denunciaSinVerificarUpdate?._id, req.cookies)
        res.json(denunciaSinVerificarUpdate)
    } catch (error) {
        console.log(error)
    }
}
