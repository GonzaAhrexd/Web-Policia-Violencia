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
    // Definciión de la edad de la victima
    edad: {
        type: Number, // Tipo de dato Number
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del DNI de la victima
    DNI: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        set: function(value: string) { // Función para remplazar los puntos y espacios del DNI
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
    // Definición del vínculo con el agresor
    vinculo_con_agresor: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la condición de vulnerabilidad de la victima
    condicion_de_vulnerabilidad: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la convivencia con el agresor
    convivencia: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la cantidad de denuncias previas
    cantidad_de_denuncias_previas: {
        type: Number, // Tipo de dato Number
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de parametros relacionados a hijos
    hijos:{
        tiene_hijos: { // Definición de si la victima tiene hijos
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
        },
        dependencia_economica: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false // Valor por defecto
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
        hijos_con_el_agresor: {
            type: Number, // Tipo de dato Number
            required: true, // Campo requerido
            trim: true, // Trim para que no se guarden espacios en blanco
            default: false, // Valor por defecto
        },
    }
})

// Exportamos el modelo de victimas
const victimas = mongoose.model('victimas', victimasSchema)
export default victimas;