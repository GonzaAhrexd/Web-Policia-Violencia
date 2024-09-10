// Importamos Router desde express
import { Router } from 'express';
import { createCampo, obtenerCampo, editarCampo, eliminarCampo } from '../controllers/CRUD/crudCampos';
import { authAdmin } from '../middlewares/validateToken';
const router:Router = Router();

// Crear campo
router.post('/agregar-campo/', authAdmin, createCampo)
router.get('/obtener-campo/:tipo', authAdmin, obtenerCampo)
router.put('/editar-campo/:id', authAdmin, editarCampo)    
router.delete('/eliminar-campo/:id', authAdmin, eliminarCampo)

export default router;