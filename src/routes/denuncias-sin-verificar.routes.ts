
/*  -----------------------------------------------------------------------------------------------------------------
    DENUNCIAS SIN VERIFICAR
    Son las denuncias cargadas por agentes y personal externo al área de estadística, estos cuentan con menos
    datos a la hora de cargar y queda en estado de revisión, hasta que personal del área de estadística lo apruebe o
    lo rechace 
    -----------------------------------------------------------------------------------------------------------------    
*/
// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authRequired } from '../middlewares/validateToken';
// Importamos los controladores que vamos a utilizar
import { createDenunciaSinVerificar, validarDenuncia, getDenunciasSinVerificar, getDenunciasSinVerificarId,  deleteDenunciaSinVerificar, listarMisDenunciasSinVerificar, getDenunciasSinVerificarAvanzado, getDenunciasSinVerificarByIdArray, agregarAmpliacionDenuncia  } from '../controllers/CRUD/crudDenunciasSinVerificar' 

// Llamamos a router para definir las rutas del api
const router:Router = Router();

// Crear denuncia sin verificar
router.post('/crear-denuncia-sin-verificar/', authRequired, createDenunciaSinVerificar)
// Buscar denuncias sin verificar
router.get('/denuncias-sin-verificar/', authRequired, getDenunciasSinVerificar)
router.get('/buscar-denuncias-sin-verificar-por-id/:id', authRequired, getDenunciasSinVerificarId)
// Buscar denuncias sin verificar 
router.get('/buscar-denuncias-sin-verificar/:desde/:hasta/:id/:expediente/:division/:municipio/:comisaria/:mostrar_ampliaciones', authRequired, getDenunciasSinVerificarAvanzado)
// Eliminar denuncia sin verificar por id
router.delete('/eliminar-denuncias-sin-verificar/:id', authRequired,  deleteDenunciaSinVerificar)
// Validar denuncia sin verificar
router.put('/validar-denuncia/:id', authRequired,validarDenuncia )
// Buscar denuncias sin verificar por el id del usuario
router.get('/mis-denuncias-sin-verificar/:desde/:hasta/:numero_de_expediente/', authRequired, listarMisDenunciasSinVerificar)
router.get('/buscar-ampliaciones/:id', authRequired, getDenunciasSinVerificarByIdArray)
router.put('/agregar-ampliacion/:id/:idAmpliacion', authRequired, agregarAmpliacionDenuncia)
export default router