import axios from './axios'

export const crearDenuncia = (denuncia: any) => {

    try{
        axios.post(`/crear-denuncia/`, denuncia)
        }catch(error){
        console.log(error)
    }
} 

export const misDenuncias = async () => {
    try{
        const response = await axios.get(`/mis-denuncias/`)
       // console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const agregarVictima = async (victima: any) => { 
    
    try{
        const response = await axios.post(`/crear-victima/`, victima)
        const id = response.data.id 
        return id
    }catch(error){
        console.log(error)
    }
} 
export const agregarVictimario = async (victimario: any) => {
    
    try{
        const response = await axios.post(`/crear-victimario/`, victimario)
        const id = response.data.id
        return id
    }catch(error){
        console.log(error)
    }
}