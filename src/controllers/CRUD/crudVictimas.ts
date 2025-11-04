import { Request, Response } from 'express';
import victimas from '../../models/victimas';
import denuncias from '../../models/denuncias';
import { agregarActividadReciente } from './crudActividadReciente';
import { construirExpresionRegular } from '../../utils/normalizarTexto';
// Definición de interfaces para TypeScript
interface CondicionesDeVulnerabilidad {
  embarazo: boolean;
  periodo_post_parto: boolean;
  periodo_de_lactancia: boolean;
  discapacidad: boolean;
  enfermedad_cronica: boolean;
  adulto_mayor: boolean;
  menor_de_edad: boolean;
  tratamiento_psicologico: boolean;
}

interface DatosHijos {
  tiene_hijos: boolean;
  dependencia_economica: boolean;
  mayores_de_edad: boolean;
  menores_de_edad: boolean;
  menores_discapacitados: boolean;
}

interface DatosVictima {
  nombre: string;
  apellido: string;
  direccion: string;
  edad: number;
  DNI: string;
  estado_civil: string;
  genero: string;
  ocupacion: string;
  etnia: string;
  condicion_de_vulnerabilidad: boolean;
  condiciones_de_vulnerabilidad: CondicionesDeVulnerabilidad;
  hijos: DatosHijos;
}

interface VictimaRequestBody {
  nombre_victima: string;
  apellido_victima: string;
  direccion_victima: string;
  edad_victima: number;
  dni_victima: string;
  estado_civil_victima: string;
  ocupacion_victima: string;
  condicion_de_vulnerabilidad: string;
  genero_victima: string;
  etnia_victima: string;
  embarazo?: boolean;
  periodo_post_parto?: boolean;
  periodo_de_lactancia?: boolean;
  discapacidad?: boolean;
  enfermedad_cronica?: boolean;
  adulto_mayor?: boolean;
  menor_de_edad?: boolean;
  tratamiento_psicologico?: boolean;
  hijos: string;
  dependencia_economica?: boolean;
  mayor_de_18?: boolean;
  menor_de_18?: boolean;
  menores_discapacitados?: boolean;
}

interface BuscarVictimaParams {
  nombre_victima: string;
  apellido_victima: string;
  dni_victima: string;
  numero_de_expediente: string;
  id_victima: string;
}

// Función auxiliar para construir el objeto datosVictima
const construirDatosVictima = (body: VictimaRequestBody): DatosVictima => {
  const {
    nombre_victima, apellido_victima, direccion_victima, edad_victima, dni_victima,
    estado_civil_victima, ocupacion_victima, condicion_de_vulnerabilidad, genero_victima, etnia_victima,
    embarazo, periodo_post_parto, periodo_de_lactancia, discapacidad, enfermedad_cronica,
    adulto_mayor, menor_de_edad, tratamiento_psicologico, hijos, dependencia_economica,
    mayor_de_18, menor_de_18, menores_discapacitados,
  } = body;

  const condicionesDeVulnerabilidad: CondicionesDeVulnerabilidad = {
    embarazo: !!embarazo && condicion_de_vulnerabilidad === 'Sí',
    periodo_post_parto: !!periodo_post_parto && condicion_de_vulnerabilidad === 'Sí',
    periodo_de_lactancia: !!periodo_de_lactancia && condicion_de_vulnerabilidad === 'Sí',
    discapacidad: !!discapacidad && condicion_de_vulnerabilidad === 'Sí',
    enfermedad_cronica: !!enfermedad_cronica && condicion_de_vulnerabilidad === 'Sí',
    adulto_mayor: !!adulto_mayor && condicion_de_vulnerabilidad === 'Sí',
    menor_de_edad: !!menor_de_edad && condicion_de_vulnerabilidad === 'Sí',
    tratamiento_psicologico: !!tratamiento_psicologico && condicion_de_vulnerabilidad === 'Sí',
  };

  const datosHijos: DatosHijos = {
    tiene_hijos: hijos === 'Sí',
    dependencia_economica: hijos === 'Sí' ? !!dependencia_economica : false,
    mayores_de_edad: hijos === 'Sí' ? !!mayor_de_18 : false,
    menores_de_edad: hijos === 'Sí' ? !!menor_de_18 : false,
    menores_discapacitados: hijos === 'Sí' ? !!menores_discapacitados : false,
  };

  return {
    nombre: nombre_victima,
    apellido: apellido_victima,
    direccion: direccion_victima,
    edad: edad_victima,
    DNI: dni_victima,
    estado_civil: estado_civil_victima,
    genero: genero_victima,
    ocupacion: ocupacion_victima,
    condicion_de_vulnerabilidad: condicion_de_vulnerabilidad === 'Sí',
    condiciones_de_vulnerabilidad: condicionesDeVulnerabilidad,
    hijos: datosHijos,
    etnia: etnia_victima
  };
};

