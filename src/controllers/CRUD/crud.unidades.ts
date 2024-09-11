import unidades from '../../models/unidadesCampos';

// Función para crear una unidad
export const createUnidad = async (req, res) => {
    try {
        // Se crea la unidad
        const unidad = new unidades(req.body)
        // Se guarda la unidad en la base de datos
        await unidad.save()
        // Se retorna la unidad
        return res.status(201).json(unidad)
    } catch (error) {
        console.log(error)
    }
}

// Función para obtener todas las unidades
export const getUnidades = async (req, res) => {
    try {
        const unidadesList = await unidades.find()
        res.json(unidadesList)
    } catch (error) {
        console.log(error)
    }
}

// Función para actualizar una unidad
export const updateUnidad = async (req, res) => {
    try {
        const { id } = req.params
        const unidad = await unidades.findByIdAndUpdate

    } catch (error) {
        console.log(error)
    }
}

// Función para eliminar una unidad
export const deleteUnidad = async (req, res) => {
    try {
        const { id } = req.params
        await unidades.findByIdAndDelete(id)
        res.json({ message: "Unidad eliminada" })
    } catch (error) {
        console.log(error)
    }
}

