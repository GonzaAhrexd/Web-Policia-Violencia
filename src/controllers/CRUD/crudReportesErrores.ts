import reporteErrores from "../../models/reporteErrores";

export const createReporteErrores = async (req, res) => {
    try {
        const { apartado, descripcion } = req.body

        const { id } = req.user
        const newReporteErrores = new reporteErrores({
            apartado: apartado,
            descripcion: descripcion,
            usuario: id
        })

        const reporteErroresSave = await newReporteErrores.save()
        res.send('Reporte de errores creado con exito')

    } catch (error) {
        console.log(error)
    }
}