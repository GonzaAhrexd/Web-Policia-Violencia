import axios from './axios'

export const crearDenuncia = (denuncia: any) => axios.post(`/crear-denuncia/`, denuncia)
export const agregarVictima = async (victima: any) => { 
    console.log("Llegó")
    try{
        await axios.post(`/crear-victima/`, victima)
    }catch(error){
        console.log(error)
    }
} 
export const agregarVictimario = (victimario: any) => axios.post(`/crear-victimario/`, victimario)
