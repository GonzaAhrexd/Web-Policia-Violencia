// Exporta un middleware que valida el body de una petición POST o PUT con un schema.
export const validateSchema = ( schema ) => (req, res, next) =>{
    try{
        schema.parse(req.body)
        next()
    }catch(error: any){
        return res
        .status(400)
        .json({ error: error.errors.map((error) => error.message )})
    }
}
