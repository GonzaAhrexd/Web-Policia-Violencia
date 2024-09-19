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
                required: false,
                trim: true
            },
            subdivisiones: [
                {
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