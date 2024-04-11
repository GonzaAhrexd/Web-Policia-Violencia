import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { serializeUser } from 'passport'

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type:  String,
        required: true,
        trim: true
    },
    apellido: {
        type:  String,
        required: true,
        trim: true
    },
    telefono: {
        type:  Number,
        length: 10,
        required: true,
        trim: true
    },
    pass: {
        type:  String,
        required: true,
        trim: true
          },
    admin: {
        type:  Boolean,
        default: false,
        required: true
    },
    nombre_de_usuario: {
        type:  String,
        required: true,
        trim: true
    },
    credencial: {
        type:  String,
        required: true,
        trim: true
    },
    unidad: {
        type:  String,
        required: true,
        trim: true
    },
    jerarquia: {
        type:  String,
        required: true,
        trim: true
    },
    plaza: {
        type:  String,
        required: true,
        trim: true
    },
    zona: {
        type:  String,
        required: true,
        trim: true
    },
    rol: {
        type:  String,
        required: false,
        trim: true,
        default: 'sin_definir'
    }
},
    {
        timestamps: true
})

UsuarioSchema.pre('save', async function(next){
    const user = this
    if(!user.isModified('pass')) return next

    try{
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(user.pass,salt)
        user.pass = hashed
        next()
    }
    catch(error){
        console.log(error)
        next()
    }
})

UsuarioSchema.methods.comparePass = async function(canditePass){
    return await bcrypt.compare(canditePass, this.pass)
    
}

const usuarios = mongoose.model('usuarios', UsuarioSchema)
export default usuarios;