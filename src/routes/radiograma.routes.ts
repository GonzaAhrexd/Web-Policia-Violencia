import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createRadiograma, buscarRadiogramaID, editRadiograma, ampliarRadiograma, deleteRadiograma } from '../controllers/CRUD/crudRadiograma'

const router:Router = Router()
// POST: Crear radiograma
router.post('/', authRequired, createRadiograma)
// GET: Buscar radiograma por ID
router.get('/:id_radiograma', authRequired, buscarRadiogramaID)
// PUT: Editar radiograma
router.put('/:id_radiograma', authRequired, editRadiograma)
// PUT: Ampliar radiograma
router.put('/ampliar-radiograma/:id_radiograma_anterior/:id_radiograma_nuevo', authRequired, ampliarRadiograma)
// DELETE: Eliminar radiograma
router.delete('/:id_radiograma', authRequired, deleteRadiograma)

export default router