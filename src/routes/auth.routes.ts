import { Router } from 'express'
// Controladores para la autenticación de usuario
import {login, register, logout, profile, verifyToken, editUser, editUserImg} from '../controllers/auth.controller'
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
router.post('/register', validateSchema(registerSchema), register) // Registro de usuario
router.post('/login', validateSchema(loginSchema), login) // Inicio de sesión
router.post('/logout', logout) // Cierre de sesión
router.get('/profile', authRequired, authAdmin , profile) // Perfil de usuario
router.get('/verify', verifyToken) // Verificación de token
router.put('/editar-usuario/:id', authRequired, editUser) // Editar usuario
router.post('/editar-imagen-usuario/:id', authRequired, editUserImg) // Editar imagen de usuario
router.get('/users/:userId/image', (req, res) => {
    const userId = req.params.userId;
    // Aquí iría tu lógica para encontrar la imagen basada en userId
    // Por ejemplo, buscar en una base de datos el nombre de archivo de la imagen del usuario
    const imagePath = path.resolve(__dirname, `../imagesFromDB/perfiles/${userId}.png`); // Asume que el nombre de la imagen es el ID del usuario
        console.log(imagePath)
        res.sendFile(imagePath, (err) => {
            if (err) {
              res.status(404).send('Imagen no encontrada');
            }
          });
  });
export default router