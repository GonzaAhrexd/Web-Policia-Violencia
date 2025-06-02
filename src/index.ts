// Librerías de Node.js a importar
import express from 'express' // Módulo para crear aplicaciones web con consultas y respuestas HTTP
import morgan from 'morgan' // Módula para ver las peticiones HTTP en la consola
import cookieParser from 'cookie-parser' // Módulo para manejar cookies
import cors from 'cors' // Módulo para habilitar CORS
import dotenv from 'dotenv' // Para leer las variables de entorno

// Configuraciones
import connectDB from './db' // Configuraciones de MongoDB para conectar a la base de datos
import corsOptions from './config/CorsOptions' // Configuraciones de CORS para la aplicación

// Importar las rutas de la aplicación
import authRoutes from './routes/auth.routes' // Rutas de autenticación
import erroresRoutes from './routes/errores.routes' // Rutas de error
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
import preventivoRoutes from './routes/preventivo.routes' // Rutas de preventivo
import radiogramaRoutes from './routes/radiograma.routes'
// DotEnv para leer las variables de entorno
dotenv.config()

// Crear aplicación de express
const app: express.Application = express()

// Conectar a la base de datos
connectDB().catch(err => console.error(`No se pudo conectar a MongoDB ❌: ${err}`))

// Habilitar CORS con las opciones definidas
app.use(cors(corsOptions))
// Middleware para ver las peticiones HTTP en la consola
app.use(morgan('dev'))
// Middleware para parsear el body de las peticiones
app.use(express.json())
// Middleware para manejar cookies
app.use(cookieParser())

// Rutas de la aplicación
app.use('/api', authRoutes) // Rutas de autenticación
app.use('/api/errores', erroresRoutes) // Rutas de errores
app.use('/api/usuarios', usuariosRoutes) // Rutas de usuarios
app.use('/api/victimas', victimasRoutes) // Rutas de víctimas
app.use('/api/victimarios', victimariosRoutes) // Rutas de victimarios
app.use('/api/terceros', tercerosRoutes) // Rutas de terceros
app.use('/api/denuncias', denunciasRoutes) // Rutas de denuncias
app.use('/api/exposicion', exposicionRoutes) // Rutas de exposiciones
app.use('/api/denuncias-sin-verificar', denunciasSinVerificarRoutes) // Rutas de denuncias sin verificar
app.use('/api/actividad-reciente', actividadRecienteRoutes) // Rutas de actividad reciente
app.use('/api/campos', camposRoutes) // Rutas de campos
app.use('/api/unidades', unidadesRoutes) // Rutas de unidades
app.use('/api/preventivo', preventivoRoutes) // Rutas de preventivo
app.use('/api/radiograma', radiogramaRoutes) // Rutas de radiograma

// Puerto de la aplicación
const port = process.env.PORT || 4000
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en puerto ${port} ✅`)
}).on('error', (err) => {
  console.error(`Eror al inciar el servidor: ${err}`)
})