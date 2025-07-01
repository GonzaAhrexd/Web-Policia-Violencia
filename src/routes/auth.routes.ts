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
// Inicio de sesión
router.post('/login', validateSchema(loginSchema), loginRepoV1)
// Cierre de sesión
router.post('/logout', logout)
// Verificación de token
router.get('/verify', verifyToken)
// Editar usuario
router.put('/editar-usuario/:id', authRequired, editUser)
// Editar imagen de usuario
router.post('/editar-imagen-usuario/:id', authRequired, editUserImg)
// Obtener imagen de usuario
router.get('/users/:userId/image', authRequired, getUserImage);
// Dar de alta a un usuario
router.post('/alta-usuario', authAdmin, altaUsuario)

export default router