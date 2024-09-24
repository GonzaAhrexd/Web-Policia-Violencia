import { Router } from 'express';
import { authAdmin, authRequired } from '../middlewares/validateToken';

import { createUnidad, getUnidades, updateUnidad, deleteUnidad, addMunicipio, updateMunicipio, addComisaria, updateComisaria, addCuadriculaFromComisaria, updateCuadriculaFromComisaria, deleteMunicipio, deleteComisaria, deleteCuadriculaFromComisaria, addCuadriculaFromMunicipio, updateCuadriculaFromMunicipio, deleteCuadriculaFromMunicipio } from '../controllers/CRUD/crudUnidades'

const router:Router = Router();

// Mostrar todas las unidades
router.get('/mostrar-unidades/', authAdmin, getUnidades)

// Agregar una unidad
router.post('/agregar-unidad/', authAdmin, createUnidad)
// Eliminar una unidad
router.delete('/eliminar-unidad/:id', authAdmin, deleteUnidad)
// Editar una unidad 
router.put('/editar-unidad/:id', authAdmin, updateUnidad)

// MUNICIPIO
// Agregar municipio
router.put('/agregar-municipio/:id', authAdmin, addMunicipio)
// Editar un municipio
router.put('/editar-municipio/', authAdmin, updateMunicipio)
// Eliminar municipio
router.put('/eliminar-municipio/:nombre', authAdmin, deleteMunicipio)

// COMISARÍA
// Agregar una comisaría
router.put('/agregar-comisaria/', authAdmin, addComisaria)
// Editar una comisaría
router.put('/editar-comisaria/', authAdmin, updateComisaria)
// Eliminar una comisaría
router.put('/eliminar-comisaria/:nombre/:municipio', authAdmin, deleteComisaria)

// CUADRICULAS
// Agregar cuadriculas
router.put('/agregar-cuadricula/', authAdmin, addCuadriculaFromComisaria)
// Editar cuadriculas
router.put('/editar-cuadricula-desde-comisaria/', authAdmin, updateCuadriculaFromComisaria)
// Eliminar cuadriculas
router.put('/eliminar-cuadricula/:cuadricula/:comisaria/:municipio', authAdmin, deleteCuadriculaFromComisaria)


// Cuadriculas comisaría
router.put('/agregar-cuadricula-desde-municipio', authAdmin, addCuadriculaFromMunicipio)
router.put('/editar-cuadricula-desde-municipio', authAdmin, updateCuadriculaFromMunicipio)
router.put('/eliminar-cuadricula-desde-municipio/:cuadricula/:municipio', authAdmin, deleteCuadriculaFromMunicipio)
export default router