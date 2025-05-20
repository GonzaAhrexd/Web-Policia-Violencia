import preventivo from '../../models/preventivos'
import denunciaSinVerificar from '../../models/denunciaSinVerificar'
const mapPreventivoData = (body) => ({
    supervision: body.supervision,
    numero_nota: body.numero_nota,
    fecha: body.fecha_preventivo,
    division: body.division,
    resolucion: body.resolucion,
    objeto: body.objeto,
    consultado: body.consultado,
    autoridades: body.autoridades,
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
        res.json({ message: 'Preventivo creado con éxito' });
    } catch (error: any) {
        console.error('Error creando preventivo:', error);
        res.status(500).json({ message: 'Error al crear el preventivo', error: error.message });
    }
};

export const editPreventivo = async (req, res) => {
    console.log("Probando")
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
        res.json(updatedPreventivo);
    } catch (error:any) {
        console.error('Error editando preventivo:', error);
        res.status(500).json({ message: 'Error al editar el preventivo', error: error.message });
    }
};


export const buscarPreventivo = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { id_preventivo, numero_nota, desde, hasta, division } = req.params

        // Si se ingresa el ID, buscar solo por ID
        if (id_preventivo != "no_ingresado") {
            const foundPreventivo = await preventivo.findById(id_preventivo)
            if (!foundPreventivo) {
                return res.status(404).json({ message: 'Preventivo no encontrado' })
            }
            return res.json(foundPreventivo)
        }
        // Si se ingresa número de nota, buscar solo por número de nota
        if (numero_nota  != "no_ingresado") {
            const foundPreventivo = await preventivo.find({ 
                numero_nota: numero_nota
             })
            if (!preventivo) {
                return res.status(404).json({ message: 'Preventivo no encontrado' })
            }
            return res.json(foundPreventivo)
        }
        // Si se ingresa fecha, buscar por fecha
        if ((desde  != "no_ingresado") && (hasta  != "no_ingresado"))  {
            const foundPreventivo = await preventivo.find({ 
                fecha: { $gte: desde, $lte: hasta } 
            })
            if (division != "no_ingresado") {
                // Busca por division, municipio y comisaria
                const foundPreventivo = await preventivo.find({
                     fecha: { $gte: desde, $lte: hasta }, 
                     division: division 
                    })


                res.json(foundPreventivo);
                return
            }

            if (!preventivo) {
                return res.status(404).json({ message: 'Preventivo no encontrado' })
            }
            return res.json(foundPreventivo)
        }



    } catch (error) {
        console.log(error)
    }

}

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


export const deletePreventivo = async (req, res) => {
    try {
        const { id_preventivo } = req.params
        const deletedPreventivo = await preventivo.findByIdAndDelete(id_preventivo)
        if (!deletedPreventivo) {
            return res.status(404).json({ 
                message: 'Preventivo no encontrado' 
            })
        }
        res.json({ message: 'Preventivo eliminado con éxito' })
    } catch (error: any) {
        console.error('Error eliminando preventivo:', error)
        res.status(500).json({ message: 'Error al eliminar el preventivo', error: error.message })
    }
}
