// Importamos mongoose para poder crear el modelo de la base de datos
import mongoose from 'mongoose'
import { object } from 'zod';

// Creamos el esquema de denuncia en la base de datos
const denunciaSchema = new mongoose.Schema({
    // Definición del ID de la victima
    victima_ID: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del nombre de la victima
    victima_nombre: { 
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición del ID del victimario
    victimario_ID: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
    },
    // Definición del nombre del victimario
    victimario_nombre: { 
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición relación entre las partes
    relacion_victima_victimario: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    hijos_victima_con_victimario: {
        type: Number, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        default: false // Default en false
    },
    // Definición del genero de la victima
    genero: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la fecha de la denuncia
    fecha: {
        type: Date, // Tipo de dato Date
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la dirección de la denuncia
    direccion: { 
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del GIS de la denuncia
    GIS: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco      
        set: function(value) {
            // Remover caracteres no deseados usando una expresión regular
            return value ? value.replace(/[^\d\-. ]/g, '').replace(/\s+/g, ' ').trim() : value;
        }  
    },
    // Definición del barrio de la denuncia
    barrio: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la unidad de carga
    unidad_de_carga: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del municipio de carga
    municipio: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la jurisdicción policial
    jurisdiccion_policial: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la cuadricula
    cuadricula: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la division
    isDivision: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición del numero de expediente
    numero_de_expediente: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de si el expediente esta completo
    is_expediente_completo: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        default: false // Default en false
    },
    // Definición del juzgado interviniente
    juzgado_interviniente: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la dependencia derivada
    dependencia_derivada: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
        uppercase: true //Uppercase para que se guarde en mayúsculas
    },
    // Definición del tipo de violencia
    violencia: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de las modalidades
    modalidades: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de los tipos de violencia
    tipo_de_violencia: {
        // Definición de la violencia fisica
        Fisica: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de la violencia psicologica
        Psicologica: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de la violencia sexual
        Sexual: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de la violencia economica y patrimonial
        Economica_y_patrimonial: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de la violencia simbolica
        Simbolica: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de la violencia politica
        Politica: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        }
    },
    // Definición del empleo de armas
    empleo_de_armas: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true, // Trim para que no se guarden espacios en blanco
    },
    // Definición de arma empleada
    arma_empleada: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la medida solicitada por la victima
    medida_solicitada_por_la_victima: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la medida dispuesta por autoridad judicial
    medida_dispuesta_por_autoridad_judicial: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    // Definición de la medida
    medida: {
        // Definición de prohibicion de acercamiento
        prohibicion_de_acercamiento: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de restitución de menor
        restitucion_de_menor: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de exclusión de hogar
        exclusion_de_hogar: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de alimento provisorio
        alimento_provisorio: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de derecho de comunicación
        derecho_de_comunicacion: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
        // Definición de botón antipánico
        boton_antipanico: {
            type: Boolean, // Tipo de dato Boolean
            required: true, // Campo requerido
            trim: true // Trim para que no se guarden espacios en blanco
        },
    },
    // Definición de la denuncia realizada por tercero
    denunciado_por_tercero: {
        type: Boolean, // Tipo de dato Boolean
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
    tercero_ID: {
        type: String, // Tipo de dato String
        trim: true, // Trim para que no se guarden espacios en blanco
        require: false // Campo no requerido
    },
    vinculo_con_la_victima_tercero: {
        type: String, // Tipo de dato String
        trim: true, // Trim para que no se guarden espacios en blanco
        require: false // Campo no requerido
    },
    observaciones: {
        type: String, // Tipo de dato String
        trim: true, // Trim para que no se guarden espacios en blanco
        required: true // Campo requerido
    },
    denunciada_cargada_por: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Trim para que no se guarden espacios en blanco
    },
},
    {
        timestamps: true // Timestamps para que guarde la fecha de creación y actualización
    }

)

const denuncia = mongoose.model('denuncia', denunciaSchema)
export default denuncia;