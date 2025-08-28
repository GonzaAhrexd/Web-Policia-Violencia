
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
import { authCarga, authRequired } from '../middlewares/validateToken';
// Importamos los controladores que vamos a utilizar
import { createDenunciaSinVerificar, validarDenuncia, getDenunciasSinVerificar, getDenunciasSinVerificarId,  deleteDenunciaSinVerificar, listarMisDenunciasSinVerificar, getDenunciasSinVerificarAvanzado, getDenunciasSinVerificarByIdArray, agregarAmpliacionDenuncia  } from '../controllers/CRUD/crudDenunciasSinVerificar' 

// Llamamos a router para definir las rutas del api
const router:Router = Router();

// POST: Crear denuncia sin verificar
router.post('/', authRequired, createDenunciaSinVerificar)
// GET: Buscar denuncias sin verificar
router.get('/', authRequired, getDenunciasSinVerificar)
// GET: Buscar denuncias sin verificar (desde, hasta, id, expediente, division, municipio, comisaria, mostrar_ampliaciones)
router.get('/filtros', authRequired, getDenunciasSinVerificarAvanzado)
// GET: Buscar denuncias sin verificar por id (id)
router.get('/getId/:id', authRequired, getDenunciasSinVerificarId)
router.get('/:desde/:hasta/:id/:expediente/:division/:municipio/:comisaria/:mostrar_ampliaciones', authRequired, getDenunciasSinVerificarAvanzado)
// GET: Buscar mis denuncias sin verificar (desde, hasta, numero_de_expediente)
router.get('/mis-denuncias/:desde/:hasta/:numero_de_expediente/', authRequired, listarMisDenunciasSinVerificar)
// AMPLIACIONES
// GET: Buscar ampliaciones de denuncia por id (id)
router.get('/ampliaciones/:id', authRequired, getDenunciasSinVerificarByIdArray)
// PUT: Agregar ampliación a denuncia sin verificar (id, idAmpliacion)
router.put('/ampliacion/:id/:idAmpliacion', authRequired, agregarAmpliacionDenuncia)
// PUT: Validar denuncia sin verificar (id)
router.put('/:id', authCarga,validarDenuncia )
// DELETE: Eliminar denuncia sin verificar por id (id)
router.delete('/:id', authRequired,  deleteDenunciaSinVerificar)

export default router