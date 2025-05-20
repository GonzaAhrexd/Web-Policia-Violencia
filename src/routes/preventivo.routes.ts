import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createPreventivo, buscarPreventivo, editPreventivo, deletePreventivo, buscarPreventivoID } from '../controllers/CRUD/crudPreventivo'
const router:Router = Router()

router.post('/crear-preventivo', authRequired, createPreventivo)
router.get('/buscar-preventivo/:id_preventivo', authRequired, buscarPreventivoID)
router.get('/buscar-preventivo/:id_preventivo/:numero_nota/:desde/:hasta/:division', authRequired, buscarPreventivo)
router.put('/editar-preventivo/:id_preventivo', authRequired, editPreventivo)
router.delete('/eliminar-preventivo/:id_preventivo', authRequired, deletePreventivo)
export default router


