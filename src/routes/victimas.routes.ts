/*  -----------------------------------------------------------------------------------------------------------------
    VICTIMA
    Son los datos de la víctima de un hecho, estos datos son cargados por personal del área de estadística. 
    -----------------------------------------------------------------------------------------------------------------
*/

// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authCarga } from '../middlewares/validateToken';

// VICTIMAS
import { getVictima, createVictima, updateVictima, buscarVictima, getVictimasWithArray } from '../controllers/CRUD/crudVictimas'


const router:Router = Router();
// POST: Crear víctima
router.post('/', authCarga, createVictima)
// POST: Victimas con Array de Ids
router.post('/array', authCarga, getVictimasWithArray);
// GET: Buscar víctima
router.get('/:id', authCarga, getVictima)
// GET: Buscar víctima
router.get('/:id_victima/:nombre_victima/:apellido_victima/:dni_victima/:numero_de_expediente', authCarga, buscarVictima)
// PUT: Editar víctima
router.put('/:id', authCarga, updateVictima)


export default router;