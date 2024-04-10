import usuarios from '../models/usuarios'

//Registro de usuarios
export const register = async (req, res) => {
    // Obtención de los datos del formulario de registro
    try {
        const { nombre, apellido, telefono, pass, admin, nombre_de_usuario, credencial, unidad, jerarquia, plaza, zona, rol } = req.body
         //Validación en mongodb si ya existe el usuario
        let userExistente = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario }) 
        // Creación de un nuevo usuario como objeto
        if (req.body.nombre_de_usuario && !userExistente) {
            const newUser = new usuarios({
                nombre,
                apellido,
                telefono,
                pass,
                admin,
                nombre_de_usuario,
                credencial,
                unidad,
                jerarquia,
                plaza,
                zona,
            })
            // Guardar el usuario en la base de datos
            newUser.save()
        } else {
            // Error si el usuario ya existe  o no se ingresaron datos
            throw new Error('Usuario ya existe o no se ingresaron datos.')
        }
        // Respuesta de que el usuario fue registrado
        res.send('registered')
    } catch (error) {
        // Respuesta de error
        console.log(error)
        res.send('error')
    }
}
export const login = (req, res) => {
    res.send('login')
}