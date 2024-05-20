import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken';
import { generateWord } from '../controllers/documents.controller'
const router = Router();

// Denuncias
router.post('/crear-documento', authRequired, generateWord )

export default router;  