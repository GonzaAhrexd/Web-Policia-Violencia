// Importar jwt desde la librería jsonwebtoken
import jwt from 'jsonwebtoken'
// Importar la clave secreta desde el archivo config.ts
import { TOKEN_SECRET }from '../config'
// Importar el modelo de usuarios
import usuarios from '../models/usuarios'
// Crear una función que valide el token
export const authRequired = (req,res,next) => {
    // Extraer el token de las cookies
    const { token } = req.cookies

    // Si no hay token, devolver un mensaje de error
    if (!token) return res.status(401).json({message: "No token, authorization invalid"})
    
    // Verificar el token con la clave secreta
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Invalid token"})
        req.user = user
        next()
        })    
}

// Crear una función que valide si el usuario es admin
export const authAdmin = async (req,res,next) => {
    authRequired(req,res, async () => {
        console.log(req.user)
        try{
            //Busca al usuario en la BD
            const usuario = await usuarios.findById(req.user.id)
            
            //Verifica si el usuario es admin
            const isAdmin = usuario?.rol == "admin";
            const isAdminDoubleCheck = usuario?.admin;
            
           //Si no es admin, devuelve el siguiente mensaje
           if(!isAdmin && !isAdminDoubleCheck) return res.status(403).json({message: "You are not an admin"})
            
            //Si lo es, continúa a la página solicitada
            next()
        }catch(err){
            console.log(err)
        }
    })
}

// Crear una función que valide si el usuario es carga
export const authCarga = async (req,res,next) => {
    authRequired(req,res, async () => {
        console.log(req.user)
        try{
            //Buscamos al usuario en la Base de Datos
            const usuario = await usuarios.findById(req.user.id)            
            //Verificamos si tiene el rol de carga
            const isCarga = usuario?.rol == "carga";
            //Si no lo tiene, devuelve el siguiente mensaje
            if(!isCarga) return res.status(403).json({message: "You don't have permission to do this action"})
            // Si lo tiene, continúa a la página solicitada
            next()
        }catch(err){
            console.log(err)
        }
    })
}