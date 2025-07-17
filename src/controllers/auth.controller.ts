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
import axios from 'axios'
// Variables de entorno
const produccion = process.env.produccion
const urlPoliciaDigital = process.env.URL_POLICIA_DIGITAL



export const loginRepoV1 = async (req, res) => {

    try {
        // Obtener los datos

        const { nombre_de_usuario: usuario , pass: clave } = req.body

        // Consulta a la API de Policía Digital para verificar el usuario
        const loginDevuelve = await axios.post(`${urlPoliciaDigital}/api_registroUsuario/usuario/find/loginSistemas`, { usuario, clave })

        // Se busca el usuario en la base de datos local
        const usuarioEncontrado = await usuarios.findOne({ usuario_repo: loginDevuelve.data.data })

        // Si no se encuentra el usuario o la contraseña es incorrecta, se devuelve un error
        if (!usuarioEncontrado) {
            return res.status(400).json({ message: 'Usuario no encontrado o contraseña incorrecta' })
        }

        // Se genera un token de acceso para el usuario
        const token = await createAccessToken({ _id: usuarioEncontrado._id })

        // Configuración del tiempo de vida del token
        let configs: {} = {
            maxAge: 24 * 60 * 60 * 1000
        }
       
        // Se agrega el token a las cookies de la respuesta
        res.cookie('token', token, {
            configs
        });

        //Envio al frontend de los datos del usuario registrado
        await agregarActividadReciente("Inicio de sesión", "Inicios", usuarioEncontrado._id, usuarioEncontrado.nombre_de_usuario)

        res.json(usuarioEncontrado)

    } catch (error) {
        // Respuesta de error
        console.log(error)
        res.send('error')
    }


}

export const altaUsuario = async (req, res) => {
    try {
        // Se extraen los datos del cuerpo de la solicitud
        const { dni, rol, jerarquia, zona, unidad } = req.body

        // Validación de los datos recibidos
        const guardar = await axios.post(`${urlPoliciaDigital}/api_registroUsuario/usuario/find/usuarioSistema/${dni}`)

        // Si no se encuentra el usuario, se devuelve un mensaje de error
        if (guardar.data.msg === "sin contenido") {
            return res.json({ mensaje: "No se encontró el usuario" })

        }

        // Se crea un nuevo usuario con los datos obtenidos
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

        // Se verifica si el usuario ya existe en la base de datos
        const usuarioExistente = await usuarios.findOne({ nombre_de_usuario: guardar.data.data.usuario })
        if (usuarioExistente) {
            return res.json({ mensaje: "Ya está dado de alta" })
        }
        // Se guarda el nuevo usuario en la base de datos
        const usuarioGuardado = await crearUsuarioConDatos.save()

        return res.json({ mensaje: "Usuario creado con éxito" })

    } catch (error) {
        console.log(error)
    }
}


//Logout 
export const logout = async (req, res) => {
    let configs: {} = {
        expires: new Date(0)
    }
    res.cookie('token', "", {
        configs
    })
    return res.sendStatus(200)
}


export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'No hay token' })
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" })

        const userFound = await usuarios.findById(user._id)
        if (!userFound) return res.status(401).json({ message: "No autorizado" })

        return res.json(userFound)
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


// Obtener imagen de usuario
export const getUserImage = (req, res) => {
    const userId = req.params.userId;
    const imagePath = path.resolve(__dirname, `../imagesFromDB/perfiles/${userId}.png`);
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Imagen no encontrada');
        }
    });
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
            let dirFile = path.join(__dirname, `../imagesFromDB/perfiles/${req.user._id}.${formato}`) //crear la  ruta para guardar la imagen

            fs.copyFile(file.filepath, dirFile, function (err) {
                if (err) throw err;
            }); //Copiar archivo desde la ruta original al servidor

            let nuevo = req.user._id + '.' + formato //Guardar nombre de la imagen para pasarlo a la base de datos
            await usuarios.findByIdAndUpdate(req.user._id, { //Guardar producto en mongodb
                imagen: nuevo,
            });
        }
        catch (error: any) {
            console.log("ERROR", error)
        }

    })
}