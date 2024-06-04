import terceros from '../../models/terceros'

// Obtener víctima
export const getTercero = async (req, res) => {

    try {
        //Obtener todas las denuncias donde el usuario sea el que cargó la denuncia
        const tercero = await terceros.findOne({ _id: req.params.id })
        res.json(tercero)
    } catch (error) {
        console.log(error)
    }

}