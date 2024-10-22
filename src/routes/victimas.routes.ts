/*  -----------------------------------------------------------------------------------------------------------------
    VICTIMA
    Son los datos de la víctima de un hecho, estos datos son cargados por personal del área de estadística. 
    -----------------------------------------------------------------------------------------------------------------
*/
// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authRequired } from '../middlewares/validateToken';

// VICTIMAS
import { getVictima, createVictima, updateVictima, buscarVictima } from '../controllers/CRUD/crudVictimas'

const router:Router = Router();

// Crear víctima
router.post('/crear-victima/', authRequired, createVictima)
// Buscar víctima
router.get('/victima/:id', authRequired, getVictima)
// Editar víctima
router.put('/editar-victima/:id', authRequired, updateVictima)
// Buscar víctima
router.get('/buscar-victima/:id_victima/:nombre_victima/:apellido_victima/:dni_victima/:numero_de_expediente', authRequired, buscarVictima)

export default router;