// POST: Crear víctima
export const createVictima = async (req: Request<{}, {}, VictimaRequestBody>, res: Response) => {
  try {
    const datosVictima = construirDatosVictima(req.body);
    const { DNI, nombre, apellido } = datosVictima;

    const victimaExistente = DNI && DNI !== 'S/N' ? await victimas.findOne({ DNI }) : null;

    if (!victimaExistente) {
      const nuevaVictima = new victimas(datosVictima);
      const victimaGuardada = await nuevaVictima.save();

      await agregarActividadReciente(
        `Se ha creado nueva víctima ${nombre} ${apellido}`,
        'Víctima',
        victimaGuardada._id.toString(),
        req.cookies
      );

      return res.json({ message: 'Víctima creada con éxito', id: victimaGuardada._id });
    }

    const victimaActualizada = await victimas.findOneAndUpdate(
      { DNI },
      { $set: datosVictima },
      { new: true }
    );

    if (victimaActualizada) {
      await agregarActividadReciente(
        `Se agregó una denuncia a la víctima ${nombre} ${apellido}`,
        'Víctima',
        victimaActualizada._id.toString(),
        req.cookies
      );
    }

    return res.json({ message: 'Víctima ya existe', id: victimaActualizada?._id });
  } catch (error) {
    console.error('Error al crear o actualizar la víctima:', error);
    return res.status(500).json({ message: 'Error al crear o actualizar la víctima' });
  }
};

// GET: Obtener víctima
export const getVictima = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    if (id === 'Sin victima') return res.json('Sin resultados');

    const victima = await victimas.findById(id);
    if (!victima) return res.status(404).json({ message: 'Víctima no encontrada' });

    res.json(victima);
  } catch (error) {
    console.error('Error al obtener víctima:', error);
    res.status(500).json({ message: 'Error al obtener la víctima' });
  }
};

// DELETE: Eliminar víctima
export const deleteVictima = async (id: string, denunciaId: string, req: Request) => {
  try {
    const victima = await victimas.findById(id);
    if (!victima) throw new Error('Víctima no encontrada');

    if (!victima.denuncias_realizadas || !Array.isArray(victima.denuncias_realizadas)) {
      throw new Error('La víctima no tiene denuncias asociadas');
    }
    if (victima.denuncias_realizadas?.length <= 1) {
      await victimas.findByIdAndDelete(id);
      await agregarActividadReciente('Eliminación de víctima', 'Víctima', id, req.cookies);
    } else {
      const updatedDenunciasRealizadas = victima.denuncias_realizadas.filter(
        (denuncia) => denuncia !== denunciaId
      );
      await victimas.findByIdAndUpdate(id, { denuncias_realizadas: updatedDenunciasRealizadas });
      await agregarActividadReciente('Eliminación de denuncia de víctima', 'Víctima', id, req.cookies);
    }
  } catch (error) {
    console.error('Error al eliminar víctima:', error);
    throw error;
  }
};

