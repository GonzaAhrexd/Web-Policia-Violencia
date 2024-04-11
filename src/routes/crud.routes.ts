import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import {getDenuncia, getDenuncias, createDenuncia, deleteDenuncia, updateDenuncia } from '../controllers/crud.controller'



const router = Router();

router.get('/mis-denuncias', authRequired, getDenuncias)
router.get('/mis-denuncias:id', authRequired, getDenuncia)

router.post('/crear-denuncia/:id', authRequired, createDenuncia)

router.delete('/eliminar-denuncias/id', authRequired,  deleteDenuncia)

router.put('/editar-denuncias/id', authRequired, updateDenuncia)




export default router