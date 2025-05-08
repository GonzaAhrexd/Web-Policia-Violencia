import preventivo from '../../models/preventivos'


export const createPreventivo = async (req, res) => {
    try{
        // Obtener los datos del cuerpo de la solicitud
        const { nombre_victima, apellido_victima, edad_victima, DNI_victima, estado_civil_victima, ocupacion_victima, nacionalidad_victima, direccion_victima, telefono_victima, sabe_leer_y_escribir_victima, observaciones, agrega, nombre_completo_secretario, jerarquia_secretario, plaza_secretario, nombre_completo_instructor, jerarquia_instructor, supervision, numero_nota, fecha_preventivo, caratula_causa,  resolucion, genero_victima, autoridades  } = req.body
        console.log(req.body)
        // Crear un nuevo objeto con los datos a insertar
        const newPreventivo = new preventivo({
            supervision: supervision,
            numero_nota: numero_nota,
            fecha: fecha_preventivo,
            resolucion: resolucion,
            caratula_causa: caratula_causa,
            autoridades: autoridades,
            nombre_victima: nombre_victima,
            apellido_victima: apellido_victima,
            genero_victima: genero_victima ? genero_victima : 'No especificado', 
            edad_victima: edad_victima,
            DNI_victima: DNI_victima, 
            estado_civil_victima: estado_civil_victima,
            ocupacion_victima: ocupacion_victima,
            nacionalidad_victima: nacionalidad_victima,
            direccion_victima: direccion_victima,
            telefono_victima: telefono_victima,
            sabe_leer_y_escribir_victima: sabe_leer_y_escribir_victima == "Sí" ? true : false,
            observaciones: observaciones + (agrega != '' && `\n${agrega}`),
        
            secretario: {
                nombre_completo_secretario: nombre_completo_secretario,
                jerarquia_secretario: jerarquia_secretario,
                plaza_secretario: plaza_secretario
            },
            instructor: {
                nombre_completo_instructor: nombre_completo_instructor,
                jerarquia_instructor: jerarquia_instructor
            }
        })

        // Guardar el nuevo objeto en la base de datos
        const preventivoSave = await newPreventivo.save()
        
        // Respuesta del servidor
        res.send('Preventivo creado con exito')

    }catch (error) {
        console.log(error)
    }
}
