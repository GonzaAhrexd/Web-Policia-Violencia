import mongoose from 'mongoose'
require('dotenv').config() //Variables de entorno

const user = process.env.user
const pass = process.env.pass
const dbName = process.env.dbName

const uri = `mongodb+srv://${user}:${pass}@cluster0.uijihcv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
 

export const connectDB:any = async () => {
    console.log(uri)
    try {
        await mongoose.connect(uri)
        console.log('Base de datos conectada correctamente.')
    } catch (error) {
        console.log('Error conectando a la base de datos.')
    }
}
