import terceros from '../../models/terceros'
import denuncias from '../../models/denuncias'
// Obtener víctima
export const getTercero = async (req, res) => {
    try {
        console.log("HERE")
        //Obtener todas las denuncias donde el usuario sea el que cargó la denuncia
        const tercero = await terceros.findOne({ _id: req.params.id })
        res.json(tercero)
    } catch (error) {
        console.log(error)
    }
}
// Eliminar tercero, solo accesible desde este archivo
export const deleteTercero = async (id, denunciaId) => {
    try {
        // Buscar la víctima por ID
        const terceroABorrar = await terceros.findById(id);

        if (terceroABorrar) {
            // Verificar la cantidad de denuncias previas
            if (terceroABorrar.cantidad_de_denuncias == 1) {
                // Si solo tiene una denuncia previa, eliminar la víctima
                await terceros.findByIdAndDelete(id);
            } else {
                // Si tiene más de una denuncia, restar una a la cantidad de denuncias previas
                // y eliminar el ID de la denuncia del array denuncias_realizadas
                const updatedDenunciasRealizadas = Array.isArray(terceroABorrar.denuncias_realizadas)
                    ? terceroABorrar.denuncias_realizadas.filter(denuncia => denuncia !== denunciaId)
                    : [];

                await terceros.findByIdAndUpdate(id, {
                    $inc: { cantidad_de_denuncias_previas: -1 },
                    denuncias_realizadas: updatedDenunciasRealizadas
                }, { new: true });
            }
        } else {
            console.log("Tercero no encontrado");
        }
    } catch (error) {
        console.log(error);
    }
}

// Editar tercero
export const updateTercero = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima } = req.body

        const terceroUpdated = await terceros.findByIdAndUpdate(id, {
            nombre: nombre_tercero,
            apellido: apellido_tercero,
            DNI: dni_tercero,
            vinculo_con_victima: vinculo_con_la_victima
        }, { new: true })
        
        res.json(terceroUpdated)
        // Actualizar victima_nombre de las denuncias que tenga la víctima en caso de que se haya modificado
        await denuncias.updateMany({
            tercero_ID: id
        }, {
            tercero_nombre: `${nombre_tercero}`,
            tercero_apellido: `${apellido_tercero}`,
            dni_tercero: `${dni_tercero}`,
            vinculo_con_victima: `${vinculo_con_la_victima}`
        });

    } catch (error) {
        console.log(error)
    }

}

export const createTercero = async (req, res) => {
    //Tercero nuevo
    try {
        const { nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima } = req.body
        console.log(req.body)
        let terceroExistente = await terceros.findOne({ DNI: dni_tercero })
        
        console.log(terceroExistente ? 'Tercero ya existe' : 'Tercero nuevo')

        if (req.body.dni_tercero && !terceroExistente){
            const newTercero = new terceros({
                nombre: nombre_tercero,
                apellido: apellido_tercero,
                DNI: dni_tercero,
                vinculo_con_victima: vinculo_con_la_victima,
            })

            const terceroSaved = await newTercero.save()
            res.json({ message: 'Tercero creado con exito', id: terceroSaved._id })
        } else {

            // Actualiza los datos con los nuevos ingresados en caso de que difiera y suma 1 denuncia 
            const tercerosUpdate = await terceros.findOneAndUpdate({ DNI: dni_tercero }, {
                $set: {
                    nombre: nombre_tercero,
                    apellido: apellido_tercero,
                    DNI: dni_tercero,
                    vinculo_con_victima: vinculo_con_la_victima,
                }
            }, { new: true })

            // Incrementa la cantidad de denuncias previas
            await terceros.updateOne({ DNI: dni_tercero }, { $inc: { cantidad_de_denuncias_previas: 1 } });

            res.send('Tercero ya existe')
        }

    } catch (error) {
        console.log(error)
        res.send('Victima ya existe o no se ingresaron datos')
    }
}
