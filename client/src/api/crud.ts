import axios from './axios'

export const crearDenuncia = (denuncia: any) => {

    try{
        axios.post(`/crear-denuncia/`, denuncia)
        }catch(error){
        console.log(error)
    }
} 

export const misDenuncias = async (values: any) => {
    try{
        const response = await axios.get(`/mis-denuncias/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        console.log(response.data)
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

export const getVictima = async (id: string) => {
    try{
        const response = await axios.get(`/victima/${id}`)
        
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const getVictimario = async (id: string) => {
    try{
        const response = await axios.get(`/victimario/${id}`)
        return response.data
    }catch(error){
        console.log(error)
    }
}
