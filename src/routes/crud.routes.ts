import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import {getDenuncia, getDenuncias, createDenuncia, deleteDenuncia, updateDenuncia, createVictima, createVictimario, deleteVictima, deleteVictimario, updateVictimario, updateVictima } from '../controllers/crud.controller'



const router = Router();

router.get('/mis-denuncias', authRequired, getDenuncias)
router.get('/mis-denuncias:id', authRequired, getDenuncia)

router.post('/crear-denuncia/', authRequired, createDenuncia)
router.delete('/eliminar-denuncias:id', authRequired,  deleteDenuncia)
router.put('/editar-denuncias:id', authRequired, updateDenuncia)


router.post('/crear-victima/', authRequired, createVictima)
router.delete('/eliminar-victima:id', authRequired,  deleteVictima)
router.put('/editar-victima:id', authRequired, updateVictima)

router.post('/crear-victimario/', authRequired, createVictimario)
router.delete('/eliminar-victimario:id', authRequired,  deleteVictimario)
router.put('/editar-victimario:id', authRequired, updateVictimario)





export default router