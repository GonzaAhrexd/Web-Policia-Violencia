import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken'
import { createPreventivo } from '../controllers/CRUD/crudPreventivo'
const router:Router = Router()

router.post('/crear-preventivo', authRequired, createPreventivo)



export default router


