import axios from '../axios'


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

// Listar denuncias del usuario actual
export const buscarDenuncias = async (values: any, manual: boolean) => {
    try {
        const response = await axios.get(`/buscar-denuncias/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_denuncia ? values.id_denuncia : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.is_expediente_completo ? values.is_expediente_completo : "no_ingresado"}/${values.division ? values.division : "no_ingresado"}/${values.municipio ? values.municipio : "no_ingresado"}/${values.comisaria ? values.comisaria : "no_ingresado"}/${manual}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// Buscar denuncias por id
export const buscarDenunciasPorId = async (id: string) => {
    try {
        const response = await axios.get(`/buscar-denuncias-id/${id}`)
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
    try {
        const response = await axios.delete(`/eliminar-denuncias/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Cantidad de denuncias
export const cantidadDenuncias = async (values: any) => {
    try {
        const response = await axios.get(`/cantidad-denuncias/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
