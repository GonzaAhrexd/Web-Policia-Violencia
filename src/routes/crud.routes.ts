import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import {validarDenuncia, getDenuncia, deleteDenunciaSinVerificar,  getMisDenuncias, createDenuncia, createDenunciaSinVerificar, getDenunciasSinVerificar, createExposicion, deleteDenuncia, updateDenuncia, getVictima, createVictima, getVictimario, createVictimario, updateVictimario, updateVictima } from '../controllers/crud.controller'

const router = Router();

/* DENUNCIAS
    Son todas las denuncias cargadas por personal del área de estadística, ya sea de manera manual o verificando
    lo cargado por unidades externas.
*/
router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo', authRequired, getMisDenuncias)
router.get('/mis-denuncias:id', authRequired, getDenuncia)
router.put('/editar-denuncias/:id', authRequired, updateDenuncia)
router.post('/crear-denuncia/', authRequired, createDenuncia)
router.delete('/eliminar-denuncias/:id', authRequired,  deleteDenuncia)
router.put('/editar-denuncias:id', authRequired, updateDenuncia)
/* DENUNCIAS SIN VERIFICAR
    Son las denuncias cargadas por agentes y personal externo al área de estadística, estos cuentan con menos
    datos a la hora de cargar y queda en estado de revisión, hasta que personal del área de estadística lo apruebe o
    lo rechace
*/
router.post('/crear-denuncia-sin-verificar/', authRequired, createDenunciaSinVerificar)
router.get('/denuncias-sin-verificar/', authRequired, getDenunciasSinVerificar)
router.delete('/eliminar-denuncias-sin-verificar/:id', authRequired,  deleteDenunciaSinVerificar)
router.put('/validar-denuncia/:id', authRequired,validarDenuncia )
/* EXPOSICIÓN
    Son exposiciones cargadas por agentes y personal externo. Es cuando una persona quiere exponer sobre un hecho
    sin realizar una denuncia como tal.
*/
router.post('/crear-exposicion/', authRequired, createExposicion)
// Víctima
router.post('/crear-victima/', authRequired, createVictima)
router.get('/victima/:id', authRequired, getVictima)
router.put('/editar-victima/:id', authRequired, updateVictima)
// Victimario
router.get('/victimario/:id', authRequired, getVictimario)
router.post('/crear-victimario/', authRequired, createVictimario)
router.put('/editar-victimario/:id', authRequired, updateVictimario)




export default router