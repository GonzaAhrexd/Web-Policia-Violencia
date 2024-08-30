import actividadReciente from '../../models/actividadReciente'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config'
import usuario from '../../models/usuarios'

// Función para agregar una actividad reciente
export async function agregarActividadReciente(descripcion: String, modelo_modificado: String, id_del_modelo: Object, cookies: any) {
    const { token } = cookies

    if(cookies && !token){
        const usuarioEncontrado = await usuario.findOne({nombre_de_usuario: cookies})
        const actividad = new actividadReciente({
            fecha: new Date(),
            modelo_modificado: modelo_modificado,
            id_del_modelo: id_del_modelo,
            descripcion: descripcion,
            usuario: usuarioEncontrado?.nombre_de_usuario,
            id_usuario: usuarioEncontrado?._id
        })
        // Se guarda la actividad reciente en la base de datos
        await actividad.save()
        // Se retorna la actividad reciente
        return actividad
    }
    if (!token) {
        return "No token provided"
    }
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        const usuarioEncontrado = await usuario.findById(user.id)
        // Se crea la actividad reciente
        var actividad = new actividadReciente({
            fecha: new Date(),
            modelo_modificado: modelo_modificado,
            id_del_modelo: id_del_modelo,
            descripcion: descripcion,
            usuario: usuarioEncontrado?.nombre_de_usuario,
            id_usuario: usuarioEncontrado?._id
        })
        // Se guarda la actividad reciente en la base de datos
        await actividad.save()
        // Se retorna la actividad reciente
        return actividad
    })
}

export const buscarActividadReciente = async (req, res) => {
    try {

        const { desde, hasta, seccion, usuario } = req.params

        // Se busca la actividad reciente
        interface Query {
            fecha?: {
                $gte?: string;
                $lte?: string;
            };
            modelo_modificado?: string;
            usuario?: string;
        }

        const query: Query = {};

        // Si se ingresó un valor, se agrega a la consulta
        if (desde !== 'no_ingresado') {
            query.fecha = { $gte: desde };
        }

        // Si se ingresó un valor, se agrega a la consulta
        if (hasta !== 'no_ingresado') {
            query.fecha = query.fecha || {};
            query.fecha.$lte = hasta;
        }

        // Si se ingresó un valor, se agrega a la consulta
        if (seccion !== 'no_ingresado') {
            query.modelo_modificado = seccion;
        }

        // Si se ingresó un valor, se agrega a la consulta
        if (usuario !== "no_ingresado") {
            query.usuario = usuario;
        }

        const actividad = await actividadReciente.find(query)
        // Se retorna la actividad reciente
        res.json(actividad)
    } catch (error) {
        console.log(error)
    }
}

export const buscasActividadPorIdUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const actividad = await actividadReciente.find({ id_usuario: id })
        // Se retorna la actividad reciente
        res.json(actividad)
    } catch (error) {
        console.log(error)
    }
}