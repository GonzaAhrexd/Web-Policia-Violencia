import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { connectDB } from './db'
import authRoutes from './routes/auth.routes'
import crudRoutes from './routes/crud.routes'

// Crear aplicación de express
const app = express()

connectDB()
const port:number = 4000
app.listen(port)
console.log(`Server is running on port ${port} ✅`)
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api',authRoutes)
app.use('/api',crudRoutes)
