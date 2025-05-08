// Librerías de Node.js a importar
import express from 'express' // Módulo para crear aplicaciones web con consultas y respuestas HTTP
import morgan from 'morgan' // Módula para ver las peticiones HTTP en la consola
import cookieParser from 'cookie-parser' // Módulo para manejar cookies
import cors from 'cors' // Módulo para habilitar CORS
// Para leer las variables de entorno
import dotenv from 'dotenv'
dotenv.config()
// Archivos locales a importar
import { connectDB } from './db' // Configuraciones de MongoDB para conectar a la base de datos
import authRoutes from './routes/auth.routes' // Rutas de autenticación
import erroresRoutes from './routes/errores.routes' // Rutas del CRUD
import usuariosRoutes from './routes/usuarios.routes' // Rutas de usuarios
import victimasRoutes from './routes/victimas.routes' // Rutas de víctimas
import victimariosRoutes from './routes/victimarios.routes' // Rutas de victimarios
import tercerosRoutes from './routes/terceros.routes' // Rutas de terceros
import denunciasRoutes from './routes/denuncias.routes' // Rutas de denuncias
import exposicionRoutes from './routes/exposicion.routes' // Rutas de exposiciones
import denunciasSinVerificarRoutes from './routes/denuncias-sin-verificar.routes' // Rutas de denuncias sin verificar
import actividadRecienteRoutes from './routes/actividadReciente.routes' // Rutas de actividad reciente
import camposRoutes from './routes/campos.routes' // Rutas de campos
import unidadesRoutes from './routes/unidades.routes' // Rutas de unidades
import preventivoRoutes from './routes/preventivo.routes'

// Crear aplicación de express
const app:express.Application = express()
// Conectar a la base de datos
connectDB().catch(err => console.error(`No se pudo conectar a MongoDB ❌: ${err}`))

// Puerto de la aplicación
const port = process.env.PORT || 4000
const allowedOrigins = [
  process.env.corsOrigin, // Origen desde la variable de entorno
  'http://localhost:4200', // Origen adicional
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        // Si el origen está en la lista o es una solicitud sin origen (como en Postman)
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por CORS')); // Bloquear el acceso
      }
    },
    credentials: true, // Permitir cookies y encabezados relacionados con credenciales
  })
);

// Middleware para ver las peticiones HTTP en la consola
app.use(morgan('dev'))
// Middleware para manejar cookies
app.use(express.json())
app.use(cookieParser())

// Rutas de la aplicación
app.use('/api',authRoutes) // Rutas de autenticación
app.use('/api', erroresRoutes) // Rutas de errores
app.use('/api', usuariosRoutes) // Rutas de usuarios
app.use('/api', victimasRoutes) // Rutas de víctimas
app.use('/api', victimariosRoutes) // Rutas de victimarios
app.use('/api', denunciasRoutes) // Rutas de denuncias
app.use('/api', exposicionRoutes) // Rutas de exposiciones
app.use('/api', denunciasSinVerificarRoutes) // Rutas de denuncias sin verificar
app.use('/api', actividadRecienteRoutes) // Rutas de actividad reciente
app.use('/api', camposRoutes) // Rutas de campos
app.use('/api', unidadesRoutes) // Rutas de unidades
app.use('/api', tercerosRoutes) // Rutas de terceros
app.use('/api', preventivoRoutes)
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port} ✅`)
  }).on('error', (err) => {
    console.error(`Eror al inciar el servidor: ${err}`)
  })