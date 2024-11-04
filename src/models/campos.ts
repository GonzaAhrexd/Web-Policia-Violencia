import mongoose from 'mongoose';

// Definición de la estructura de los campos
const camposSchema = new mongoose.Schema({
    // Definición del campo nombre
    nombre: {
        type: String,
        required: true
    },
    // Definición del campo valor
    value: {
        type: String,
        required: true
    },
    // Definición del campo tipo
    tipo: {
        type: String,
        required: true
    }
});

const Campos = mongoose.model('Campos', camposSchema);
export default Campos;

