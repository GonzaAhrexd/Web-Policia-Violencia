// Librerías de Node.js a importar
import express from 'express' // Módulo para crear aplicaciones web con consultas y respuestas HTTP
import morgan from 'morgan' // Módula para ver las peticiones HTTP en la consola
import cookieParser from 'cookie-parser' // Módulo para manejar cookies
import cors from 'cors' // Módulo para habilitar CORS

// Archivos locales a importar
import { connectDB } from './db' // Configuraciones de MongoDB para conectar a la base de datos
import authRoutes from './routes/auth.routes' // Rutas de autenticación
import crudRoutes from './routes/crud.routes' // Rutas del CRUD

// Crear aplicación de express
const app:express.Application = express()
// Conectar a la base de datos
connectDB()
// Puerto de la aplicación
const port:number = 4000
// Iniciar el servidor
app.listen(port)
console.log(`Server is running on port ${port} ✅`)
// Permite a la aplicación recibir datos en formato JSON
app.use(cors({
    origin: 'http://localhost:5173',
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
