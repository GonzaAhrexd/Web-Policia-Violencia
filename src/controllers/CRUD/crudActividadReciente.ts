import actividadReciente from '../../models/actividadReciente'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config'

// Función para agregar una actividad reciente
export async function agregarActividadReciente(descripcion: String, modelo_modificado: String, id_del_modelo: Object, cookies: any) {
    const { token } = cookies
    if (!token) {
        return "No token provided"
    }
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
  
            // Se crea la actividad reciente
            var actividad = new actividadReciente({
                fecha: new Date(),
                modelo_modificado: modelo_modificado,
                id_del_modelo: id_del_modelo,
                descripcion: descripcion,
                usuario: user.id
            })
            // Se guarda la actividad reciente en la base de datos
            await actividad.save()
            // Se retorna la actividad reciente
            return actividad
        })
}