import reporteErrores from "../../models/reporteErrores";
import { agregarActividadReciente } from "./crudActividadReciente";
// POST: Crear reporte de errores
export const createReporteErrores = async (req, res) => {
    try {
        const { apartado, descripcion } = req.body

        const { _id } = req.user


        console.log(_id)

        const newReporteErrores = new reporteErrores({
            apartado: apartado,
            descripcion: descripcion,
            usuario: _id
        })
        // Guardar el nuevo objeto en la base de datos
        const reporteErroresSave = await newReporteErrores.save()
        // Agregar actividad reciente
        await agregarActividadReciente("Reportó un error", "Reporte de errores", reporteErroresSave._id, req.cookies)
        res.send('Reporte de errores creado con exito')

    } catch (error) {
        console.log(error)
    }
}