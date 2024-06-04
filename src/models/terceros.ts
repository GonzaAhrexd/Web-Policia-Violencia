// Importamos mongoose para poder crear el modelo de la base de datos
import mongoose, { Model, Mongoose } from 'mongoose'

// Creamos el esquema de Victimas en la base de datos
const tercerosSchema = new mongoose.Schema({
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
    // Definición del DNI de la victima
    DNI: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        set: function (value: string) { // Función para remplazar los puntos y espacios del DNI
            return value.replace(/\./g, '').replace(/\s/g, '');
        }
    },
    // Definición del vínculo con el agresor
    vinculo_con_victima: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },    
    // Denuncias realizadas por el tercero
    denuncias_realizadas: {
        type: [String], // Tipo de dato Array
        required: false, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    cantidad_de_denuncias: {
        type: Number, // Tipo de dato Number
        required: false, // Campo requerido
    }
},
    {
        timestamps: true // Timestamps para que guarde la fecha de creación y actualización
    })

// Exportamos el modelo de victimas
const terceros = mongoose.model('terceros', tercerosSchema)

export default terceros;