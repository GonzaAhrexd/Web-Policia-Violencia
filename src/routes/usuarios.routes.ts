// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authRequired } from '../middlewares/validateToken';
// Controllers
import { getUsuarios } from '../controllers/CRUD/crudUsuarios';
const router:Router = Router();

// Rutas de usuarios

router.get('/usuario-por-nombre_de_usuario/:nombre_de_usuario/:nombre/:apellido/:rol', authRequired, getUsuarios)

export default router;