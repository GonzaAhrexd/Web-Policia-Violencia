import { Request, Response } from 'express';
import victimario from '../../models/victimario';
import denuncias from '../../models/denuncias';
import { agregarActividadReciente } from './crudActividadReciente';
import { construirExpresionRegular } from '../../utils/normalizarTexto';

// Interfaces para TypeScript
interface VictimarioRequestBody {
  nombre_victimario: string;
  apellido_victimario: string;
  direccion_victimario: string;
  edad_victimario: number;
  dni_victimario: string;
  estado_civil_victimario: string;
  ocupacion_victimario: string;
  abuso_de_alcohol?: boolean;
  antecedentes_toxicologicos?: boolean;
  antecedentes_psicologicos?: boolean;
  antecedentes_penales?: boolean;
  antecedentes_contravencionales?: boolean;
  entrenamiento_en_combate?: boolean;
  aprehension?: boolean;
  solicitud_de_aprehension_dispuesta?: boolean;
  esta_aprehendido?: boolean;
  fue_liberado?: boolean;
}

interface DatosVictimario {
  nombre: string;
  apellido: string;
  direccion: string;
  edad: number;
  DNI: string;
  estado_civil: string;
  ocupacion: string;
  abuso_de_alcohol: boolean;
  antecedentes_toxicologicos: boolean;
  antecedentes_psicologicos: boolean;
  antecedentes_penales: boolean;
  antecedentes_contravencionales: boolean;
  entrenamiento_en_combate: boolean;
  esta_aprehendido: boolean;
  fue_liberado: boolean;
}

interface BuscarVictimarioParams {
  nombre_victimario: string;
  apellido_victimario: string;
  dni_victimario: string;
  numero_de_expediente: string;
  victimario_id: string;
}

// Función auxiliar para construir el objeto datosVictimario
const construirDatosVictimario = (body: VictimarioRequestBody): DatosVictimario => {
  const {
    nombre_victimario, apellido_victimario, direccion_victimario, edad_victimario, dni_victimario,
    estado_civil_victimario, ocupacion_victimario, abuso_de_alcohol, antecedentes_toxicologicos,
    antecedentes_psicologicos, antecedentes_penales, antecedentes_contravencionales,
    entrenamiento_en_combate, aprehension, solicitud_de_aprehension_dispuesta, esta_aprehendido,
    fue_liberado,
  } = body;

  return {
    nombre: nombre_victimario,
    apellido: apellido_victimario,
    direccion: direccion_victimario,
    edad: edad_victimario,
    DNI: dni_victimario,
    estado_civil: estado_civil_victimario,
    ocupacion: ocupacion_victimario,
    abuso_de_alcohol: !!abuso_de_alcohol,
    antecedentes_toxicologicos: !!antecedentes_toxicologicos,
    antecedentes_psicologicos: !!antecedentes_psicologicos,
    antecedentes_penales: !!antecedentes_penales,
    antecedentes_contravencionales: !!antecedentes_contravencionales,
    entrenamiento_en_combate: !!entrenamiento_en_combate,
    esta_aprehendido: esta_aprehendido ?? (aprehension && solicitud_de_aprehension_dispuesta) ?? false,
    fue_liberado: !!fue_liberado,
  };
};

// POST: Crear victimario
export const createVictimario = async (req: Request<{}, {}, VictimarioRequestBody>, res: Response) => {
  try {
    const { nombre_victimario, apellido_victimario, direccion_victimario, edad_victimario, dni_victimario } = req.body;

    // Validar campos obligatorios
    if (!nombre_victimario || !apellido_victimario || !direccion_victimario || !edad_victimario) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const datosVictimario = construirDatosVictimario(req.body);
    const victimarioExistente = dni_victimario && dni_victimario !== 'S/N' ? await victimario.findOne({ DNI: dni_victimario }) : null;

    if (!victimarioExistente) {
      const newVictimario = new victimario(datosVictimario);
      const victimarioSaved = await newVictimario.save();

      await agregarActividadReciente(
        `Se ha creado un nuevo victimario: ${nombre_victimario} ${apellido_victimario}`,
        'Victimario',
        victimarioSaved._id.toString(),
        req.cookies
      );

      return res.status(201).json({ message: 'Victimario creado con éxito', id: victimarioSaved._id });
    }

    const victimarioUpdated = await victimario.findOneAndUpdate(
      { DNI: dni_victimario },
      { $set: datosVictimario },
      { new: true }
    );

    if (!victimarioUpdated) {
      return res.status(404).json({ message: 'No se pudo actualizar el victimario' });
    }

    await agregarActividadReciente(
      `Se agregó una denuncia al victimario: ${nombre_victimario} ${apellido_victimario}`,
      'Victimario',
      victimarioUpdated._id.toString(),
      req.cookies
    );

    return res.status(200).json({ message: 'Victimario actualizado con éxito', id: victimarioUpdated._id });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
};

// GET: Obtener victimario
export const getVictimario = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    if (id === 'Sin victimario') return res.json('Sin victimario');

    const victimarioABuscar = await victimario.findById(id);
    if (!victimarioABuscar) return res.status(404).json({ message: 'Victimario no encontrado' });

    res.json(victimarioABuscar);
  } catch (error) {
    console.error('Error al obtener victimario:', error);
    res.status(500).json({ message: 'Error al obtener el victimario' });
  }
};

