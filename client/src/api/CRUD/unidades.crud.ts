import axios from '../axios'

export const agregarUnidad = async (unidad: any) => {
    try {
        const response = await axios.post('/agregar-unidad', unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const obtenerUnidades = async () => {
    try {
        const response = await axios.get('/mostrar-unidades')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editarUnidad = async (unidad: any) => {
    try {
        const response = await axios.put(`/editar-unidad/${unidad.id}`, unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
