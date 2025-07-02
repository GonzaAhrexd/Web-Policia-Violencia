/*  -----------------------------------------------------------------------------------------------------------------
    VICTIMARIO
    Son los datos del victimario de un hecho, estos datos son cargados por personal del área de estadística. 
    -----------------------------------------------------------------------------------------------------------------
*/    
import { Router } from 'express';
import { authCarga, authRequired } from '../middlewares/validateToken';
import { getVictimario, createVictimario, updateVictimario, buscarVictimario, buscarVictimariosArray, buscarVictimarioPorDni  } from '../controllers/CRUD/crudVictimarios'

const router:Router = Router();

// POST: Crear victimario
router.post('/', authCarga, createVictimario)
// POST: Victimarios con Array de Ids
router.post('/array', authCarga, buscarVictimariosArray);
// GET: Buscar victimario por id
router.get('/:id', authCarga, getVictimario)
// GET: Buscar victimario
router.get('/:victimario_id/:nombre_victimario/:apellido_victimario/:dni_victimario/:numero_de_expediente', authCarga, buscarVictimario)
// PUT: Editar victimario
router.put('/:id', authCarga, updateVictimario)

export default router;