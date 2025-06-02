import axios from '../axios'

export const crearRadiograma = async (radiograma: any) => {
    try {
        const response = await axios.post(`/radiograma/crear-radiograma`, radiograma)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getRadiogramaById = async (id: string) => {
    try {
        const response = await axios.get(`/radiograma/buscar-radiograma/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editRadiograma = async (id: string, radiograma: any) => {
    try {
        const response = await axios.put(`/radiograma/editar-radiograma/${id}`, radiograma)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
