import usuarios from '../models/usuarios'

//Registro de usuarios
export const register = async (req, res) => {
    console.log(req.body)

    // Obtención de los datos del formulario de registro
    const { nombre, apellido, telefono, pass, admin, nombre_de_usuario, credencial, unidad, jerarquia, plaza, zona, rol } = req.body
    let userExistente = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario }) //Validación en mongodb si ya existe el usuario


    // Creación de un nuevo usuario como objeto
    if (!userExistente) {
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
            rol

        })
        console.log(newUser)
        // Guardar el usuario en la base de datos
        newUser.save()
    } else {
        // throw new Error('Usuario ya existe')
        console.log("Ya existe el usuario")
    }
    res.send('registered')
}
export const login = (req, res) => {
    res.send('login')
}