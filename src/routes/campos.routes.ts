// Importamos Router desde express
import { Router } from 'express';
import { createCampo, obtenerCampo, editarCampo, eliminarCampo } from '../controllers/CRUD/crudCampos';
import { authAdmin } from '../middlewares/validateToken';
const router:Router = Router();

// POST: Crear campo
router.post('/', authAdmin, createCampo)
// GET: Obtener campos
router.get('/:tipo', obtenerCampo)
// PUT: Editar campo
router.put('/:id', authAdmin, editarCampo)
// DELETE: Eliminar campo
router.delete('/:id', authAdmin, eliminarCampo)

export default router;