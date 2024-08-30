import mongoose from 'mongoose'

// Definición del esquema de actividadReciente
const actividadRecienteSchema = new mongoose.Schema({
    // Definición de la fecha de la actividad
    fecha: {
        type: Date, // Tipo de dato Date
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la descripción de la actividad
    descripcion: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    modelo_modificado: {
        type: String, // Tipo de dato String
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios
    },
    id_del_modelo: {
        type: String, // Tipo de dato String
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios
    },
    // Definición del usuario que realizó la actividad
    usuario: {
        type: String, // Tipo de dato ObjectId
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    id_usuario: {
        type: String, // Tipo de dato ObjectId
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    }
})

// Creamos el modelo de actividadReciente en la base de datos
const actividadReciente = mongoose.model('actividadReciente', actividadRecienteSchema)
export default actividadReciente;