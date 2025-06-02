import radiograma from '../../models/radiograma'
import denunciaSinVerificar from '../../models/denunciaSinVerificar'
const mapRadiogramaData = (body) => ({
    nro_expediente: body.nro_expediente,
    nro_nota_preventivo: body.nro_nota_preventivo,
    solicita: body.solicita,
    consultado_preventivo: body.consultado_preventivo,
    resolucion_preventivo: body.resolucion_preventivo,
    preventivo_ID: body.preventivo_ID,
    observaciones: body.observaciones,
    objeto: body.objeto,
    destinatario: body.destinatario,
    fecha: body.fecha ? new Date(body.fecha) : new Date(),
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
    instructor: {
        nombre_completo_instructor: body.nombre_completo_instructor,
        jerarquia_instructor: body.jerarquia_instructor,
    },
});

export const createRadiograma = async (req, res) => {
    try {

        console.log(req.body)

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

        res.status(201).json(radiogramaData);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

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

export const editRadiograma = async (req, res) => {
    const { id_radiograma } = req.params;
    try {
        const radiogramaData = await radiograma.findByIdAndUpdate(id_radiograma, mapRadiogramaData(req.body), { new: true });
        if (!radiogramaData) {
            return res.status(404).json({ message: 'Radiograma no encontrado' });
        }
        res.status(200).json(radiogramaData);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
