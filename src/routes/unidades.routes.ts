import { Router } from 'express';
import { authAdmin, authRequired } from '../middlewares/validateToken';

import { createUnidad, getUnidades, updateUnidad, deleteUnidad, addMunicipio, updateMunicipio, addComisaria, updateComisaria, addCuadriculaFromComisaria, updateCuadriculaFromComisaria, deleteMunicipio, deleteComisaria, deleteCuadriculaFromComisaria, addCuadriculaFromMunicipio, updateCuadriculaFromMunicipio, deleteCuadriculaFromMunicipio } from '../controllers/CRUD/crudUnidades'

const router:Router = Router();

// GET: Mostrar todas las unidades
router.get('/unidad/', authRequired, getUnidades)
// POST: Agregar una unidad
router.post('/unidad/', authAdmin, createUnidad)
// PUT: Editar una unidad 
router.put('/unidad/:id', authAdmin, updateUnidad)
// DELETE: Eliminar una unidad
router.delete('/unidad/:id', authAdmin, deleteUnidad)

// MUNICIPIO
// PUT: Agregar municipio
router.put('/agregar-municipio/:id', authAdmin, addMunicipio)
// PUT: Editar un municipio
router.put('/editar-municipio/', authAdmin, updateMunicipio)
// PUT: Eliminar municipio
router.put('/eliminar-municipio/:nombre', authAdmin, deleteMunicipio)

// COMISARÍA
// PUT: Agregar una comisaría
router.put('/agregar-comisaria/', authAdmin, addComisaria)
// PUT: Editar una comisaría
router.put('/editar-comisaria/', authAdmin, updateComisaria)
// PUT: Eliminar una comisaría
router.put('/eliminar-comisaria/:nombre/:municipio', authAdmin, deleteComisaria)

// CUADRICULAS
// Cuadriculas comisaría
// PUT: Agregar cuadriculas
router.put('/agregar-cuadricula/', authAdmin, addCuadriculaFromComisaria)
// PUT: Editar cuadriculas
router.put('/editar-cuadricula-desde-comisaria/', authAdmin, updateCuadriculaFromComisaria)
// PUT: Eliminar cuadriculas
router.put('/eliminar-cuadricula/:cuadricula/:comisaria/:municipio', authAdmin, deleteCuadriculaFromComisaria)

// Cuadriculas municipio
// PUT: Agregar cuadriculas
router.put('/agregar-cuadricula-desde-municipio', authAdmin, addCuadriculaFromMunicipio)
// PUT: Editar cuadriculas
router.put('/editar-cuadricula-desde-municipio', authAdmin, updateCuadriculaFromMunicipio)
// PUT: Eliminar cuadriculas
router.put('/eliminar-cuadricula-desde-municipio/:cuadricula/:municipio', authAdmin, deleteCuadriculaFromMunicipio)
export default router