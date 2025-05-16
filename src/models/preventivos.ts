import mongoose from 'mongoose'

const preventivoSchema = new mongoose.Schema({
    supervision: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    }, 
    numero_nota: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    fecha: {
        type: Date, // Tipo de dato Date
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    division: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    objeto: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    consultado: {
        type: String, // Tipo de dato Boolean
        required: true, // Campo requerido
    },
    observaciones: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // - Resolución tomada
    resolucion: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    autoridades: {
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
    secretario: {
        nombre_completo_secretario: {
            type: String, // Tipo de dato String
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        jerarquia_secretario: {
            type: String, // Tipo de dato String
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        plaza_secretario: {
            type: String, // Tipo de dato String
            required: false, // Campo no requerido
            trim: true // Trim para que no se guarden espacios en blanco
        }
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


const preventivo = mongoose.model('preventivo', preventivoSchema)
export default preventivo