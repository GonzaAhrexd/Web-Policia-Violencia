import mongoose from 'mongoose'

const unidadesCamposSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    },
    subdivisiones: [
        {
            nombre: {
                type: String,
                required: true,
                trim: true,
                uppercase: true
            },
            value: {
                type: String,
                required: true,
                trim: true
            },
            cuadricula: {
                type: String,
                required: true,
                trim: true
            },
            prefijo: {
                type: String,
                required: true,
                trim: true
            },
            subdivisiones: [
                {
                    nombre: {
                        type: String,
                        required: false,
                        trim: true,
                        uppercase: true
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
                            nombre: {
                                type: String,
                                required: false,
                                trim: true,
                                uppercase: true
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