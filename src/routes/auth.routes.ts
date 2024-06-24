import { Router } from 'express'
// Controladores para la autenticación de usuario
import {login, register, logout, profile, verifyToken, editUser} from '../controllers/auth.controller'
// Middlewares para validar token
import { authRequired, authAdmin } from '../middlewares/validateToken'
// Middleware para validar esquemas
import { validateSchema } from '../middlewares/validator.middleware';
// Esquemas para validar datos
import { registerSchema, loginSchema } from '../schemas/auth.schema'
// Uso de Router de express
const router:Router = Router()
// Rutas para autenticación de usuario
router.post('/register', validateSchema(registerSchema), register) // Registro de usuario
router.post('/login', validateSchema(loginSchema), login) // Inicio de sesión
router.post('/logout', logout) // Cierre de sesión
router.get('/profile', authRequired, authAdmin , profile) // Perfil de usuario
router.get('/verify', verifyToken) // Verificación de token
router.put('/editar-usuario/:id', authRequired, editUser) // Editar usuario

export default router