import express from 'express'
import morgan from 'morgan'
import { connectDB } from './db'
import authRoutes from './routes/auth.routes'

// Crear aplicación de express
const app = express()

connectDB()
const port:number = 4000
app.listen(port)
console.log(`Server is running on port ${port} ✅`)
app.use(morgan('dev'))
app.use(express.json())
app.use('/api',authRoutes)
