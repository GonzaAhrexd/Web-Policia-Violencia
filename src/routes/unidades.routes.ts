import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';

import { createUnidad, getUnidades, updateUnidad, deleteUnidad, addMunicipio, updateMunicipio, addComisaria, updateComisaria, addCuadriculaFromComisaria, updateCuadriculaFromComisaria, deleteMunicipio, deleteComisaria, deleteCuadriculaFromComisaria } from '../controllers/CRUD/crudUnidades'

const router:Router = Router();

// Mostrar todas las unidades
router.get('/mostrar-unidades/', authRequired, getUnidades)

// Agregar una unidad
router.post('/agregar-unidad/', authRequired, createUnidad)
// Eliminar una unidad
router.delete('/eliminar-unidad/:id', authRequired, deleteUnidad)
// Editar una unidad 
router.put('/editar-unidad/:id', authRequired, updateUnidad)

// MUNICIPIO
// Agregar municipio
router.put('/agregar-municipio/:id', authRequired, addMunicipio)
// Editar un municipio
router.put('/editar-municipio/', authRequired, updateMunicipio)
// Eliminar municipio
router.put('/eliminar-municipio/:nombre', authRequired, deleteMunicipio)

// COMISARÍA
// Agregar una comisaría
router.put('/agregar-comisaria/', authRequired, addComisaria)
// Editar una comisaría
router.put('/editar-comisaria/', authRequired, updateComisaria)
// Eliminar una comisaría
router.put('/eliminar-comisaria/:nombre/:municipio', authRequired, deleteComisaria)

// CUADRICULAS
// Agregar cuadriculas
router.put('/agregar-cuadricula/', authRequired, addCuadriculaFromComisaria)
// Editar cuadriculas
router.put('/editar-cuadricula-desde-comisaria/', authRequired, updateCuadriculaFromComisaria)
// Eliminar cuadriculas
router.put('/eliminar-cuadricula/:cuadricula/:comisaria/:municipio', authRequired, deleteCuadriculaFromComisaria)
export default router