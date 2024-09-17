import mongoose from 'mongoose'

const unidadesCamposSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    value: {
        type: String,
        required: true,
        trim: true
    },
    subdivisiones: [
        {   
            _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
            nombre: {
                type: String,
                required: true,
                trim: true,
            },
            value: {
                type: String,
                required: true,
                trim: true
            },
            cuadriculas: [
                {
                    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
                    nombre: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    value: {
                        type: String,
                        required: false,
                        trim: true
                    },
                }

            ],
            prefijo: {
                type: String,
                required: true,
                trim: true
            },
            subdivisiones: [
                {
                    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
                    nombre: {
                        type: String,
                        required: false,
                        trim: true,
                    },
                    value: {
                        type: String,
                        required: false,
                        trim: true
                    },
                    prefijo: {
                        type: String,
                        required: false,
                        trim: true
                    },
                    cuadriculas: [
                        {
                            _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
                            nombre: {
                                type: String,
                                required: false,
                                trim: true,
                            },
                            value: {
                                type: String,
                                required: false,
                                trim: true
                            },
                        }

                    ]
                }
            ]
        }
    ]
})

const unidades = mongoose.model('unidades', unidadesCamposSchema)

export default unidades;