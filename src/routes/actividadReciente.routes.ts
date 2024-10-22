import { Router } from 'express'
import { authAdmin, authRequired } from '../middlewares/validateToken'
import { buscarActividadReciente, buscasActividadPorIdUsuario } from '../controllers/CRUD/crudActividadReciente'

const router:Router = Router()

// Buscar actividad reciente
router.get('/buscar-actividad-reciente/:desde/:hasta/:seccion/:usuario', authAdmin, buscarActividadReciente)
// Buscar actividad reciente por id de usuario
router.get('/mi-actividad/:id', authRequired, buscasActividadPorIdUsuario )

export default router