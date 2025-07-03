// Importamos mongoose para la conexión a la base de datos
import mongoose from 'mongoose'
// Importamos dotenv para las variables de entorno
require('dotenv').config() 

//URL de la base de datos
const BD_URL:any = process.env.BD_URL

//Función que realiza la conexión  a la base de datos de MongoDB
 const connectDB = async (): Promise<void> => {
    try {
        // Conecta a la base de datos con mongoose
        await mongoose.connect(BD_URL)
        console.log('Base de datos conectada correctamente ✅')
    } catch (error: Error | unknown) {
        console.log('Error conectando a la base de datos.')
    }
}

export default connectDB
