import axios from '../axios'

export const agregarUnidad = async (unidad: any) => {
    try {
        const response = await axios.post('/agregar-unidad', unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const obtenerUnidades = async () => {
    try {
        const response = await axios.get('/mostrar-unidades')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editarUnidad = async (unidad: any) => {
    try {
        const response = await axios.put(`/editar-unidad/${unidad.id}`, unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const agregarMunicipio = async (unidad: any) => {
    try {
        const response = await axios.put(`/agregar-municipio/${unidad.id}`, unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editarMunicipio = async (municipio: any) => {
    try {
        const response = await axios.put(`/editar-municipio/`, municipio)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const agregarComisaria = async (comisaria: any) => {
    try {
        const response = await axios.put(`/agregar-comisaria/`, comisaria)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const editarComisaria = async (comisaria: any) => {
    try {
        const response = await axios.put(`/editar-comisaria/`, comisaria)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const eliminarCuadriculaDesdeComisaria = async (cuadricula: string, comisaria: string, municipio: string ) => {
    try {
        const response = await axios.put(`/eliminar-cuadricula/${cuadricula}/${comisaria}/${municipio}`,)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const agregarCuadricula = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/agregar-cuadricula/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editarCuadriculaDesdeComisaria = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/editar-cuadricula-desde-comisaria/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const eliminarMunicipio = async (nombre: any) => {
    try {
        const response = await axios.put(`/eliminar-municipio/${nombre}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const eliminarComisaria = async (nombre: any, municipio: any) => {
    try {
        const response = await axios.put(`/eliminar-comisaria/${nombre}/${municipio}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
