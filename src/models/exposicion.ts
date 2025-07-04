// Importamos mongoose para poder crear el modelo de la base de datos
import mongoose, { Model, Mongoose } from 'mongoose'

// Creamos el esquema de Victimas en la base de datos
const exposicionSchema = new mongoose.Schema({
    // Número de expediente
    numero_de_expediente: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Fecha
    fecha: {
        type: Date, // Tipo de dato Date
        default: Date.now // Fecha por defecto es la fecha actual
    },
    // Hora
    hora: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Dirección
    direccion: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Teléfono
    telefono: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // División donde se cargó
    division: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del nombre de la victima
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
    // Definición de la ocupación de la victima
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
    sabe_leer_y_escribir_victima: {
        type: Boolean, // Tipo de dato Boolean
        required: false, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    observaciones: {
        type: String, // Tipo de dato String
        required: false, // Campo no requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Preguntas
    preguntas: {
        desea_agregar_quitar_o_enmendar: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        }
    },
    agrega: {
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
            required: false, // Campo requerido
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
},
    {
        timestamps: true // Timestamps para que guarde la fecha de creación y actualización
    })

// Exportamos el modelo de victimas
const exposicion = mongoose.model('exposicion', exposicionSchema)
export default exposicion;