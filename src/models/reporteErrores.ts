// Importamos mongoose para poder crear el modelo de la base de datos
import mongoose from 'mongoose'

// Creamos el esquema de denuncia en la base de datos
const reporteErroresSchema = new mongoose.Schema({
    // Apartado donde ocurre el error
    apartado: {
        type: String,
        required: true
    },
    // Descripción del error
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },

},
    {
        timestamps: true // Timestamps para que guarde la fecha de creación y actualización
    }

)

const reporteErrores = mongoose.model('reporteErrores', reporteErroresSchema)
export default reporteErrores;