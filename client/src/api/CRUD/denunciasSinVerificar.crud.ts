import axios from '../axios'

// DENUNCIAS SIN VERIFICAR
export const crearDenunciaSinVerificar = (denuncia: any) => {
    try {
        axios.post(`/crear-denuncia-sin-verificar/`, denuncia)
    } catch (error) {
        console.log(error)
    }
}

// Mostrar todas las denuncias pendietnes de validación
export const mostrarDenunciasSinVerificar = async () => {
    try {
        const response = await axios.get(`/denuncias-sin-verificar/`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Rechazar denuncia
export const eliminarDenunciaSinVerificar = async (id: string) => {
    try {
        const response = await axios.delete(`/eliminar-denuncias-sin-verificar/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

// Aprobar denuncia
export const aprobarDenuncia = async (id: string) => {
    try {
        const response = await axios.put(`/validar-denuncia/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

// Ver denuncias sin verificar del usuario actual
export const misDenunciasSinVerificar = async (values: any) => {
    try {
        const response = await axios.get(`/mis-denuncias-sin-verificar/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const buscarDenunciasSinVerificar = async (values: any) => {
    try {

        console.log(`/denuncias-sin-verificar/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id ? encodeURIComponent(values.id) : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.division ? values.division : "no_ingresado"}/${values.municipio ? values.municipio : "no_ingresado"}/${values.comisaria ? values.comisaria : "no_ingresado"}`)
        const response = await axios.get(`/denuncias-sin-verificar/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id ? encodeURIComponent(values.id) : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.division ? values.division : "no_ingresado"}/${values.municipio ? values.municipio : "no_ingresado"}/${values.comisaria ? values.comisaria : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
