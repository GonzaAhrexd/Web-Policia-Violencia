import mongoose from 'mongoose'
require('dotenv').config() 
//Variables de entorno
const user = process.env.user
const pass = process.env.pass
const dbName = process.env.dbName
//URI de la base de datos
const uri = `mongodb+srv://${user}:${pass}@cluster0.uijihcv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
 
//Función que realiza la conexión  a la base de datos de MongoDB
export const connectDB:any = async () => {
    try {
        await mongoose.connect(uri)
        console.log('Base de datos conectada correctamente✅')
    } catch (error) {
        console.log('Error conectando a la base de datos.')
    }
}
