import jwt from 'jsonwebtoken'
import { TOKEN_SECRET }from '../config'
import usuarios from '../models/usuarios'
export const authRequired = (req,res,next) => {

   
    const { token } = req.cookies

    if (!token) return res.status(401).json({message: "No token, authorization invalid"})
    
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Invalid token"})
        req.user = user
        next()
        })
     
}

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