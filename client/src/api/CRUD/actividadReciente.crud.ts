import axios from '../axios'

// Listar actividades recientes
export const listarActividadesRecientes = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-actividad-reciente/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.seccion ? values.seccion : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}