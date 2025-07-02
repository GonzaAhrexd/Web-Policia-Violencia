import { Router } from 'express'
import { authAdmin, authRequired } from '../middlewares/validateToken'
import { buscarActividadReciente, buscasActividadPorIdUsuario } from '../controllers/CRUD/crudActividadReciente'

const router:Router = Router()

// GET: Buscar actividad reciente
router.get('/:desde/:hasta/:seccion/:usuario', authAdmin, buscarActividadReciente)
// GET: Buscar actividad reciente por id de usuario
router.get('/:id', authRequired, buscasActividadPorIdUsuario )

export default router