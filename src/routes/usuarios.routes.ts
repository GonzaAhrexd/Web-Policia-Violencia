// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import {  authAdmin } from '../middlewares/validateToken';
// Controllers
import { getUsuarios, changeUserRole } from '../controllers/CRUD/crudUsuarios';
import { editUser } from '../controllers/auth.controller';
const router:Router = Router();

// Rutas de usuarios

router.get('/buscar-usuario/:nombre_de_usuario/:nombre/:apellido/:rol', authAdmin, getUsuarios)
router.put('/cambiar-rol/', authAdmin, changeUserRole)
router.put('/editar-usuario/:id', authAdmin, editUser)
export default router;