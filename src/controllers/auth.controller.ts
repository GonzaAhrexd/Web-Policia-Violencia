import usuarios from '../models/usuarios'
import { createAccessToken } from '../libs/jwt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import path from 'path'
const formidable = require('formidable'); //Módulo para formularios
const fs = require('fs') //Módulo para guardar imagenes


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
                plaza: plaza ? plaza : 'Sin definir',
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
                apellido: userSaved.apellido,
                telefono: userSaved.telefono,
                credencial: userSaved.credencial,
                unidad: userSaved.unidad,
                jerarquia: userSaved.jerarquia,
                plaza: userSaved.plaza,
                zona: userSaved.zona,
                rol: userSaved.rol,
                imagen: userSaved.imagen ? userSaved.imagen : 'sin_definir',
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
        res.send('Usuario ya existe o no se ingresaron datos')
    }
}

//Login de usuarios
export const login = async (req, res) => {
    // Obtención de los datos del formulario de registro
    const { nombre_de_usuario, pass } = req.body
    try {
        const usuarioEncontrado = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario })
        if (!usuarioEncontrado) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        const isPassMatched = await bcrypt.compare(pass, usuarioEncontrado.pass)

        if (!isPassMatched) return res.status(400).json({ message: 'Contraseña incorrecta' })


        // Guardar el usuario en la base de datos


        //Token 
        const token = await createAccessToken({ id: usuarioEncontrado._id })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
          });
            //Envio al frontend de los datos del usuario registrado
        res.json({
            id: usuarioEncontrado._id,
            username: usuarioEncontrado.nombre_de_usuario,
            nombre: usuarioEncontrado.nombre,
            apellido: usuarioEncontrado.apellido,
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
//Logout 
export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

//Perfil  de usuario
export const profile = async (req, res) => {
    const usuarioEncontrado = await usuarios.findById(req.user.id)
    if (!usuarioEncontrado) return res.status(400).json(
        { message: "User not found" }
    )
    return res.json({
        id: usuarioEncontrado._id,
        username: usuarioEncontrado.nombre_de_usuario,
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        telefono: usuarioEncontrado.telefono,
        credencial: usuarioEncontrado.credencial,
        unidad: usuarioEncontrado.unidad,
        jerarquia: usuarioEncontrado.jerarquia,
        plaza: usuarioEncontrado.plaza,
        zona: usuarioEncontrado.zona,
        rol: usuarioEncontrado.rol,
        createdAt: usuarioEncontrado.createdAt

    })


}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'No hay token' })
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" })

        const userFound = await usuarios.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "No autorizado" })

        return res.json({
            id: userFound._id,
            username: userFound.nombre_de_usuario,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            telefono: userFound.telefono,
            credencial: userFound.credencial,
            unidad: userFound.unidad,
            jerarquia: userFound.jerarquia,
            plaza: userFound.plaza,
            zona: userFound.zona,
            rol: userFound.rol,
            imagen: userFound.imagen ? userFound.imagen : 'sin_definir',
            createdAt: userFound.createdAt
        })
    })
}

export const editUser = async (req, res) => {

    const { nombre, apellido, telefono, nombre_de_usuario, credencial, unidad, jerarquia, plaza, zona } = req.body
    //Validación en mongodb si ya existe el usuario

    try {
        const usuarioEncontrado = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario })
        if (usuarioEncontrado && usuarioEncontrado._id != req.params.id) {
            return res.status(400).json({ message: 'Usuario ya existe' })
        }
        await usuarios.findByIdAndUpdate(req.params.id, {  //Editar campos del perfil
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            nombre_de_usuario: nombre_de_usuario,
            credencial: credencial,
            unidad: unidad,
            jerarquia: jerarquia,
            plaza: plaza,
            zona: zona
        })

        res.json({
            mensaje: "Done!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error al actualizar el usuario' });
    }
}

// Cargar imagen
export const editUserImg = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
        //Subir imagenes con el campo de files
        try {
            console.log("LLEGÓ")
            if (err) {
                console.error("Error parsing the form: ", err);
                return res.status(500).send({ error: "Error procesando el formulario: " + err.message });
            }

            const file = files.image[0]


            if (file.originalFilename === "") { //Validación si no se sube archivos
                throw new Error("Agrega una imagen para continuar")
            }
            // if (!(file.mimetype === "image/jpeg" || file.mimetype === "image/png")) { //Formatos válidos
            //     throw new Error("Formato no válido, prueba con .png o .jpg")
            // }

            if (file.size > 50 * 1024 * 1024) { //Tamaño máximo de 50mb
                throw new Error("Ingrese un archivo de menos de 50mb")
            }

            let separado = file?.mimetype?.split("/");
            let formato = separado[1];
            let dirFile = path.join(__dirname, `../imagesFromDB/perfiles/${req.user.id}.${formato}`) //crear la  ruta para guardar la imagen

            fs.copyFile(file.filepath, dirFile, function (err) {
                if (err) throw err;
            }); //Copiar archivo desde la ruta original al servidor

            let nuevo = req.user.id + '.' + formato //Guardar nombre de la imagen para pasarlo a la base de datos
            await usuarios.findByIdAndUpdate(req.user.id, { //Guardar producto en mongodb
                imagen: nuevo,
            });
        }
        catch (error: any) {
            console.log("ERROR", error)
        }
       
    })
}