import axios from '../axios'


export const crearPreventivo = async (preventivo: any) => {
    try {
        axios.post(`/crear-preventivo/`, preventivo)
    } catch (error) {
        console.log(error)
    }
}
