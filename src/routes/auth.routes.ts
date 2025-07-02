import { Router } from 'express'
// Controladores para la autenticación de usuario
import { loginRepoV1, logout, verifyToken, editUser, editUserImg, getUserImage, altaUsuario } from '../controllers/auth.controller'
// Middlewares para validar token
import { authRequired, authAdmin } from '../middlewares/validateToken'
// Middleware para validar esquemas
import { validateSchema } from '../middlewares/validator.middleware';
// Esquemas para validar datos
import { loginSchema } from '../schemas/auth.schema'
// Uso de Router de express
const router: Router = Router()
// POST: Inicio de sesión
router.post('/login', validateSchema(loginSchema), loginRepoV1)
// POST: Cierre de sesión
router.post('/logout', logout)
// POST: Editar imagen de usuario
router.post('/editar-imagen-usuario/:id', authRequired, editUserImg)
// POST: Dar de alta a un usuario
router.post('/alta-usuario', authAdmin, altaUsuario)
// GET: Verificación de token
router.get('/verify', verifyToken)
// GET: Obtener imagen de usuario
router.get('/usuario/:userId/image', authRequired, getUserImage);
// PUT: Editar usuario
router.put('/usuario/:id', authRequired, editUser)

export default router