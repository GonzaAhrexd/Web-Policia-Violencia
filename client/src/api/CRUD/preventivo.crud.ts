import axios from '../axios'

type ValoresBusqueda = {
    numero_nota: string
    id_preventivo: string
    desde: Date,
    hasta: Date,
    division: string
}

export const crearPreventivo = async (preventivo: any) => {
    try {
        axios.post(`/crear-preventivo/`, preventivo)
    } catch (error) {
        console.log(error)
    }
}

export const buscarPreventivo = async (valores: ValoresBusqueda) => {
    try {
        const response = await axios.get(`/buscar-preventivo/${valores.id_preventivo ? valores.id_preventivo : "no_ingresado"}/${valores.numero_nota ? valores.numero_nota : "no_ingresado"}/${valores.desde ? valores.desde : "no_ingresado"}/${valores.hasta ? valores.hasta : "no_ingresado"}/${valores.division ? valores.division : "no_ingresado"}`)
        
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editPreventivo = async (id: string, preventivo: any) => {
    try {
        const response = await axios.put(`/editar-preventivo/${id}`, preventivo)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deletePreventivo = async (id: string) => {
    try {
        const response = await axios.delete(`/eliminar-preventivo/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