// DELETE: Eliminar victimario
export const deleteVictimario = async (id: string, denunciaId: string, req: Request) => {
  try {
    const victimarioABorrar = await victimario.findById(id);
    if (!victimarioABorrar) throw new Error('Victimario no encontrado');

    if (!victimarioABorrar.denuncias_en_contra?.length) {
      await victimario.findByIdAndDelete(id);
      await agregarActividadReciente('Eliminación de victimario', 'Victimario', id, req.cookies);
    } else {
      const updatedDenunciasEnContra = victimarioABorrar.denuncias_en_contra.filter(
        (denuncia) => denuncia !== denunciaId
      );
      await victimario.findByIdAndUpdate(id, { denuncias_en_contra: updatedDenunciasEnContra });
      await agregarActividadReciente('Eliminación de denuncia del victimario', 'Victimario', id, req.cookies);

    }
  } catch (error) {
    console.error('Error al eliminar victimario:', error);
    throw error;
  }
};

// PUT: Editar victimario
export const updateVictimario = async (req: Request<{ id: string }, {}, VictimarioRequestBody>, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre_victimario, apellido_victimario } = req.body;

    if (!id) return res.status(400).json({ message: 'ID de victimario no proporcionado' });

    const datosVictimario = construirDatosVictimario(req.body);
    const victimarioUpdated = await victimario.findByIdAndUpdate(id, { $set: datosVictimario }, { new: true });

    if (!victimarioUpdated) return res.status(404).json({ message: 'Victimario no encontrado' });

    await denuncias.updateMany(
      { victimario_ID: id },
      { victimario_nombre: `${nombre_victimario} ${apellido_victimario}` }
    );

    await agregarActividadReciente(
      `Edición de victimario: ${nombre_victimario} ${apellido_victimario}`,
      'Victimario',
      id,
      req.cookies
    );

    return res.status(200).json(victimarioUpdated);
  } catch (error) {
    console.error('Error al editar victimario:', error);
    return res.status(500).json({ message: 'Error al editar el victimario' });
  }
};

// GET: Buscar victimario
export const buscarVictimario = async (req: Request<BuscarVictimarioParams>, res: Response) => {
  try {
    const { nombre_victimario, apellido_victimario, dni_victimario, numero_de_expediente, victimario_id } = req.params;
    const query: { [key: string]: any } = {};

  

    if (victimario_id !== 'no_ingresado') query._id = victimario_id;
    if (nombre_victimario !== 'no_ingresado') query.nombre = construirExpresionRegular(nombre_victimario);
    if (apellido_victimario !== 'no_ingresado') query.apellido = construirExpresionRegular(apellido_victimario);
    if (dni_victimario !== 'no_ingresado') query.DNI = dni_victimario.replace(/\./g, '');
    if (numero_de_expediente !== 'no_ingresado') {
      const denuncia = await denuncias.findOne({ numero_de_expediente });
      query._id = denuncia?.victimario_ID || 'Sin victimario';
    }

    const victimariosFind = await victimario.find(query);
    await agregarActividadReciente('Búsqueda de victimario', 'Victimario', 'Varias', req.cookies);
    res.json(victimariosFind);
  } catch (error) {
    console.error('Error al buscar victimarios:', error);
    res.status(500).json({ message: 'Hubo un error al obtener los victimarios.' });
  }
};

// GET: Buscar victimario por DNI
export const buscarVictimarioPorDni = async (req: Request<{ dni_victimario: string }>, res: Response) => {
  try {
    const { dni_victimario } = req.params;
    const victimarioData = await victimario.findOne({ DNI: dni_victimario });

    if (!victimarioData) return res.json('No se encontró al victimario');

    const denunciasDetalles = await denuncias.find({ _id: { $in: victimarioData.denuncias_en_contra } });

    res.json({
      ...victimarioData.toObject(),
      denuncias_detalles: denunciasDetalles,
    });
  } catch (error) {
    console.error('Error al buscar victimario por DNI:', error);
    res.status(500).json({ message: 'Error al buscar el victimario' });
  }
};

// POST: Buscar victimarios por array de IDs
export const buscarVictimariosArray = async (req: Request<{}, {}, { victimariosIds: string[] }>, res: Response) => {
  try {
    const { victimariosIds } = req.body;
    if (!Array.isArray(victimariosIds) || victimariosIds.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar un array de IDs de victimarios.' });
    }

    const victimarios = await victimario.find({ _id: { $in: victimariosIds } });
    res.json(victimarios);
  } catch (error) {
    console.error('Error al obtener victimarios:', error);
    res.status(500).json({ message: 'Hubo un error al obtener los victimarios.' });
  }
};