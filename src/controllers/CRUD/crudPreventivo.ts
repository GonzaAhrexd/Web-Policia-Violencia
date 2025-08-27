import preventivo from '../../models/preventivos'
import denunciaSinVerificar from '../../models/denunciaSinVerificar'
import { agregarActividadReciente } from './crudActividadReciente';
type Query = {
    _id?: string,
    numero_nota?: string,
    fecha?: { $gte: Date, $lte: Date },
    division?: string,
    ampliado_de?: { $exists: boolean, $ne: null }
}

const mapPreventivoData = (body) => ({
    supervision: body.supervision,
    numero_nota: body.numero_nota,
    numero_nota_anterior: body.numero_nota_anterior,
    tipo_preventivo: body.tipo_preventivo,
    tipo_ampliacion: body.tipo_ampliacion,
    fecha: body.fecha_preventivo,
    division: body.division,
    resolucion: body.resolucion,
    objeto: body.objeto,
    objeto_anterior: body.objeto_anterior,
    con_denuncia_ampliada: body.con_denuncia_ampliada ? body.con_denuncia_ampliada : false,
    consultado: body.consultado,
    autoridades: body.autoridades,
    numero_de_expediente: body.numero_de_expediente,
    nombre_victima: body.nombre_victima,
    apellido_victima: body.apellido_victima,
    genero_victima: body.genero_victima || 'No especificado',
    edad_victima: body.edad_victima,
    DNI_victima: body.DNI_victima,
    estado_civil_victima: body.estado_civil_victima,
    ocupacion_victima: body.ocupacion_victima,
    nacionalidad_victima: body.nacionalidad_victima,
    direccion_victima: body.direccion_victima,
    telefono_victima: body.telefono_victima,
    etnia_victima: body.etnia_victima,
    sabe_leer_y_escribir_victima: body.sabe_leer_y_escribir_victima === 'Sí',
    observaciones: body.observaciones + (body.agrega ? `\n${body.agrega}` : ''),
    secretario: {
        nombre_completo_secretario: body.nombre_completo_secretario,
        jerarquia_secretario: body.jerarquia_secretario,
        plaza_secretario: body.plaza_secretario
    },
    instructor: {
        nombre_completo_instructor: body.nombre_completo_instructor,
        jerarquia_instructor: body.jerarquia_instructor
    }
});

// POST: Controlador para crear un preventivo
export const createPreventivo = async (req, res) => {
    try {
        const newPreventivo = new preventivo(mapPreventivoData(req.body));

        // Busca el ID de la denuncia en la base de datos y agregale en preventivoID el id recién creado
        const foundDenuncia = await denunciaSinVerificar.findById(req.body._id);
        if (!foundDenuncia) {
            return res.status(404).json({ message: 'Denuncia no encontrada' });
        }
        // Agrega el ID del preventivo a la denuncia
        foundDenuncia.preventivo_ID = newPreventivo._id.toString();

        // Guarda la denuncia con el ID del preventivo
        await newPreventivo.save();
        await foundDenuncia.save();
        await agregarActividadReciente("Se creó un preventivo para una denuncia sin verificar", "Preventivo", foundDenuncia._id.toString(), req.user?._id);
        res.json({ message: 'Preventivo creado con éxito' });
    } catch (error: any) {
        console.error('Error creando preventivo:', error);
        res.status(500).json({ message: 'Error al crear el preventivo', error: error.message });
    }
};

// POST: Controlador para ampliar un preventivo
export const ampliarPreventivo = async (req, res) => {
    try {
        const newPreventivo = new preventivo(mapPreventivoData(req.body));
        // En el preventivo ID agregale el id del preventivo ampliado
        newPreventivo.ampliado_de = req.body._id;
        await newPreventivo.save();

        const preventivoOriginal = await preventivo.findByIdAndUpdate(req.body._id, {preventivo_ampliado_ID: newPreventivo._id.toString()}, {new: true});
        
        if(!preventivoOriginal) {
            return res.status(404).json({ message: 'Preventivo original no encontrado' });
        }
        
        await preventivoOriginal.save();
        await agregarActividadReciente("Se amplió un preventivo", "Preventivo", preventivoOriginal._id.toString(), req.user?._id);
        res.json({ message: 'Preventivo creado con éxito' });
    } catch (error: any) {
        console.error('Error creando preventivo:', error);
        res.status(500).json({ message: 'Error al crear el preventivo', error: error.message });
    }
};

// PUT: Controlador para editar un preventivo
export const editPreventivo = async (req, res) => {
    try {
        const { id_preventivo } = req.params;
        const updatedPreventivo = await preventivo.findByIdAndUpdate(
            id_preventivo,
            mapPreventivoData(req.body),
            { new: true }
        );

        if (!updatedPreventivo) {
            return res.status(404).json({ message: 'Preventivo no encontrado' });
        }
        // Agregar actividad reciente
        await agregarActividadReciente("Se editó un preventivo", "Preventivo", updatedPreventivo._id.toString(), req.user?._id);
        res.json(updatedPreventivo);
    } catch (error:any) {
        console.error('Error editando preventivo:', error);
        res.status(500).json({ message: 'Error al editar el preventivo', error: error.message });
    }
};


// GET: Controlador para buscar preventivos
export const buscarPreventivo = async (req, res) => {
    try {
        const { id_preventivo, numero_nota, desde, hasta, division, mostrar_ampliaciones } = req.params;

        // Base query object
        let query: Query = {};

        if (id_preventivo !== "no_ingresado") {
            query._id = id_preventivo;
        } else if (numero_nota !== "no_ingresado") {
            query.numero_nota = numero_nota;
        } else if (desde !== "no_ingresado" && hasta !== "no_ingresado") {
            query.fecha = { $gte: desde, $lte: hasta };
            
            if (division !== "no_ingresado") {
                query.division = division;
            }
                
            if (mostrar_ampliaciones === "true") {
                query.ampliado_de = { $exists: true, $ne: null };
            }
        }

        // Execute the query
        const foundPreventivo = await preventivo.find(query);

        // Check if results were found
        if (!foundPreventivo || foundPreventivo.length === 0) {
            return res.status(404).json({ message: 'Preventivo no encontrado' });
        }

        return res.json(foundPreventivo);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

// GET: Controlador para buscar un preventivo por ID
export const buscarPreventivoID = async (req, res) => {
    try {
        const { id_preventivo } = req.params
        const foundPreventivo = await preventivo.findById(id_preventivo)
        if (!foundPreventivo) {
            return res.status(404).json({ message: 'Preventivo no encontrado' })
        }
        res.json(foundPreventivo)
    } catch (error) {
        console.log(error)
    }
}

// DELETE: Controlador para eliminar un preventivo
export const deletePreventivo = async (req, res) => {
    try {
        const { id_preventivo } = req.params
        const deletedPreventivo = await preventivo.findByIdAndDelete(id_preventivo)
        if (!deletedPreventivo) {
            return res.status(404).json({ 
                message: 'Preventivo no encontrado' 
            })
        }
        // Agregar actividad reciente
        await agregarActividadReciente("Se eliminó un preventivo", "Preventivo", deletedPreventivo._id.toString(), req.user?._id);
        res.json({ message: 'Preventivo eliminado con éxito' })
    } catch (error: any) {
        console.error('Error eliminando preventivo:', error)
        res.status(500).json({ message: 'Error al eliminar el preventivo', error: error.message })
    }
}