import axios from './axios'


// DENUNCIAS
// Crear denuncias
export const crearDenuncia = (denuncia: any) => {
    try {
        axios.post(`/crear-denuncia/`, denuncia)
    } catch (error) {
        console.log(error)
    }
}

// Listar denuncias del usuario actual
export const misDenuncias = async (values: any) => {
    try {
        const response = await axios.get(`/mis-denuncias/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.is_expediente_completo ? values.is_expediente_completo : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// Editar denuncias
export const editarDenuncia = async (denuncia: any) => {
    try {
        const response = await axios.put(`/editar-denuncias/${denuncia.denuncia_id}`, denuncia)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar denuncias

export const eliminarDenuncia = async (id: string) => {
    console.log(id)
    try{
        const response = await axios.delete(`/eliminar-denuncias/${id}`)
        return response.data
    } catch(error){
        console.log(error)
    }

}
// DENUNCIAS SIN VERIFICAR
export const crearDenunciaSinVerificar = (denuncia: any) => {
    try {
        axios.post(`/crear-denuncia-sin-verificar/`, denuncia)
    } catch (error) {
        console.log(error)
    }
}


export const mostrarDenunciasSinVerificar = async () => {
    try {
        const response = await axios.get(`/denuncias-sin-verificar/`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Rechazar denuncia
export const eliminarDenunciaSinVerificar = async (id:string) => {
    try{
        const response = await axios.delete(`/eliminar-denuncias-sin-verificar/${id}`)
        return response.data
    } catch(error){
        console.log(error)
    }

}

// Aprobar denuncia

export const aprobarDenuncia = async (id: string) => {
    try{
        const response = await axios.put(`/validar-denuncia/${id}`)
        return response.data
    } catch(error){
        console.log(error)
    }

}

// EXPOSICIÓN
// Crear exposición
export const crearExposicion = (denuncia: any) => {
    try {
        axios.post(`/crear-exposicion/`, denuncia)
    } catch (error) {
        console.log(error)
    }
}

// VÍCTIMA
// Agregar víctima
export const agregarVictima = async (victima: any) => {
    try {
        const response = await axios.post(`/crear-victima/`, victima)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// Editar víctima
export const editarVictima = async (victima: any) => {
    try {
        const response = await axios.put(`/editar-victima/${victima.victima_id}`, victima)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// Listar la Victima
export const getVictima = async (id: string) => {
    try {
        const response = await axios.get(`/victima/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// VICTIMARIO
// Agregar victimario
export const agregarVictimario = async (victimario: any) => {
    try {
        const response = await axios.post(`/crear-victimario/`, victimario)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// Listar victimario
export const getVictimario = async (id: string) => {
    try {
        const response = await axios.get(`/victimario/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Editar victimario
export const editarVictimario = async (victimario: any) => {
    try {
        const response = await axios.put(`/editar-victimario/${victimario.victimario_id}`, victimario)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
