import express from 'express'
import morgan from 'morgan'
import { connectDB } from './db'
import authRoutes from './routes/auth.routes'

const app = express()


connectDB()
app.listen(4000)
console.log("Server is running on port 4000")
app.use(morgan('dev'))
app.use(express.json())
app.use('/api',authRoutes)
