import { Request, Response } from 'express';
import usuarios from '../../models/usuarios';
import { construirExpresionRegular } from '../../utils/normalizarTexto';
import { agregarActividadReciente } from './crudActividadReciente';

// Interfaces para TypeScript
interface BuscarUsuarioParams {
  nombre_de_usuario?: string;
  nombre?: string;
  apellido?: string;
  rol?: string;
}

interface Query {
  nombre_de_usuario?: RegExp;
  nombre?: RegExp;
  apellido?: RegExp;
  rol?: string;
}

interface ChangeUserRoleBody {
  _id: string;
  rol: string;
}

// GET: Obtener usuarios
export const getUsuarios = async (req: Request<BuscarUsuarioParams>, res: Response) => {
  try {
    const { nombre_de_usuario, nombre, apellido, rol } = req.params;
    const query: Query = {};

    // Manejar expresiones regulares solo si el valor no es 'no_ingresado'
    if (nombre_de_usuario && nombre_de_usuario !== 'no_ingresado') {
      const regex = construirExpresionRegular(nombre_de_usuario);
      if (regex) query.nombre_de_usuario = regex;
    }
    if (nombre && nombre !== 'no_ingresado') {
      const regex = construirExpresionRegular(nombre);
      if (regex) query.nombre = regex;
    }
    if (apellido && apellido !== 'no_ingresado') {
      const regex = construirExpresionRegular(apellido);
      if (regex) query.apellido = regex;
    }
    if (rol && rol !== 'no_ingresado') {
      query.rol = rol;
    }

    const usuariosABuscar = await usuarios.find(query);
    await agregarActividadReciente('Búsqueda de usuarios', 'Usuario', 'Varias', req.cookies);
    res.json(usuariosABuscar);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Hubo un error al obtener los usuarios.' });
  }
};

// PUT: Cambiar rol de usuario
export const changeUserRole = async (req: Request<{}, {}, ChangeUserRoleBody>, res: Response) => {
  try {
    const { _id, rol } = req.body;

    // Validar campos obligatorios
    if (!_id || !rol) {
      return res.status(400).json({ message: 'Faltan datos obligatorios: _id y rol' });
    }

    const usuario = await usuarios.findByIdAndUpdate(_id, { rol }, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await agregarActividadReciente(
      `Cambio de rol del usuario con ID ${_id} a ${rol}`,
      'Usuario',
      _id,
      req.cookies
    );

    res.json(usuario);
  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error);
    res.status(500).json({ message: 'Error al cambiar el rol del usuario' });
  }
};