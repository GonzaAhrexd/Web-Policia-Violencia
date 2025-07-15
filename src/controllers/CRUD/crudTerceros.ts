import { Request, Response } from 'express';
import terceros from '../../models/terceros';
import denuncias from '../../models/denuncias';
import { agregarActividadReciente } from './crudActividadReciente';
import { construirExpresionRegular } from '../../utils/normalizarTexto';

// Interfaces para TypeScript
interface TerceroRequestBody {
  nombre_tercero: string;
  apellido_tercero: string;
  dni_tercero: string;
}

interface DatosTercero {
  nombre: string;
  apellido: string;
  DNI: string;
}

interface BuscarTerceroParams {
  nombre_tercero: string;
  apellido_tercero: string;
  dni_tercero: string;
  numero_de_expediente: string;
  id_tercero: string;
}

// Función auxiliar para construir el objeto datosTercero
const construirDatosTercero = (body: TerceroRequestBody): DatosTercero => {
  const { nombre_tercero, apellido_tercero, dni_tercero } = body;
  return {
    nombre: nombre_tercero,
    apellido: apellido_tercero,
    DNI: dni_tercero,
  };
};


// POST: Crear un nuevo tercero
export const createTercero = async (req: Request<{}, {}, TerceroRequestBody>, res: Response) => {
  try {
    const { nombre_tercero, apellido_tercero, dni_tercero } = req.body;

    // Validar campos obligatorios
    if (!nombre_tercero || !apellido_tercero || !dni_tercero) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const datosTercero = construirDatosTercero(req.body);
    const terceroExistente = dni_tercero && dni_tercero !== 'S/N' ? await terceros.findOne({ DNI: dni_tercero }) : null;

    if (!terceroExistente) {
      const newTercero = new terceros(datosTercero);
      const terceroSaved = await newTercero.save();

      await agregarActividadReciente(
        `Se ha creado un nuevo tercero: ${nombre_tercero} ${apellido_tercero}`,
        'Tercero',
        terceroSaved._id.toString(),
        req.cookies
      );

      return res.status(201).json({ message: 'Tercero creado con éxito', id: terceroSaved._id });
    }

    const terceroUpdated = await terceros.findOneAndUpdate(
      { DNI: dni_tercero },
      { $set: datosTercero },
      { new: true }
    );

    if (!terceroUpdated) {
      return res.status(404).json({ message: 'No se pudo actualizar el tercero' });
    }

    await agregarActividadReciente(
      `Se agregó una denuncia al tercero: ${nombre_tercero} ${apellido_tercero}`,
      'Tercero',
      terceroUpdated._id.toString(),
      req.cookies
    );

    return res.status(200).json({ message: 'Tercero ya existe', id: terceroUpdated._id });
  } catch (error) {
    console.error('Error al crear tercero:', error);
    res.status(500).json({ message: 'Error al crear o actualizar el tercero' });
  }
};

// GET: Buscar tercero por nombre, apellido, DNI o número de expediente
export const buscarTercero = async (req: Request<BuscarTerceroParams>, res: Response) => {
  try {
    const { nombre_tercero, apellido_tercero, dni_tercero, numero_de_expediente, id_tercero } = req.params;
    const query: { [key: string]: any } = {};

    if (id_tercero !== 'no_ingresado') query._id = id_tercero;
    if (nombre_tercero !== 'no_ingresado') query.nombre = construirExpresionRegular(nombre_tercero);
    if (apellido_tercero !== 'no_ingresado') query.apellido = construirExpresionRegular(apellido_tercero);
    if (dni_tercero !== 'no_ingresado') query.DNI = dni_tercero.replace(/\./g, '');
    if (numero_de_expediente !== 'no_ingresado') {
      const denuncia = await denuncias.findOne({ numero_de_expediente });
      query._id = denuncia?.tercero_ID || 'Sin tercero';
    }

    const terceroBuscar = await terceros.find(query);
    await agregarActividadReciente('Búsqueda de tercero', 'Tercero', 'Varias', req.cookies);
    res.json(terceroBuscar);
  } catch (error) {
    console.error('Error al buscar terceros:', error);
    res.status(500).json({ message: 'Hubo un error al obtener los terceros.' });
  }
};

// GET: Obtener tercero
export const getTercero = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    if (id === 'Sin tercero') return res.json('Sin tercero');

    const tercero = await terceros.findById(id);
    if (!tercero) return res.status(404).json({ message: 'Tercero no encontrado' });

    res.json(tercero);
  } catch (error) {
    console.error('Error al obtener tercero:', error);
    res.status(500).json({ message: 'Error al obtener el tercero' });
  }
};

// PUT: Editar tercero
export const updateTercero = async (req: Request<{ id: string }, {}, TerceroRequestBody>, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_tercero, apellido_tercero } = req.body;

    if (!id) return res.status(400).json({ message: 'ID de tercero no proporcionado' });

    const datosTercero = construirDatosTercero(req.body);
    const terceroUpdated = await terceros.findByIdAndUpdate(id, { $set: datosTercero }, { new: true });

    if (!terceroUpdated) return res.status(404).json({ message: 'Tercero no encontrado' });

    await denuncias.updateMany(
      { tercero_ID: id },
      { tercero_nombre: `${nombre_tercero} ${apellido_tercero}` }
    );

    await agregarActividadReciente(
      `Edición de tercero: ${nombre_tercero} ${apellido_tercero}`,
      'Tercero',
      id,
      req.cookies
    );

    res.json(terceroUpdated);
  } catch (error) {
    console.error('Error al editar tercero:', error);
    res.status(500).json({ message: 'Error al editar el tercero' });
  }
};

// DELETE: Eliminar tercero
export const deleteTercero = async (id: any, denunciaId: any, req: any) => {
  try {
    if (id === 'Sin tercero') return;

    const tercero = await terceros.findById(id);
    if (!tercero) throw new Error('Tercero no encontrado');

    if (!tercero.denuncias_realizadas?.length) {
      await terceros.findByIdAndDelete(id);
      await agregarActividadReciente('Eliminación de tercero', 'Tercero', id, req.cookies);
    } else {
      const updatedDenunciasRealizadas = tercero.denuncias_realizadas.filter(
        (denuncia) => denuncia !== denunciaId
      );
      await terceros.findByIdAndUpdate(id, { denuncias_realizadas: updatedDenunciasRealizadas });
      await agregarActividadReciente('Eliminación de denuncia de tercero', 'Tercero', id, req.cookies);
    }
  } catch (error) {
    console.error('Error al eliminar tercero:', error);
    throw error;
  }
};

