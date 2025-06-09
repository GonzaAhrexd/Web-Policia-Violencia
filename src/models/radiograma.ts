import mongoose from 'mongoose';

const radiogramaSchema = new mongoose.Schema({

    // --- Datos generales ---
    supervision: {
        type: String,
        required: true,
        trim: true
    },
    nro_expediente: {
        type: String,
        required: true,
        trim: true
    },
    nro_nota_preventivo: {
        type: String,
        required: true,
        trim: true
    },
    nro_nota_preventivo_anterior: {
        type: String,
        trim: true,
        default: null
    },
    tipo_radiograma: {
        type: String,
        required: true,
        trim: true,
        default: "Radiograma"
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    fecha_anterior: {
        type: Date,
        default: null
    },
    hora: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    destinatario: {
        type: String,
        required: true,
        trim: true
    },
    objeto: {
        type: String,
        required: true,
        trim: true
    },
    observaciones: {
        type: String,
        trim: true
    },

    // --- Relaciones con otros documentos ---
    preventivo_ID: {
        type: String,
        required: true,
        trim: true
    },
    ampliado_de: {
        type: String,
        trim: true
    },
    ampliacion_ID: {
        type: String,
        trim: true
    },

    // --- Consultas y resolución ---
    solicita: {
        type: String,
        required: true,
        trim: true
    },
    consultado_preventivo: {
        type: String,
        required: true,
        trim: true
    },
    resolucion_preventivo: {
        type: String,
        required: true,
        trim: true
    },

    // --- Datos de la víctima ---
    nombre_victima: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    apellido_victima: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    edad_victima: {
        type: Number,
        required: true
    },
    DNI_victima: {
        type: String,
        required: true,
        trim: true,
        set: (value: string) => value.replace(/\./g, '').replace(/\s/g, '')
    },
    estado_civil_victima: {
        type: String,
        required: true,
        trim: true
    },
    ocupacion_victima: {
        type: String,
        required: true,
        trim: true
    },
    nacionalidad_victima: {
        type: String,
        trim: true
    },
    genero_victima: {
        type: String,
        required: true,
        trim: true
    },
    direccion_victima: {
        type: String,
        trim: true
    },
    telefono_victima: {
        type: String,
        trim: true
    },

    // --- Instructor ---
    instructor: {
        nombre_completo_instructor: {
            type: String,
            required: true,
            trim: true
        },
        jerarquia_instructor: {
            type: String,
            required: true,
            trim: true
        }
    }
});

const radiograma = mongoose.model('radiograma', radiogramaSchema);
export default radiograma;
