// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authRequired } from '../middlewares/validateToken';
// Controllers
import { getUsuarios, changeUserRole } from '../controllers/CRUD/crudUsuarios';
const router:Router = Router();

// Rutas de usuarios

router.get('/buscar-usuario/:nombre_de_usuario/:nombre/:apellido/:rol', authRequired, getUsuarios)
router.put('/cambiar-rol/', authRequired, changeUserRole)
export default router;