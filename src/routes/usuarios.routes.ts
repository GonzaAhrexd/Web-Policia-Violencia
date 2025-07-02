// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import {  authAdmin } from '../middlewares/validateToken';
// Controllers
import { getUsuarios, changeUserRole } from '../controllers/CRUD/crudUsuarios';
import { editUser } from '../controllers/auth.controller';
const router:Router = Router();

// Rutas de usuarios
// GET: Buscar usuarios por nombre de usuario, nombre, apellido y rol
router.get('/:nombre_de_usuario/:nombre/:apellido/:rol', authAdmin, getUsuarios)
// PUT: Editar usuario
router.put('/:id', authAdmin, editUser)
// PUT: Cambiar rol de usuario
router.put('/cambiar-rol/', authAdmin, changeUserRole)

export default router;