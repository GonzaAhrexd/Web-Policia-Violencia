import { Router } from 'express'
// Controladores para la autenticación de usuario
import {login, register, logout, profile, verifyToken, editUser, editUserImg, loginRepoV1, registroDNIV1, altaUsuario} from '../controllers/auth.controller'
// Middlewares para validar token
import { authRequired, authAdmin } from '../middlewares/validateToken'
// Middleware para validar esquemas
import { validateSchema } from '../middlewares/validator.middleware';
// Esquemas para validar datos
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import path from 'path';
// Uso de Router de express
const router:Router = Router()
// Rutas para autenticación de usuario

// Registro de usuario
router.post('/register', validateSchema(registerSchema), register) 
// Inicio de sesión
router.post('/login', validateSchema(loginSchema), loginRepoV1) 
// Cierre de sesión
router.post('/logout', logout) 
// Perfil de usuario
router.get('/profile', authRequired, authAdmin , profile) 
// Verificación de token
router.get('/verify', verifyToken)
// Editar usuario
router.put('/editar-usuario/:id', authRequired, editUser) 
// Editar imagen de usuario
router.post('/editar-imagen-usuario/:id', authRequired, editUserImg) 

router.get('/users/:userId/image', (req, res) => {
    const userId = req.params.userId;
    // Aquí iría tu lógica para encontrar la imagen basada en userId
    // Por ejemplo, buscar en una base de datos el nombre de archivo de la imagen del usuario
    const imagePath = path.resolve(__dirname, `../imagesFromDB/perfiles/${userId}.png`); // Asume que el nombre de la imagen es el ID del usuario
        res.sendFile(imagePath, (err) => {
            if (err) {
              res.status(404).send('Imagen no encontrada');
            }
          });
  });
router.post('/login-repo', loginRepoV1)
router.post('/buscar-dni', registroDNIV1)
router.post('/alta-usuario', authAdmin, altaUsuario)

export default router