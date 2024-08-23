import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createExposicion, buscarExposicion, deleteExposicion } from '../controllers/CRUD/crudExposicion'

/*  -----------------------------------------------------------------------------------------------------------------
    EXPOSICIÓN
    Son exposiciones cargadas por agentes y personal externo. Es cuando una persona quiere exponer sobre un hecho
    sin realizar una denuncia como tal. 
    -----------------------------------------------------------------------------------------------------------------
*/
const router:Router = Router()

// Crear exposición
router.post('/crear-exposicion/', authRequired, createExposicion)
// Buscar exposición
router.get('/buscar-exposicion/:desde/:hasta/:id_exposicion/:nombre_victima/:apellido_victima/:dni_victima/', authRequired, buscarExposicion)
// Eliminar exposición por id
router.delete('/eliminar-exposicion/:id', authRequired,  deleteExposicion)

export default router