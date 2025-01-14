// Importamos mongoose para la conexión a la base de datos
import mongoose from 'mongoose'
// Importamos dotenv para las variables de entorno
require('dotenv').config() 
//Variables de entorno
const user:string | undefined = process.env.user
const pass:string | undefined = process.env.pass
const dbName:string | undefined = process.env.dbName
//URI de la base de datos
let uri:string = "";

if(process.env.BD_mode == "cloud"){
     uri = `mongodb+srv://${user}:${pass}@cluster0.uijihcv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
}else {
     uri = 'mongodb://localhost:27017/PoliciaViolenciaGeneroCRUD'
    //  uri = 'mongodb://10.125.31.9:27017/PoliciaViolenciaGeneroCRUD'
}

//Función que realiza la conexión  a la base de datos de MongoDB
export const connectDB = async (): Promise<void> => {
    try {
        // Conecta a la base de datos con mongoose
        await mongoose.connect(uri)
        console.log('Base de datos conectada correctamente ✅')
    } catch (error: Error | unknown) {
        console.log('Error conectando a la base de datos.')
    }
}
