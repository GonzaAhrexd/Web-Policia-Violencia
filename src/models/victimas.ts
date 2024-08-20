// Importamos mongoose para poder crear el modelo de la base de datos
import mongoose, { Model, Mongoose } from 'mongoose'

// Creamos el esquema de Victimas en la base de datos
const victimasSchema = new mongoose.Schema({
    // Definición del nombre de la victima
    nombre: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición del apellido de la victima
    apellido: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición de la dirección de la victima
    direccion: {
        type: String, // Tipo de dato String
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definciión de la edad de la victima
    edad: {
        type: Number, // Tipo de dato Number
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del DNI de la victima
    DNI: {
        unique: true, // Campo único
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        set: function (value: string) { // Función para remplazar los puntos y espacios del DNI
            return value.replace(/\./g, '').replace(/\s/g, '');
        }
    },
    // Definición del estado civil de la victima
    estado_civil: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la ocupación de la victima
    ocupacion: {
        type: String,  // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la condición de vulnerabilidad de la victima
    condicion_de_vulnerabilidad: {
        type: Boolean, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    condiciones_de_vulnerabilidad: {
        embarazo: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        periodo_post_parto: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        periodo_de_lactancia: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        discapacidad: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        enfermedad_cronica: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        adulto_mayor: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        menor_de_edad: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        tratamiento_psicologico: {
            type: Boolean, // Tipo de dato Boolean
            required: false, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
    },
   
    // Definición de parametros relacionados a hijos
    hijos: {
        tiene_hijos: { // Definición de si la victima tiene hijos
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
        },
        mayores_de_edad: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        menores_de_edad: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
        menores_discapacitados: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
        },
    },
    denuncias_realizadas: {
        type: [String], // Tipo de dato Array
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    }
},
    {
        timestamps: true // Timestamps para que guarde la fecha de creación y actualización
    })

// Exportamos el modelo de victimas
const victimas = mongoose.model('victimas', victimasSchema)
export default victimas;