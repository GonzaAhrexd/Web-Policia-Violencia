import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createRadiograma, buscarRadiogramaID, editRadiograma, ampliarRadiograma } from '../controllers/CRUD/crudRadiograma'

const router:Router = Router()
router.post('/crear-radiograma', authRequired, createRadiograma)
router.get('/buscar-radiograma/:id_radiograma', authRequired, buscarRadiogramaID)
router.put('/editar-radiograma/:id_radiograma', authRequired, editRadiograma)
router.put('/ampliar-radiograma/:id_radiograma_anterior/:id_radiograma_nuevo', authRequired, ampliarRadiograma)
// router.get('/buscar-radiograma/:id_radiograma/:numero_nota/:desde/:hasta/:division/:mostrar_ampliaciones', authRequired, buscarradiograma)
// router.delete('/eliminar-radiograma/:id_radiograma', authRequired, deleteradiograma)


export default router