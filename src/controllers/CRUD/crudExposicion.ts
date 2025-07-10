import exposicion from '../../models/exposicion'
import { agregarActividadReciente } from './crudActividadReciente'

// POST: Crear exposición
export const createExposicion = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, numero_de_expediente, fecha, hora, division, direccion, telefono, SabeLeerYEscribir, observaciones, AgregarQuitarOEnmendarAlgo, nombre_completo_secretario, jerarquia_secretario, plaza_secretario, nombre_completo_instructor, jerarquia_instructor, agrega } = req.body
        // Crear un nuevo objeto con los datos a insertar
        const newExposicion = new exposicion({
            numero_de_expediente: numero_de_expediente,
            fecha: fecha,
            hora: hora,
            division: division,
            direccion: direccion,
            telefono: telefono,
            nombre_victima: nombre_victima,
            apellido_victima: apellido_victima,
            edad_victima: edad_victima,
            DNI_victima: dni_victima,
            estado_civil_victima: estado_civil_victima,
            ocupacion_victima: ocupacion_victima,
            nacionalidad_victima: nacionalidad_victima,
            direccion_victima: direccion_victima,
            telefono_victima: telefono_victima,
            sabe_leer_y_escribir_victima: SabeLeerYEscribir == "Sí" ? true : false,
            observaciones: observaciones,
            preguntas: {
                desea_agregar_quitar_o_enmendar: AgregarQuitarOEnmendarAlgo == "Sí" ? true : false
            },
            agrega: agrega ? agrega : 'No se agregó nada',
            secretario: {
                nombre_completo_secretario: nombre_completo_secretario,
                jerarquia_secretario: jerarquia_secretario,
                plaza_secretario: plaza_secretario
            },
            instructor: {
                nombre_completo_instructor: nombre_completo_instructor,
                jerarquia_instructor: jerarquia_instructor,
            }
        })

        // Guardar el nuevo objeto en la base de datos
        const expoSave = await newExposicion.save()

        // Agregar actividad reciente
        await agregarActividadReciente("Carga de exposición", "Exposición", expoSave._id, req.cookies)

        // Respuesta del servidor
        res.send('Exposición creada con exito')

    } catch (error) {
        console.log(error)
    }
}

// GET: Buscar exposición
export const buscarExposicion = async (req, res) => {
    interface Query {
        createdAt?: {
            $gte?: string;
            $lte?: string;
        };
        nombre_victima?: RegExp;
        apellido_victima?: RegExp;
        DNI_victima?: string;
        _id?: string;
    }
    // Obtener los parámetros de la URL
    const { desde, hasta, id_exposicion, nombre_victima, apellido_victima, dni_victima } = req.params;
    // Crear el objeto de consulta
    const query: Query = {};

    // Si se ingresó un valor, se agrega a la consulta
    if (desde !== 'no_ingresado') {
        query.createdAt = { $gte: desde };
    }

    if (hasta !== 'no_ingresado') {
        query.createdAt = query.createdAt || {};
        query.createdAt.$lte = hasta;
    }

    if (id_exposicion !== 'no_ingresado') {
        query._id = id_exposicion;
    }

    function normalizarLetras(caracter: string) {
        if (caracter === 's' || caracter === 'z') return '[sz]';
        if (caracter === 'i' || caracter === 'y') return '[iy]';
        if (caracter === 'k' || caracter === 'q') return '[kq]';
        if (caracter === 'v' || caracter === 'b') return '[vb]';
        if (caracter === 'g' || caracter === 'j') return '[gj]';
        if (caracter === 'á' || caracter === 'a') return '[áa]';
        if (caracter === 'é' || caracter === 'e') return '[ée]';
        if (caracter === 'í' || caracter === 'i') return '[íi]';
        if (caracter === 'ó' || caracter === 'o') return '[óo]';
        if (caracter === 'ú' || caracter === 'u') return '[úu]';
        if (caracter === 'ü') return '[üu]';
        return caracter;
    }

    function construirExpresionRegular(cadena) {
        if (cadena !== 'no_ingresado') {
            // Convertir la cadena a minúsculas
            const cadena_lower = cadena.toLowerCase();
            // Separar los nombres/apellidos y eliminar espacios en blanco adicionales
            const partes = cadena_lower.trim().split(/\s+/);
            // Crear la expresión regular
            const regexPattern = partes
                .map(part => part.split('').map(normalizarLetras).join(''))
                .join('.*');
            // Crear expresión regular para buscar todas las combinaciones de nombres/apellidos
            const regexCombinaciones = partes
                .map(part => `(?=.*${part.split('').map(normalizarLetras).join('')})`)
                .join('');
            // Devolver la expresión regular
            return new RegExp(regexCombinaciones, 'i');
        } else {
            // Si no se ha ingresado el nombre/apellido, devolver null
            return null;
        }
    }
    if (nombre_victima !== 'no_ingresado') {
        // @ts-ignore
        query.nombre_victima = new RegExp(construirExpresionRegular(nombre_victima));
    }
    if (apellido_victima !== 'no_ingresado') {
        // @ts-ignore
        query.apellido_victima = new RegExp(construirExpresionRegular(apellido_victima));
    }
    if (dni_victima !== 'no_ingresado') {
        //Haz que se eliminen . si que se ingresan en el dni
        query.DNI_victima = dni_victima.replace(/\./g, '');
    }
    // Obtener las denuncias
    try {
        const exposiciones = await exposicion.find(query);
        res.json(exposiciones);
    } catch (error) {
        // Error al obtener las denuncias
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }
}

// DELETE: Eliminar exposición
export const deleteExposicion = async (req, res) => {
    try {
        const { id } = req.params
        await exposicion.findByIdAndDelete(id)
        await agregarActividadReciente("Eliminación de exposición", "Exposición", id, req.cookies)
        res.send('Exposición eliminada con éxito')
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar exposición
export const editExposicion = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, numero_de_expediente, fecha, hora, division, direccion, telefono, SabeLeerYEscribir, observaciones } = req.body
        await exposicion.findByIdAndUpdate(id, {
            numero_de_expediente: numero_de_expediente,
            fecha: fecha,
            hora: hora,
            division: division,
            direccion: direccion,
            telefono: telefono,
            nombre_victima: nombre_victima,
            apellido_victima: apellido_victima,
            edad_victima: edad_victima,
            DNI_victima: dni_victima,
            estado_civil_victima: estado_civil_victima,
            ocupacion_victima: ocupacion_victima,
            nacionalidad_victima: nacionalidad_victima,
            direccion_victima: direccion_victima,
            telefono_victima: telefono_victima,
            sabe_leer_y_escribir_victima: SabeLeerYEscribir == "Sí" ? true : false,
            observaciones: observaciones
        })
        await agregarActividadReciente("Edición de exposición", "Exposición", id, req.cookies)
        res.send('Exposición editada con éxito')
    } catch (error) {
        console.log(error)
    }
}