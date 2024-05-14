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
        const response = await axios.get(`/mis-denuncias/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.is_expediente_completo ? values.is_expediente_completo : "no_ingresado"}`)
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

export const editarVictima = async (victima: any) => {
    try{
        const response = await axios.put(`/editar-victima/${victima.victima_id}`, victima)
        return response.data
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

export const editarVictimario = async (victimario: any) => {
    try{
        console.log(victimario)
        const response = await axios.put(`/editar-victimario/${victimario.victimario_id}`, victimario)
        return response.data
    }catch(error){
        console.log(error)
    }


}

export const editarDenuncia = async (denuncia: any) => {
    try{
        const response = await axios.put(`/editar-denuncias/${denuncia.denuncia_id}`, denuncia)
        return response.data
    }catch(error){
        console.log(error)
    }
}