import radiograma from '../../models/radiograma'
import denunciaSinVerificar from '../../models/denunciaSinVerificar'
import { agregarActividadReciente } from './crudActividadReciente';

const mapRadiogramaData = (body) => ({
    supervision: body.supervision,
    nro_expediente: body.nro_expediente,
    nro_nota_preventivo: body.nro_nota_preventivo,
    nro_nota_preventivo_anterior: body.nro_nota_preventivo_anterior || null,
    ampliado_de: body.ampliado_de || null,
    solicita: body.solicita,
    consultado_preventivo: body.consultado_preventivo,
    resolucion_preventivo: body.resolucion_preventivo,
    preventivo_ID: body.preventivo_ID,
    observaciones: body.observaciones,
    objeto: body.objeto,
    destinatario: body.destinatario,
    tipo_radiograma: body.tipo_radiograma || "Radiograma",
    fecha: body.fecha ? new Date(body.fecha) : new Date(),
    fecha_anterior: body.fecha_anterior ? new Date(body.fecha_anterior) : null,
    hora: body.hora,
    direccion: body.direccion,
    telefono: body.telefono,
    nombre_victima: body.nombre_victima,
    apellido_victima: body.apellido_victima,
    edad_victima: body.edad_victima,
    DNI_victima: body.DNI_victima,
    estado_civil_victima: body.estado_civil_victima,
    ocupacion_victima: body.ocupacion_victima,
    nacionalidad_victima: body.nacionalidad_victima,
    genero_victima: body.genero_victima,
    direccion_victima: body.direccion_victima,
    telefono_victima: body.telefono_victima,
    etnia_victima: body.etnia_victima,
    instructor: {
        nombre_completo_instructor: body.nombre_completo_instructor,
        jerarquia_instructor: body.jerarquia_instructor,
    },
});

// POST: Controlador para crear un radiograma
export const createRadiograma = async (req, res) => {
    try {

        const radiogramaData = new radiograma(mapRadiogramaData(req.body));
        await radiogramaData.save();

        // Agrega el id del radiograma a la denuncia sin verificar si existe
        if (req.body.id_denuncia_sin_verificar) {
            const denuncia = await denunciaSinVerificar.findById(req.body.id_denuncia_sin_verificar);
            if (denuncia) {
                denuncia.radiograma_ID = radiogramaData._id.toString();
                await denuncia.save();
            }
        }
        
        await agregarActividadReciente("Se creó un radiograma", "Radiograma", radiogramaData._id.toString(), req.user?._id);

        res.status(201).json(radiogramaData);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

// GET: Controlador para radiograma por ID
export const buscarRadiogramaID = async (req, res) => {
    const { id_radiograma } = req.params;
    try {
        const radiogramaData = await radiograma.findById(id_radiograma);
        if (!radiogramaData) {
            return res.status(404).json({ message: 'Radiograma no encontrado' });
        }
        
        res.status(200).json(radiogramaData);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


// PUT: Controlador para editar un radiograma
export const editRadiograma = async (req, res) => {

    const { id_radiograma } = req.params;
    try {
        const radiogramaData = await radiograma.findByIdAndUpdate(id_radiograma, mapRadiogramaData(req.body), { new: true });
        if (!radiogramaData) {
            return res.status(404).json({ message: 'Radiograma no encontrado' });
        }
        
        // Agregar actividad reciente
        await agregarActividadReciente("Se editó un radiograma", "Radiograma", radiogramaData._id.toString(), req.cookies);
        
        res.status(200).json(radiogramaData);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

// POST: Controlador para ampliar un radiograma
export const ampliarRadiograma = async (req, res) => {
    const { id_radiograma_anterior, id_radiograma_nuevo } = req.params;
    try {
        const radiogramaData = await radiograma.findByIdAndUpdate(id_radiograma_anterior, { ampliacion_ID: id_radiograma_nuevo }, { new: true });
        if (!radiogramaData) {
            return res.status(404).json({ message: 'Radiograma no encontrado' });
        }
        // Actualiza el campo ampliado_de del nuevo radiograma
        const nuevoRadiograma = await radiograma.findByIdAndUpdate(id_radiograma_nuevo, { ampliado_de: id_radiograma_anterior }, { new: true });
        if (!nuevoRadiograma) {
            return res.status(404).json({ message: 'Nuevo radiograma no encontrado' });
        }

        // Agregar actividad reciente
        await agregarActividadReciente("Se amplió un radiograma", "Radiograma", nuevoRadiograma._id.toString(), req.user?._id);

        res.status(200).json(radiogramaData);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE: Elimina un radiograma y su referencia en la denuncia sin verificar
export const deleteRadiograma = async (req, res) => {
    const { id_radiograma } = req.params;
    try{
        const radiogramaData = await radiograma.findByIdAndDelete(id_radiograma);
        if (!radiogramaData) {
            return res.status(404).json({ message: 'Radiograma no encontrado' });
        }
        // Elimina la referencia al radiograma en la denuncia sin verificar si existe
        await denunciaSinVerificar.updateMany({ radiograma_ID: id_radiograma }, { $unset: { radiograma_ID: "" } });

        // Agregar actividad reciente
        await agregarActividadReciente("Se eliminó un radiograma", "Radiograma", id_radiograma, req.user?._id);

        res.status(200).json({ message: 'Radiograma eliminado correctamente' });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar el radiograma' });
    }
}