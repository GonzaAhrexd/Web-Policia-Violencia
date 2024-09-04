// Importamos Router desde express
import { Router } from 'express';
import { createCampo, obtenerCampo } from '../controllers/CRUD/crudCampos';
import { authAdmin } from '../middlewares/validateToken';
const router:Router = Router();

// Crear campo
router.post('/agregar-campo/', authAdmin, createCampo)
router.get('/obtener-campo/:tipo', authAdmin, obtenerCampo)

export default router;