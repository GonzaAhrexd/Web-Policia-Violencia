import mongoose from 'mongoose'
import { object } from 'zod';
const denunciaSchema = new mongoose.Schema({
    victima_ID: {
        type: String,
        required: true,
        trim: true
    },
    victimario_ID: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    GIS: {
        type: String,
        required: true,
        trim: true
    },
    barrio: {
        type: String,
        required: true,
        trim: true
    },
    unidad_de_carga: {
        type: String,
        required: true,
        trim: true
    },
    municipio: {
        type: String,
        required: true,
        trim: true
    },
    jurisdiccion_policial: {
        type: String,
        required: true,
        trim: true
    },
    cuadricula: {
        type: String,
        required: true,
        trim: true
    },
    isDivision: {
        type: Boolean,
        required: true,
        trim: true
    },
    numero_de_expediente: {
        type: String,
        required: true,
        trim: true
    },
    is_expediente_completo: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    },
    juzgado_interviniente: {
        type: String,
        required: true,
        trim: true
    },
    dependencia_derivada: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    violencia: {
        type: String,
        required: true,
        trim: true
    },
    modalidades: {
        type: String,
        required: true,
        trim: true
    },
    tipo_de_violencia: {
        Fisica: {
            type: Boolean,
            required: true,
            trim: true
        },
        Psicologica: {
            type: Boolean,
            required: true,
            trim: true
        },
        Sexual: {
            type: Boolean,
            required: true,
            trim: true
        },
        Economica_y_patrimonial: {
            type: Boolean,
            required: true,
            trim: true
        },
        Simbolica: {
            type: Boolean,
            required: true,
            trim: true
        },
    },
    empleo_de_armas: {
        type: Boolean,
        required: true,
        trim: true,
    },
    arma_empleada: {
        type: String,
        required: true,
        trim: true
    },
    medida_solicitada_por_la_victima: {
        type: Boolean,
        required: true,
        trim: true
    },
    medida_dispuesta_por_autoridad_judicial: {
        type: Boolean,
        required: true,
        trim: true
    },
    medida: {
        prohibicion_de_acercamiento: {
            type: Boolean,
            required: true,
            trim: true
        },
        restitucion_de_menor: {
            type: Boolean,
            required: true,
            trim: true
        },
        exclusion_de_hogar: {
            type: Boolean,
            required: true,
            trim: true
        },
        alimento_provisorio: {
            type: Boolean,
            required: true,
            trim: true
        },
        derecho_de_comunicacion: {
            type: Boolean,
            required: true,
            trim: true
        },
        boton_antipanico: {
            type: Boolean,
            required: true,
            trim: true
        },
    },
    denunciado_por_tecero: {
        type: Boolean,
        required: true,
        trim: true
    },
    nombre_tercero: {
        type: String,
        trim: true
    },
    apellido_tercero: {
        type: String,
        trim: true
    },
    dni_tercero: {
        type: String,
        trim: true
    },
    vinculo_con_victima: {
        type: String,
        trim: true
    },
    observaciones: {
        type: String,
        trim: true,
        required: true
    }
})

const denuncia = mongoose.model('denuncia', denunciaSchema)
export default denuncia;