import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import {getDenuncia, getMisDenuncias, createDenuncia, deleteDenuncia, updateDenuncia, getVictima, createVictima, getVictimario, createVictimario, deleteVictima, deleteVictimario, updateVictimario, updateVictima } from '../controllers/crud.controller'



const router = Router();

router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo', authRequired, getMisDenuncias)
router.get('/mis-denuncias:id', authRequired, getDenuncia)

router.post('/crear-denuncia/', authRequired, createDenuncia)
router.delete('/eliminar-denuncias:id', authRequired,  deleteDenuncia)
router.put('/editar-denuncias:id', authRequired, updateDenuncia)


router.post('/crear-victima/', authRequired, createVictima)
router.get('/victima/:id', authRequired, getVictima)
router.delete('/eliminar-victima:id', authRequired,  deleteVictima)
router.put('/editar-victima:id', authRequired, updateVictima)

router.get('/victimario/:id', authRequired, getVictimario)
router.post('/crear-victimario/', authRequired, createVictimario)
router.delete('/eliminar-victimario:id', authRequired,  deleteVictimario)
router.put('/editar-victimario:id', authRequired, updateVictimario)





export default router