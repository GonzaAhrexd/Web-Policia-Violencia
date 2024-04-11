import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
export function createAccessToken (payload){   

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, TOKEN_SECRET, 
            {
                expiresIn: 60 * 60 * 24
            
            }, (err, token) => {
            if(err) reject(err)
            resolve(token)
            })

    })
   
}