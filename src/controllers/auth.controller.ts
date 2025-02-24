// Modelos
import usuarios from '../models/usuarios'
// Token y autenticación
import { createAccessToken } from '../libs/jwt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
// Path
import path from 'path'
// Formidable
const formidable = require('formidable'); //Módulo para formularios
const fs = require('fs') //Módulo para guardar imagenes
// Otras dependencias
import { agregarActividadReciente } from './CRUD/crudActividadReciente'
import { FieldAlreadyExistsError } from 'pdf-lib'
import axios from 'axios'
// Variables de entorno
const produccion = process.env.produccion
const urlPoliciaDigital = process.env.URL_POLICIA_DIGITAL

//Registro de usuarios
export const register = async (req, res) => {
    // Obtención de los datos del formulario de registro
    try {
        const { nombre, apellido, telefono, pass, nombre_de_usuario, credencial, unidad, jerarquia, plaza, zona } = req.body
        //Validación en mongodb si ya existe el usuario
        console.log(nombre_de_usuario)
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
                imagen: 'sin_definir',
                plaza: plaza ? plaza : 'Sin definir',
                zona,
            })
            // Guardar el usuario en la base de datos
            const userSaved = await newUser.save()

            //Token 
            const token = await createAccessToken({ id: userSaved._id })
            res.cookie('token', token)

            await agregarActividadReciente("Registro de usuario", "Registros", userSaved._id, nombre_de_usuario)

            //Envio al frontend de los datos del usuario registrado
            res.json({
                id: userSaved._id,
                username: userSaved.nombre_de_usuario,
                nombre: userSaved.nombre,
                apellido: userSaved.apellido,
                telefono: userSaved.telefono,
                unidad: userSaved.unidad,
                jerarquia: userSaved.jerarquia,
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

export const loginRepoV1 = async (req, res) => {
    try {


        try {
            // const { usuario,  } = req.body

            const usuario = req.body.nombre_de_usuario
            const clave = req.body.pass


            const loginDevuelve = await axios.post(`${urlPoliciaDigital}/api_registroUsuario/usuario/find/loginSistemas`, { usuario, clave })


            // const usuarioExiste = 
            const usuarioEncontrado = await usuarios.findOne({ usuario_repo: loginDevuelve.data.data })

            if (!usuarioEncontrado) {
                return res.status(400).json({ message: 'Usuario no encontrado o contraseña incorrecta' })
            }

            // Guardar el usuario en la base de datos
            //Token 
            const token = await createAccessToken({ id: usuarioEncontrado._id })

            let configs: {} = {
                maxAge: 24 * 60 * 60 * 1000
            }
            /* Esto debe estar activado en producción */
            if (produccion == "true") {
                configs = {
                    domain: '.gonzaloebel.tech',
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: 'none', // Permite el envío entre sitios

                }
            }

            res.cookie('token', token, {
                configs
            });

            //Envio al frontend de los datos del usuario registrado
            await agregarActividadReciente("Inicio de sesión", "Inicios", usuarioEncontrado._id, usuarioEncontrado.nombre_de_usuario)



            res.json({
                id: usuarioEncontrado._id,
                username: usuarioEncontrado.nombre_de_usuario,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                telefono: usuarioEncontrado.telefono,
                unidad: usuarioEncontrado.unidad,
                jerarquia: usuarioEncontrado.jerarquia,
                zona: usuarioEncontrado.zona,
                rol: usuarioEncontrado.rol,
                createdAt: usuarioEncontrado.createdAt

            })


        } catch (error) {
            // Respuesta de error
            console.log(error)
            res.send('error')
        }



    } catch (error) {
        console.log(error)
        res.send('error')
    }
}

export const registroDNIV1 = async (req, res) => {
    try {
        const { dni } = req.body

        const guardar = await axios.post(`${urlPoliciaDigital}/api_registroUsuario/usuario/find/usuarioSistema/${dni}`)

        // console.log(guardar.data)

        console.log("ID" + guardar.data.data.id)
        console.log(guardar.data.data)
        return guardar.data.data

        // const usuarioGuardado = await usuarios.findOneAndUpdate({ "nombre_de_usuario": "gonzaahre" }, {  //Editar campos del perfil
        //     usuario_repo: guardar.data.data.id,
        // })

        // console.log(usuarioGuardado)


        // return usuarioGuardado;

        // return guardar.data

    } catch (error) {
        console.log(error)
        res.send('error')
    }
}
export const altaUsuario = async (req, res) => {
    try {
        const { dni, rol, jerarquia, zona, unidad } = req.body

        const guardar = await axios.post(`${urlPoliciaDigital}/api_registroUsuario/usuario/find/usuarioSistema/${dni}`)

        if (guardar.data.msg === "sin contenido") {
            return res.json({ mensaje: "No se encontró el usuario" })

        }

        const crearUsuarioConDatos = await new usuarios({
            nombre: jerarquia != "Civil" ? guardar.data.data.persona.nombre : guardar.data.data.civil.nombre,
            apellido: jerarquia != "Civil" ? guardar.data.data.persona.apellido : guardar.data.data.civil.apellido,
            nombre_de_usuario: guardar.data.data.usuario,
            dni: jerarquia != "Civil" ? guardar.data.data.persona.norDni : guardar.data.data.civil.norDni,
            rol: rol,
            jerarquia: jerarquia,
            imagen: 'sin_definir',
            zona: zona,
            unidad: unidad,
            pass: "123456",
            usuario_repo: guardar.data.data.id
        })

        const usuarioExistente = await usuarios.findOne({ nombre_de_usuario: guardar.data.data.usuario })
        if (usuarioExistente) {
            return res.json({ mensaje: "Ya está dado de alta" })
        }

        const usuarioGuardado = await crearUsuarioConDatos.save()

        return res.json({ mensaje: "Usuario creado con éxito" })

    } catch (error) {
        console.log(error)
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

        let configs: {} = {
            maxAge: 24 * 60 * 60 * 1000
        }
        /* Esto debe estar activado en producción */
        if (produccion == "true") {
            configs = {
                domain: '.gonzaloebel.tech',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: 'none', // Permite el envío entre sitios

            }
        }

        res.cookie('token', token, {
            configs
        });

        //Envio al frontend de los datos del usuario registrado
        await agregarActividadReciente("Inicio de sesión", "Inicios", usuarioEncontrado._id, usuarioEncontrado.nombre_de_usuario)

        const { usuario_repo } = usuarioEncontrado

        const loginRepo = await axios.post(`https://policiadigital.chaco.gob.ar:9090/api_registroUsuario/usuario/find/loginSistemas`,)


        res.json({
            id: usuarioEncontrado._id,
            username: usuarioEncontrado.nombre_de_usuario,
            nombre: usuarioEncontrado.nombre,
            apellido: usuarioEncontrado.apellido,
            telefono: usuarioEncontrado.telefono,
            unidad: usuarioEncontrado.unidad,
            jerarquia: usuarioEncontrado.jerarquia,

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
    let configs: {} = {
        expires: new Date(0)
    }
    if (produccion == "true") {
        configs = {
            domain: '.gonzaloebel.tech',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'none', // Permite el envío entre sitios
            expires: new Date(0)
        }
    }
    res.cookie('token', "", {
        configs
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
        unidad: usuarioEncontrado.unidad,
        jerarquia: usuarioEncontrado.jerarquia,
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
            unidad: userFound.unidad,
            jerarquia: userFound.jerarquia,
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