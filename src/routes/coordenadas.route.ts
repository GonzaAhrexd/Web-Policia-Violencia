/* 
    Función para obtener las coordenadas de una dirección a través de la API de Geocoding.
*/

// Importamos Router desde express
import { Router } from 'express';
// Importamos el middleware de autenticación
import { authCarga } from '../middlewares/validateToken';
// Importamos axios para realizar peticiones HTTP
import { getCoords } from '../controllers/coordenadas.controller';

const router: Router = Router();

// GET: Coordenadas de una dirección
router.get('/:direccion', authCarga, getCoords);

export default router;