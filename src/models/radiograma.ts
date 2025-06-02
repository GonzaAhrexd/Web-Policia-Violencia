import mongoose, { Model, Mongoose } from 'mongoose'

const radiogramaSchema = new mongoose.Schema({
    nro_expediente: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    nro_nota_preventivo: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    tipo_radiograma: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        default: "Radiograma" // Valor por defecto
    },
    preventivo_ID: {
        type: String,
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    ampliacion_ID: {
        type: String, // Tipo de dato String
        required: false, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    solicita: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    consultado_preventivo: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    resolucion_preventivo: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    observaciones: {
        type: String,
        required: false, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    objeto: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    fecha: {
        type: Date, // Tipo de dato Date
        default: Date.now // Fecha por defecto es la fecha actual
    },
    hora: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    direccion: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    telefono: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    destinatario: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
     nombre_victima: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición del apellido de la victima
    apellido_victima: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definciión de la edad de la victima
    edad_victima: {
        type: Number, // Tipo de dato Number
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del DNI de la victima
    DNI_victima: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        set: function (value: string) { // Función para remplazar los puntos y espacios del DNI
            return value.replace(/\./g, '').replace(/\s/g, '');
        }
    },
    // Definición del estado civil de la victima
    estado_civil_victima: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    ocupacion_victima: {
        type: String,  // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Estos campos solo los cargan los agentes
    nacionalidad_victima: {
        type: String, // Tipo de dato String
        required: false, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    genero_victima: {
        type: String, // Tipo de dato String
        required: true, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    direccion_victima: {
        type: String, // Tipo de dato String
        required: false, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    telefono_victima: {
        type: String, // Tipo de dato String
        required: false, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    instructor: {
        nombre_completo_instructor: {
            type: String, // Tipo de dato String
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        jerarquia_instructor: {
            type: String, // Tipo de dato String
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        }
    },


})

const radiograma = mongoose.model('radiograma', radiogramaSchema)
export default radiograma;