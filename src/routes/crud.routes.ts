// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authRequired } from '../middlewares/validateToken';

// DENUNCIAS
import { getDenuncias,  getMisDenuncias, createDenuncia, deleteDenuncia, updateDenuncia, getDenunciasId, getCantidadDenuncias } from '../controllers/CRUD/crudDenuncias'
// EXPOSICIÓN
import { createExposicion, buscarExposicion, deleteExposicion } from '../controllers/CRUD/crudExposicion'
 // DENUNCIAS SIN VERIFICAR
import { createDenunciaSinVerificar, validarDenuncia, getDenunciasSinVerificar,  deleteDenunciaSinVerificar, listarMisDenunciasSinVerificar  } from '../controllers/CRUD/crudDenunciasSinVerificar' 
// VICTIMAS
import { getVictima, createVictima, updateVictima, buscarVictima } from '../controllers/CRUD/crudVictimas'
// VICTIMARIOS
import { getVictimario, createVictimario, updateVictimario, buscarVictimario } from '../controllers/CRUD/crudVictimarios'
// TERCEROS
import { createTercero, getTercero, updateTercero, buscarTercero } from '../controllers/CRUD/crudTerceros'

// REPORTE ERRORES
import { createReporteErrores } from '../controllers/CRUD/crudReportesErrores'

// Llamamos a router para definir las rutas del api
const router:Router = Router();

/*  -----------------------------------------------------------------------------------------------------------------
    DENUNCIAS: 
    Son todas las denuncias cargadas por personal del área de estadística, ya sea de manera manual o verificando
    lo cargado por unidades externas. 
    -----------------------------------------------------------------------------------------------------------------
*/
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

/*  -----------------------------------------------------------------------------------------------------------------
    DENUNCIAS SIN VERIFICAR
    Son las denuncias cargadas por agentes y personal externo al área de estadística, estos cuentan con menos
    datos a la hora de cargar y queda en estado de revisión, hasta que personal del área de estadística lo apruebe o
    lo rechace 
    -----------------------------------------------------------------------------------------------------------------    
*/
// Crear denuncia sin verificar
router.post('/crear-denuncia-sin-verificar/', authRequired, createDenunciaSinVerificar)
// Buscar denuncias sin verificar
router.get('/denuncias-sin-verificar/', authRequired, getDenunciasSinVerificar)
// Eliminar denuncia sin verificar por id
router.delete('/eliminar-denuncias-sin-verificar/:id', authRequired,  deleteDenunciaSinVerificar)
// Validar denuncia sin verificar
router.put('/validar-denuncia/:id', authRequired,validarDenuncia )
// Buscar denuncias sin verificar por el id del usuario
router.get('/mis-denuncias-sin-verificar/:desde/:hasta/:numero_de_expediente/', authRequired, listarMisDenunciasSinVerificar)
/*  -----------------------------------------------------------------------------------------------------------------
    EXPOSICIÓN
    Son exposiciones cargadas por agentes y personal externo. Es cuando una persona quiere exponer sobre un hecho
    sin realizar una denuncia como tal. 
    -----------------------------------------------------------------------------------------------------------------
*/
// Crear exposición
router.post('/crear-exposicion/', authRequired, createExposicion)
router.get('/buscar-exposicion/:desde/:hasta/:id_exposicion/:nombre_victima/:apellido_victima/:dni_victima/', authRequired, buscarExposicion)
router.delete('/eliminar-exposicion/:id', authRequired,  deleteExposicion)
/*  -----------------------------------------------------------------------------------------------------------------
    VICTIMA
    Son los datos de la víctima de un hecho, estos datos son cargados por personal del área de estadística. 
    -----------------------------------------------------------------------------------------------------------------
*/
// Crear víctima
router.post('/crear-victima/', authRequired, createVictima)
// Buscar víctima
router.get('/victima/:id', authRequired, getVictima)
// Editar víctima
router.put('/editar-victima/:id', authRequired, updateVictima)
// Buscar víctima
router.get('/buscar-victima/:id_victima/:nombre_victima/:apellido_victima/:dni_victima/:numero_de_expediente', authRequired, buscarVictima)
/*  -----------------------------------------------------------------------------------------------------------------
    VICTIMARIO
    Son los datos del victimario de un hecho, estos datos son cargados por personal del área de estadística. 
    -----------------------------------------------------------------------------------------------------------------
*/    
// Buscar victimario por id
router.get('/victimario/:id', authRequired, getVictimario)
// Crear victimario
router.post('/crear-victimario/', authRequired, createVictimario)
// Editar victimario
router.put('/editar-victimario/:id', authRequired, updateVictimario)
// Buscar victimario
router.get('/buscar-victimario/:victimario_id/:nombre_victimario/:apellido_victimario/:dni_victimario/:numero_de_expediente', authRequired, buscarVictimario)
/*  ----------------------------------------------------------------------------------------------------------------- 
    TERCEROS 
    Son los datos de los terceros que realicen denuncias 
    -----------------------------------------------------------------------------------------------------------------
*/
// Buscar tercero por id
router.get('/tercero/:id', authRequired, getTercero)
// Crear tercero
router.post('/crear-tercero/', authRequired, createTercero)
// Editar tercero
router.put('/editar-tercero/:id', authRequired, updateTercero)
// Buscar tercero
router.get('/buscar-tercero/:id_tercero/:nombre_tercero/:apellido_tercero/:dni_tercero/:numero_de_expediente', authRequired, buscarTercero)


// Reporte de erores
router.post('/reporte-errores/', authRequired, createReporteErrores)
export default router