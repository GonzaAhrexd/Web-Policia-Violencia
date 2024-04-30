import mongoose from 'mongoose'

const victimarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    edad: {
        type: Number,
        required: true,
        trim: true
    },
    DNI: {
        type: String,
        required: true,
        trim: true,
        set: function(value: string) {
            return value.replace(/\./g, '').replace(/\s/g, '');
        }
        
    },
    estado_civil: {
        type: String,
        required: true,
        trim: true
    },
    ocupacion: {
        type: String,
        required: true,
        trim: true
    },
    abuso_de_alcohol: {
        type: Boolean,
        required: true,
        trim: true
    },
    antecedentes_toxicologicos: {
        type: Boolean,
        required: true,
        trim: true
    },
    antecedentes_penales: {
        type: Boolean,
        required: true,
        trim: true
    },
    antecedentes_contravencionales: {
        type: Boolean,
        required: true,
        trim: true
    },
    entrenamiento_en_combate: {
        type: Boolean,
        required: true,
        trim: true
    },
    notificacion: {
        type: String,
        required: true,
        trim: true
    },
    cantidad_de_denuncias_previas: {
        type: Number,
        required: true,
        trim: true
    },

})

const victimario = mongoose.model('victimario', victimarioSchema)
export default victimario;