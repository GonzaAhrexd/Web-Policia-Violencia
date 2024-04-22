import { Router } from 'express'
import {login, register, logout, profile, verifyToken, editUser} from '../controllers/auth.controller'
import { authRequired, authAdmin } from '../middlewares/validateToken'
import { validateSchema } from '../middlewares/validator.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema'

const router:Router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, authAdmin , profile)
router.get('/verify', verifyToken)
router.put('/editar-usuario/:id', authRequired, editUser)

export default router