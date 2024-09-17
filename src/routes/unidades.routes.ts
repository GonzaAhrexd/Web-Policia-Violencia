import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';

import { createUnidad, getUnidades, updateUnidad, deleteUnidad } from '../controllers/CRUD/crudUnidades'

const router:Router = Router();

// Mostrar todas las unidades
router.get('/mostrar-unidades/', authRequired, getUnidades)

// Agregar una unidad
router.post('/agregar-unidad/', authRequired, createUnidad)

// Eliminar una unidad
router.delete('/eliminar-unidad/:id', authRequired, deleteUnidad)

// Editar una unidad 
router.put('/editar-unidad/:id', authRequired, updateUnidad)

export default router