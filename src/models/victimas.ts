import mongoose from 'mongoose'

const victimasSchema = new mongoose.Schema({
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
    vinculo_con_agresor: {
        type: String,
        required: true,
        trim: true
    },
    condicion_de_vulnerabilidad: {
        type: String,
        required: true,
        trim: true
    },
    convivencia: {
        type: Boolean,
        required: true,
        trim: true
    },
    cantidad_de_denuncias_previas: {
        type: Number,
        required: true,
        trim: true
    },
    hijos:{
        tiene_hijos: {
            type: Boolean,
            required: true,
            trim: true,
        },
        dependencia_economica: {
            type: Boolean,
            required: true,
            trim: true,
            default: false
        },
        mayores_de_edad: {
            type: Boolean,
            required: true,
            trim: true,
            default: false
        },
        menores_de_edad: {
            type: Boolean,
            required: true,
            trim: true,
            default: false
        },
        menores_discapacitados: {
            type: Boolean,
            required: true,
            trim: true,
            default: false
        },
        hijos_con_el_agresor: {
            type: Number,
            required: true,
            trim: true,
            default: false,
        },

    }

})

const victimas = mongoose.model('victimas', victimasSchema)
export default victimas;