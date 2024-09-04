import mongoose from 'mongoose';

const camposSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }

});

const Campos = mongoose.model('Campos', camposSchema);
export default Campos;

