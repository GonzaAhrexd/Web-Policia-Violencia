import usuarios from '../models/usuarios'
import { createAccessToken } from '../libs/jwt'
import bcrypt from 'bcrypt'
//Registro de usuarios
export const register = async (req, res) => {
    // Obtención de los datos del formulario de registro
    try {
        const { nombre, apellido, telefono, pass, nombre_de_usuario, credencial, unidad, jerarquia, plaza, zona, rol } = req.body
         //Validación en mongodb si ya existe el usuario
        let userExistente = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario }) 
        // Creación de un nuevo usuario como objeto
        if (req.body.nombre_de_usuario && !userExistente) {
            const newUser = new usuarios({
                nombre,
                apellido,
                telefono,
                pass,
                nombre_de_usuario,
                credencial,
                unidad,
                jerarquia,
                plaza,
                zona,
            })
            // Guardar el usuario en la base de datos
            const userSaved = await newUser.save()

            //Token 
            const token = await createAccessToken({ id: userSaved._id })
            res.cookie('token', token)
            //Envio al frontend de los datos del usuario registrado
            res.json({
                id: userSaved._id,
                username: userSaved.nombre_de_usuario,
                nombre: userSaved.nombre,
                apellido:  userSaved.apellido,
                telefono: userSaved.telefono,
                credencial: userSaved.credencial,
                unidad: userSaved.unidad,
                jerarquia: userSaved.jerarquia,
                plaza: userSaved.plaza,
                zona: userSaved.zona,
                rol: userSaved.rol,
                createdAt: userSaved.createdAt

            })
        } else {
            // Error si el usuario ya existe  o no se ingresaron datos
            throw new Error('Usuario ya existe o no se ingresaron datos.')
        }
        // Respuesta de que el usuario fue registrado
   
    } catch (error) {
        // Respuesta de error
        console.log(error)
        res.send('error')
    }
}

//Login de usuarios
export const login = async (req, res) => {
    // Obtención de los datos del formulario de registro
    const { nombre_de_usuario , pass } = req.body
    try {
        const usuarioEncontrado = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario })
        if(!usuarioEncontrado) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        const isPassMatched = await bcrypt.compare(pass, usuarioEncontrado.pass)

        if (!isPassMatched) return res.status(400).json({ message: 'Contraseña incorrecta' })

       
            // Guardar el usuario en la base de datos


            //Token 
            const token = await createAccessToken({ id: usuarioEncontrado._id })
            res.cookie('token', token)
            //Envio al frontend de los datos del usuario registrado
            res.json({
                id: usuarioEncontrado._id,
                username: usuarioEncontrado.nombre_de_usuario,
                nombre: usuarioEncontrado.nombre,
                apellido:  usuarioEncontrado.apellido,
                telefono: usuarioEncontrado.telefono,
                credencial: usuarioEncontrado.credencial,
                unidad: usuarioEncontrado.unidad,
                jerarquia: usuarioEncontrado.jerarquia,
                plaza: usuarioEncontrado.plaza,
                zona: usuarioEncontrado.zona,
                rol: usuarioEncontrado.rol,
                createdAt: usuarioEncontrado.createdAt

            })
    } catch (error) {
        // Respuesta de error
        console.log(error)
        res.send('error')
    }
}

//Logout 
export const logout = async (req, res) => {
    res.cookie('token', "",{
    expires: new  Date(0)
    })
    return res.sendStatus(200)
}

//Perfil  de usuario
export const profile = async (req, res) => {
    res.send('profile')
}