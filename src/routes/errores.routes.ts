// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authRequired } from '../middlewares/validateToken';
 
// REPORTE ERRORES
import { createReporteErrores } from '../controllers/CRUD/crudReportesErrores'
 
// Llamamos a router para definir las rutas del api
const router:Router = Router();


// POST: Reporte de erores
router.post('/', authRequired, createReporteErrores)

// GET: Endpoint de prueba
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Pong!' });
}
)


export default router