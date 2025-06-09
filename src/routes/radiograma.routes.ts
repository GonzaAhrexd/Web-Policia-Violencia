import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createRadiograma, buscarRadiogramaID, editRadiograma, ampliarRadiograma, deleteRadiograma } from '../controllers/CRUD/crudRadiograma'

const router:Router = Router()
// Crear radiograma
router.post('/crear-radiograma', authRequired, createRadiograma)
// Buscar radiograma por ID
router.get('/buscar-radiograma/:id_radiograma', authRequired, buscarRadiogramaID)
// Editar radiograma
router.put('/editar-radiograma/:id_radiograma', authRequired, editRadiograma)
// Ampliar radiograma
router.put('/ampliar-radiograma/:id_radiograma_anterior/:id_radiograma_nuevo', authRequired, ampliarRadiograma)
// Eliminar radiograma
router.delete('/eliminar-radiograma/:id_radiograma', authRequired, deleteRadiograma)

// router.get('/buscar-radiograma/:id_radiograma/:numero_nota/:desde/:hasta/:division/:mostrar_ampliaciones', authRequired, buscarradiograma)

export default router