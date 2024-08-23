/*  -----------------------------------------------------------------------------------------------------------------
    DENUNCIAS: 
    Son todas las denuncias cargadas por personal del área de estadística, ya sea de manera manual o verificando
    lo cargado por unidades externas. 
    -----------------------------------------------------------------------------------------------------------------
*/

import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { getMisDenuncias, getDenuncias, updateDenuncia, createDenuncia, deleteDenuncia, getDenunciasId, getCantidadDenuncias } from '../controllers/CRUD/crudDenuncias'

const router:Router = Router()

// Denuncias del usuario logueado
router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo', authRequired, getMisDenuncias)
// Buscar entre todas las denuncias
router.get('/buscar-denuncias/:desde/:hasta/:id_denuncia/:numero_de_expediente/:is_expediente_completo/:division/:municipio/:comisaria', authRequired, getDenuncias)
// Editar denuncia por id
router.put('/editar-denuncias/:id', authRequired, updateDenuncia)
// Crear denuncia
router.post('/crear-denuncia/', authRequired, createDenuncia)
// Eliminar denuncia por id
router.delete('/eliminar-denuncias/:id', authRequired,  deleteDenuncia)
// Buscar denuncia por id
router.get('/buscar-denuncias-id/:id', authRequired, getDenunciasId)
// Cantidad de denuncias
router.get('/cantidad-denuncias/:desde/:hasta', authRequired, getCantidadDenuncias)

export default router
