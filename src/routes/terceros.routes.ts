/*  ----------------------------------------------------------------------------------------------------------------- 
    TERCEROS 
    Son los datos de los terceros que realicen denuncias 
    -----------------------------------------------------------------------------------------------------------------
*/
import { Router } from 'express'
import { authCarga } from '../middlewares/validateToken'
import { getTercero, createTercero, updateTercero, buscarTercero } from '../controllers/CRUD/crudTerceros'

const router:Router = Router()

// GET: Buscar tercero por id
router.get('/:id', authCarga, getTercero)
// GET: Buscar tercero
router.get('/:id_tercero/:nombre_tercero/:apellido_tercero/:dni_tercero/:numero_de_expediente', authCarga, buscarTercero)
// POST: Crear tercero
router.post('/', authCarga, createTercero)
// PUT: Editar tercero
router.put('/:id', authCarga, updateTercero)

export default router
