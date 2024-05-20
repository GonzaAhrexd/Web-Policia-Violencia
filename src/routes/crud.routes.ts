import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import {getDenuncia,  getMisDenuncias, createDenuncia, createDenunciaSinVerificar, deleteDenuncia, updateDenuncia, getVictima, createVictima, getVictimario, createVictimario, updateVictimario, updateVictima } from '../controllers/crud.controller'

const router = Router();

// Denuncias
router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo', authRequired, getMisDenuncias)
router.get('/mis-denuncias:id', authRequired, getDenuncia)
router.put('/editar-denuncias/:id', authRequired, updateDenuncia)
router.post('/crear-denuncia/', authRequired, createDenuncia)
router.delete('/eliminar-denuncias/:id', authRequired,  deleteDenuncia)
router.put('/editar-denuncias:id', authRequired, updateDenuncia)
// Denuncias sin verificar
router.post('/crear-denuncia-sin-verificar/', authRequired, createDenunciaSinVerificar)


// Víctima
router.post('/crear-victima/', authRequired, createVictima)
router.get('/victima/:id', authRequired, getVictima)
router.put('/editar-victima/:id', authRequired, updateVictima)

// Victimario
router.get('/victimario/:id', authRequired, getVictimario)
router.post('/crear-victimario/', authRequired, createVictimario)
router.put('/editar-victimario/:id', authRequired, updateVictimario)




export default router