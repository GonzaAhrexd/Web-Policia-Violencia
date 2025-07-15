
import exposicion from '../../models/exposicion';
import { agregarActividadReciente } from './crudActividadReciente';
import { construirExpresionRegular } from '../../utils/normalizarTexto';

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

// Objeto para mapear campos del body a modelo
const mapExposicionFields = ({
    numero_de_expediente, fecha, hora, division, direccion, telefono,
    nombre_victima, apellido_victima, edad_victima, dni_victima,
    estado_civil_victima, ocupacion_victima, nacionalidad_victima,
    direccion_victima, telefono_victima, SabeLeerYEscribir,
    observaciones, AgregarQuitarOEnmendarAlgo, agrega,
    nombre_completo_secretario, jerarquia_secretario, plaza_secretario,
    nombre_completo_instructor, jerarquia_instructor
}) => ({
    numero_de_expediente,
    fecha,
    hora,
    division,
    direccion,
    telefono,
    nombre_victima,
    apellido_victima,
    edad_victima,
    DNI_victima: dni_victima,
    estado_civil_victima,
    ocupacion_victima,
    nacionalidad_victima,
    direccion_victima,
    telefono_victima,
    sabe_leer_y_escribir_victima: SabeLeerYEscribir === 'Sí',
    observaciones,
    preguntas: {
        desea_agregar_quitar_o_enmendar: AgregarQuitarOEnmendarAlgo === 'Sí'
    },
    agrega: agrega || 'No se agregó nada',
    secretario: {
        nombre_completo_secretario,
        jerarquia_secretario,
        plaza_secretario
    },
    instructor: {
        nombre_completo_instructor,
        jerarquia_instructor
    }
});

// Función auxiliar para manejar errores
const handleError = (res, error, message = 'Error en la operación') => {
    console.error(error);
    res.status(500).json({ message });
};

// POST: Crear exposición
export const createExposicion = async (req, res) => {
    try {
        const expoData = mapExposicionFields(req.body);
        const expoSave = await new exposicion(expoData).save();
        await agregarActividadReciente('Carga de exposición', 'Exposición', expoSave._id, req.cookies);
        res.send('Exposición creada con éxito');
    } catch (error) {
        handleError(res, error);
    }
};

// GET: Buscar exposición
export const buscarExposicion = async (req, res) => {
    const { desde, hasta, id_exposicion, nombre_victima, apellido_victima, dni_victima } = req.params;
    const query: Query = {};

    if (desde !== 'no_ingresado') query.createdAt = { $gte: desde };
    if (hasta !== 'no_ingresado') query.createdAt = { ...query.createdAt, $lte: hasta };
    if (id_exposicion !== 'no_ingresado') query._id = id_exposicion;

    if (nombre_victima !== 'no_ingresado') {
        const regex = construirExpresionRegular(nombre_victima);
        if (regex) query.nombre_victima = new RegExp(regex);
    }
    if (apellido_victima !== 'no_ingresado') {
        const regex = construirExpresionRegular(apellido_victima);
        if (regex) query.apellido_victima = new RegExp(regex);
    }
    if (dni_victima !== 'no_ingresado') query.DNI_victima = dni_victima.replace(/\./g, '');

    try {
        const exposiciones = await exposicion.find(query);
        res.json(exposiciones);
    } catch (error) {
        handleError(res, error, 'Hubo un error al obtener las denuncias.');
    }
};

// DELETE: Eliminar exposición
export const deleteExposicion = async (req, res) => {
    try {
        const { id } = req.params;
        await exposicion.findByIdAndDelete(id);
        await agregarActividadReciente('Eliminación de exposición', 'Exposición', id, req.cookies);
        res.send('Exposición eliminada con éxito');
    } catch (error) {
        handleError(res, error);
    }
};

// PUT: Editar exposición
export const editExposicion = async (req, res) => {
    try {
        const { id } = req.params;
        const expoData = mapExposicionFields(req.body);
        await exposicion.findByIdAndUpdate(id, expoData);
        await agregarActividadReciente('Edición de exposición', 'Exposición', id, req.cookies);
        res.send('Exposición editada con éxito');
    } catch (error) {
        handleError(res, error);
    }
};