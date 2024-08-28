import { Router } from 'express'
import { authAdmin } from '../middlewares/validateToken'
import { buscarActividadReciente } from '../controllers/CRUD/crudActividadReciente'


const router:Router = Router()

// Buscar actividad reciente
router.get('/buscar-actividad-reciente/:desde/:hasta/:seccion', authAdmin, buscarActividadReciente)

export default router