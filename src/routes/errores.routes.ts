// Importamos Router desde express
import { Router } from 'express';
// Importamos los middlewares que vamos a utilizar
import { authRequired } from '../middlewares/validateToken';
 
// REPORTE ERRORES
import { createReporteErrores } from '../controllers/CRUD/crudReportesErrores'
 
// Llamamos a router para definir las rutas del api
const router:Router = Router();


// Reporte de erores
router.post('/reporte-errores/', authRequired, createReporteErrores)
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Pong!' });
}
)


export default router