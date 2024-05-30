import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import { 
        // DENUNCIAS
        getDenuncias,  getMisDenuncias, createDenuncia, deleteDenuncia, updateDenuncia, getDenunciasId,
       // EXPOSICIÓN
        createExposicion,    
        } from '../controllers/crud.controller'
 // DENUNCIAS SIN VERIFICAR
import { createDenunciaSinVerificar, validarDenuncia, getDenunciasSinVerificar,  deleteDenunciaSinVerificar } from '../controllers/CRUD/crudDenunciasSinVerificar' 
// VICTIMAS
import { getVictima, createVictima, updateVictima, buscarVictima } from '../controllers/CRUD/crudVictimas'
// VICTIMARIOS
import { getVictimario, createVictimario, updateVictimario, buscarVictimario } from '../controllers/CRUD/crudVictimarios'
const router = Router();

/*  DENUNCIAS
    Son todas las denuncias cargadas por personal del área de estadística, ya sea de manera manual o verificando
    lo cargado por unidades externas.
*/
router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo', authRequired, getMisDenuncias)
router.get('/buscar-denuncias/:desde/:hasta/:numero_de_expediente/:is_expediente_completo/:division/:municipio/:comisaria', authRequired, getDenuncias)
router.put('/editar-denuncias/:id', authRequired, updateDenuncia)
router.post('/crear-denuncia/', authRequired, createDenuncia)
router.delete('/eliminar-denuncias/:id', authRequired,  deleteDenuncia)
router.put('/editar-denuncias:id', authRequired, updateDenuncia)
router.get('/buscar-denuncias-id/:id', authRequired, getDenunciasId)
/*  DENUNCIAS SIN VERIFICAR
    Son las denuncias cargadas por agentes y personal externo al área de estadística, estos cuentan con menos
    datos a la hora de cargar y queda en estado de revisión, hasta que personal del área de estadística lo apruebe o
    lo rechace
*/
router.post('/crear-denuncia-sin-verificar/', authRequired, createDenunciaSinVerificar)
router.get('/denuncias-sin-verificar/', authRequired, getDenunciasSinVerificar)
router.delete('/eliminar-denuncias-sin-verificar/:id', authRequired,  deleteDenunciaSinVerificar)
router.put('/validar-denuncia/:id', authRequired,validarDenuncia )
/*  EXPOSICIÓN
    Son exposiciones cargadas por agentes y personal externo. Es cuando una persona quiere exponer sobre un hecho
    sin realizar una denuncia como tal.
*/
router.post('/crear-exposicion/', authRequired, createExposicion)
/*  VICTIMA
    Son los datos de la víctima de un hecho, estos datos son cargados por personal del área de estadística.
*/
router.post('/crear-victima/', authRequired, createVictima)
router.get('/victima/:id', authRequired, getVictima)
router.put('/editar-victima/:id', authRequired, updateVictima)
router.get('/buscar-victima/:nombre_victima/:apellido_victima/:dni_victima/:numero_de_expediente', authRequired, buscarVictima)

/*  VICTIMARIO
    Son los datos del victimario de un hecho, estos datos son cargados por personal del área de estadística.
*/
router.get('/victimario/:id', authRequired, getVictimario)
router.post('/crear-victimario/', authRequired, createVictimario)
router.put('/editar-victimario/:id', authRequired, updateVictimario)
router.get('/buscar-victimario/:nombre_victimario/:apellido_victimario/:dni_victimario/:numero_de_expediente', authRequired, buscarVictimario)

export default router