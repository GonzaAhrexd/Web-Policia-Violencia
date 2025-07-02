import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createExposicion, buscarExposicion, deleteExposicion, editExposicion } from '../controllers/CRUD/crudExposicion'

/*  -----------------------------------------------------------------------------------------------------------------
    EXPOSICIÓN
    Son exposiciones cargadas por agentes y personal externo. Es cuando una persona quiere exponer sobre un hecho
    sin realizar una denuncia como tal. 
    -----------------------------------------------------------------------------------------------------------------
*/
const router:Router = Router()

// POST: Crear exposición
router.post('/', authRequired, createExposicion)
// GET: Buscar exposición
router.get('/:desde/:hasta/:id_exposicion/:nombre_victima/:apellido_victima/:dni_victima/', authRequired, buscarExposicion)
// PUT: Editar exposición por id
router.put('/:id', authRequired,  editExposicion)
// DELETE: Eliminar exposición por id
router.delete('/:id', authRequired,  deleteExposicion)
export default router
