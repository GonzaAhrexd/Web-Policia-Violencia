/*  ----------------------------------------------------------------------------------------------------------------- 
    TERCEROS 
    Son los datos de los terceros que realicen denuncias 
    -----------------------------------------------------------------------------------------------------------------
*/
import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { getTercero, createTercero, updateTercero, buscarTercero } from '../controllers/CRUD/crudTerceros'

const router:Router = Router()

// Buscar tercero por id
router.get('/tercero/:id', authRequired, getTercero)
// Crear tercero
router.post('/crear-tercero/', authRequired, createTercero)
// Editar tercero
router.put('/editar-tercero/:id', authRequired, updateTercero)
// Buscar tercero
router.get('/buscar-tercero/:id_tercero/:nombre_tercero/:apellido_tercero/:dni_tercero/:numero_de_expediente', authRequired, buscarTercero)