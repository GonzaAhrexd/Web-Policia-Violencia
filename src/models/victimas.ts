import mongoose from 'mongoose'

const victimasSchema = new mongoose.Schema({
    apellido: {
        type:  String,
        required: true,
        trim: true
    },
    nombre: {
        type:  String,
        required: true,
        trim: true
    },
    edad: {
        type:  Number,
        required: true,
        trim: true
    },
    DNI: {
        type:  Number,
        required: true,
        trim: true
    },
    estado_civil: {
        type:  String,
        required: true,
        trim: true
    },
    ocupacion: {
        type:  String,
        required: true,
        trim: true
    },
    hijos: {
        type:  Number,
        required: true,
        trim: true
    },
    hijo_mayor_edad: {
        type:  Boolean,
        trim: true
    },
    hijo_menor_edad: {
        type:  Boolean,
        trim: true
    },
    
    
    })

const victimas = mongoose.model('victimas', victimasSchema)
export default victimas;