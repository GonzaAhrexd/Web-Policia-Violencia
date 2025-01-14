/*  -----------------------------------------------------------------------------------------------------------------
    VICTIMARIO
    Son los datos del victimario de un hecho, estos datos son cargados por personal del área de estadística. 
    -----------------------------------------------------------------------------------------------------------------
*/    
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import { getVictimario, createVictimario, updateVictimario, buscarVictimario, buscarVictimarioPorDni  } from '../controllers/CRUD/crudVictimarios'

const router:Router = Router();

// Buscar victimario por id
router.get('/victimario/:id', authRequired, getVictimario)
// Crear victimario
router.post('/crear-victimario/', authRequired, createVictimario)
// Editar victimario
router.put('/editar-victimario/:id', authRequired, updateVictimario)
// Buscar victimario
router.get('/buscar-victimario/:victimario_id/:nombre_victimario/:apellido_victimario/:dni_victimario/:numero_de_expediente', authRequired, buscarVictimario)
// Victimario DNI
router.get('/victimario-dni/:dni_victimario', buscarVictimarioPorDni)
export default router;