// PUT: Editar víctima
export const updateVictima = async (req: Request<{ id: string }, {}, VictimaRequestBody>, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID de víctima no proporcionado' });

    const datosVictima = construirDatosVictima(req.body);
    const victimaUpdated = await victimas.findByIdAndUpdate(id, { $set: datosVictima }, { new: true });

    if (!victimaUpdated) return res.status(404).json({ message: 'Víctima no encontrada' });

    await agregarActividadReciente(
      `Se editó a la víctima ${datosVictima.nombre} ${datosVictima.apellido}`,
      'Víctima',
      id,
      req.cookies
    );

    await denuncias.updateMany(
      { victima_ID: id },
      { victima_nombre: `${datosVictima.nombre} ${datosVictima.apellido}` }
    );

    return res.json(victimaUpdated);
  } catch (error) {
    console.error('Error al actualizar víctima:', error);
    return res.status(500).json({ message: 'Error al actualizar víctima' });
  }
};

// GET: Buscar víctima
export const buscarVictima = async (req: Request<BuscarVictimaParams>, res: Response) => {
  try {
    const { nombre_victima, apellido_victima, dni_victima, numero_de_expediente, id_victima } = req.params;
    const query: { [key: string]: any } = {};

    if (id_victima !== 'no_ingresado') query._id = id_victima;
    if (nombre_victima !== 'no_ingresado') query.nombre = construirExpresionRegular(nombre_victima);
    if (apellido_victima !== 'no_ingresado') query.apellido = construirExpresionRegular(apellido_victima);
    if (dni_victima !== 'no_ingresado') query.DNI = dni_victima.replace(/\./g, '');
    if (numero_de_expediente !== 'no_ingresado') {
      const denuncia = await denuncias.findOne({ numero_de_expediente });
      query._id = denuncia?.victima_ID || 'Sin victima';
    }

    const victimasBuscar = await victimas.find(query);
    await agregarActividadReciente('Búsqueda de víctima', 'Víctima', 'Varias', req.cookies);
    res.json(victimasBuscar);
  } catch (error) {
    console.error('Error al buscar víctimas:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las víctimas.' });
  }
};

// POST: Obtener víctimas con un array de IDs
export const getVictimasWithArray = async (req: Request<{}, {}, { victimasIds: string[] }>, res: Response) => {
  try {
    const { victimasIds } = req.body;
    if (!Array.isArray(victimasIds) || victimasIds.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar un array de IDs de víctimas.' });
    }

    const victimasArray = await victimas.find({ _id: { $in: victimasIds } });
    res.json(victimasArray);
  } catch (error) {
    console.error('Error al obtener las víctimas:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las víctimas.' });
  }
};


export const getVictimasSued = async (req: Request, res: Response) => {

  try {

    const { token, nombre_victima, apellido_victima, dni_victima } = req.params;

    if (token !== process.env.TOKEN_API_SUED) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const query: { [key: string]: any } = {};

    if (nombre_victima !== 'no_ingresado') query.nombre = construirExpresionRegular(nombre_victima);
    if (apellido_victima !== 'no_ingresado') query.apellido = construirExpresionRegular(apellido_victima);
    if (dni_victima !== 'no_ingresado') query.DNI = dni_victima.replace(/\./g, '');


    let victimasBuscar: any[] = await victimas.find(query);

    // victimasBuscar = await Promise.all(
    //   victimasBuscar.map(async (victima: any) => {
    //     const denunciasIds: string[] = Array.isArray(victima?.denuncias_realizadas)
    //       ? victima.denuncias_realizadas
    //       : [];

    //     const denunciasPromises = denunciasIds.map((id: string) => denuncias.findById(id));
    //     const denunciasEncontradas = await Promise.all(denunciasPromises);

    //     const victimaObj = victima.toObject?.() ?? { ...victima };
    //     victimaObj.denuncias = denunciasEncontradas.filter(Boolean); // filtra nulos si hace falta

    //     return victimaObj;
    //   })
    // );

    res.json(victimasBuscar);




  } catch (error) {
    console.error('Error al obtener las víctimas:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las víctimas.' });
  }

}


