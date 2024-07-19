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

// Listar denuncias del usuario actual
export const buscarDenuncias = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-denuncias/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_denuncia ? values.id_denuncia : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.is_expediente_completo ? values.is_expediente_completo : "no_ingresado"}/${values.division ? values.division : "no_ingresado"}/${values.municipio ? values.municipio : "no_ingresado"}/${values.comisaria ? values.comisaria : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

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
// EXPOSICIÓN
// Crear exposición
export const crearExposicion = (denuncia: any) => {
    try {
        axios.post(`/crear-exposicion/`, denuncia)
    } catch (error) {
        console.log(error)
    }
}
export const buscarExposicion = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-exposicion/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_exposicion ? values.id_exposicion : "no_ingresado"}/${values.nombre_victima ? values.nombre_victima : "no_ingresado"}/${values.apellido_victima ? values.apellido_victima : "no_ingresado"}/${values.dni_victima ? values.dni_victima : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const eliminarExposicion = async (id: string) => {
    try {
        const response = await axios.delete(`/eliminar-exposicion/${id}`)
        return response.data
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

// Buscar víctima
export const buscarVictima = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-victima/${values.id_victima ? values.id_victima : "no_ingresado"}/${values.nombre_victima ? values.nombre_victima : "no_ingresado"}/${values.apellido_victima ? values.apellido_victima : "no_ingresado"}/${values.dni_victima ? values.dni_victima : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
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
        const response = await axios.put(`/editar-victimario/${victimario.victimario_ID}`, victimario)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// Buscar victimario
export const buscarVictimario = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-victimario/${values.id_victimario ? values.id_victimario : "no_ingresado"}/${values.nombre_victimario ? values.nombre_victimario : "no_ingresado"}/${values.apellido_victimario ? values.apellido_victimario : "no_ingresado"}/${values.dni_victimario ? values.dni_victimario : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// TERCERO
// Obtener tercero
export const getTercero = async (id: string) => {
    try {
        const response = await axios.get(`/tercero/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Crear tercero
export const crearTercero = async (tercero: any) => {
    try {
        const response = await axios.post(`/crear-tercero/`, tercero)
        const id = response.data.id
        return id
    } catch (error) {
        console.log(error)
    }
}

// Editar tercero
export const editarTercero = async (tercero: any) => {
    try {
        const response = await axios.put(`/editar-tercero/${tercero.tercero_id}`, tercero)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar tercero
export const eliminarTercero = async (id: string) => {
    try {
        const response = await axios.delete(`/eliminar-tercero/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Buscar tercero
export const buscarTercero = async (values: any) => {
    try {
        const response = await axios.get(`/buscar-tercero/${values.id_tercero ? values.id_tercero : "no_ingresado"}/${values.nombre_tercero ? values.nombre_tercero : "no_ingresado"}/${values.apellido_tercero ? values.apellido_tercero : "no_ingresado"}/${values.dni_tercero ? values.dni_tercero : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Reportar errores
export const reportarErrores = async (values: any) => {
    try {
        const response = await axios.post(`/reporte-errores/`, values)
        return response.data
    } catch (error) {
        console.log(error)
    }
}