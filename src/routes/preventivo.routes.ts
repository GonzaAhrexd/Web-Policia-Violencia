import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createPreventivo, buscarPreventivo, editPreventivo, deletePreventivo, buscarPreventivoID, ampliarPreventivo } from '../controllers/CRUD/crudPreventivo'

const router:Router = Router()
// POST: Crear preventivo
router.post('/', authRequired, createPreventivo)
// POST: Ampliar preventivo
router.post('/ampliar-preventivo', authRequired, ampliarPreventivo)
// GET: Buscar preventivo por ID
router.get('/:id_preventivo', authRequired, buscarPreventivoID)
// GET: Buscar ampliaciones de un preventivo
router.get('/:id_preventivo/:numero_nota/:desde/:hasta/:division/:mostrar_ampliaciones', authRequired, buscarPreventivo)
// PUT: Editar preventivo por ID
router.put('/:id_preventivo', authRequired, editPreventivo)
// DELETE: Eliminar preventivo por ID
router.delete('/:id_preventivo', authRequired, deletePreventivo)


export default router