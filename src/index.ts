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
import crudRoutes from './routes/crud.routes' // Rutas del CRUD
// Crear aplicación de express
const app:express.Application = express()
// Conectar a la base de datos
connectDB().catch(err => console.error(`No se pudo conectar a MongoDB ❌: ${err}`))

// Puerto de la aplicación
const port = process.env.PORT || 4000

const corsOrigin:string | undefined = process.env.corsOrigin
// Permite a la aplicación recibir datos en formato JSON
app.use(cors({
    origin: corsOrigin,
    credentials: true
}))
// Middleware para ver las peticiones HTTP en la consola
app.use(morgan('dev'))
// Middleware para manejar cookies
app.use(express.json())
app.use(cookieParser())
// Rutas de la aplicación
app.use('/api',authRoutes) // Rutas de autenticación
app.use('/api',crudRoutes) // Rutas del CRUD
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port} ✅`)
  }).on('error', (err) => {
    console.error(`Eror al inciar el servidor: ${err}`)
  })