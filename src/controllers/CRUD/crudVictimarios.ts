import victimas from '../../models/victimas'
import victimario from '../../models/victimario'
import denuncia from '../../models/denuncias'
import denunciaSinVerificar from '../../models/denunciaSinVerificar'
import exposicion from '../../models/exposicion'
import usuarios from '../../models/usuarios'

// VICTIMARIO
// Crear victimario
export const createVictimario = async (req, res) => {
    try {
        const { nombre_victimario, apellido_victimario, edad_victimario, dni_victimario, estado_civil_victimario, ocupacion_victimario, abuso_de_alcohol, antecedentes_toxicologicos, antecedentes_penales, antecedentes_contravencionales, entrenamiento_en_combate, notificacion, } = req.body
        let victimarioExistente
        if (dni_victimario != "S/N") {
            victimarioExistente = await victimario.findOne({ DNI: dni_victimario })
        } else {
            victimarioExistente = null
        }
        if (req.body.dni_victimario && !victimarioExistente) {
            const newVictimario = new victimario({
                nombre: nombre_victimario,
                apellido: apellido_victimario,
                edad: edad_victimario,
                DNI: dni_victimario,
                estado_civil: estado_civil_victimario,
                ocupacion: ocupacion_victimario,
                abuso_de_alcohol,
                antecedentes_toxicologicos,
                antecedentes_penales,
                antecedentes_contravencionales,
                entrenamiento_en_combate,
                notificacion,
                cantidad_de_denuncias_previas: 1
            })
            const victimarioSaved = await newVictimario.save()
            res.json({ message: 'Victimario creado con exito', id: victimarioSaved._id })
        } else {
            res.send('Victimario ya existe')
            //Actualiza al victimario existente y agrega a cantida de denuncias previas una más
            if (dni_victimario != "S/N") {
                const victimarioUpdated = await victimario.findOneAndUpdate({ DNI: dni_victimario }, {
                    nombre: nombre_victimario,
                    apellido: apellido_victimario,
                    edad: edad_victimario,
                    DNI: dni_victimario,
                    estado_civil: estado_civil_victimario,
                    ocupacion: ocupacion_victimario,
                    abuso_de_alcohol,
                    antecedentes_toxicologicos,
                    antecedentes_penales,
                    antecedentes_contravencionales,
                    entrenamiento_en_combate,
                    notificacion,
                    $inc: { cantidad_de_denuncias_previas: 1 }
                }, { new: true })

                //const victimarioUpdated = await victimario.findOneAndUpdate({ DNI: dni_victimario }, { $inc: { cantidad_de_denuncias_previas: 1 } }, { new: true })
            }
        }

    } catch (error) {
        console.log(error)
        res.send('Victima ya existe o no se ingresaron datos')
    }
}

// Listar victimario

export const getVictimario = async (req, res) => {
    try {
        const victimarioABuscar = await victimario.findById(req.params.id)
        res.json(victimarioABuscar)
    } catch (error) {
        console.log(error)
    }

}

// Eliminar victimario, solo accesible desde este archivo
export const deleteVictimario = async (id, denunciaId) => {
    try {
        // Buscar la víctima por ID
        const victimarioABorrar = await victimario.findById(id)

        if (victimarioABorrar) {
            // Verificar la cantidad de denuncias previas
            if (victimarioABorrar.cantidad_de_denuncias_previas == 1) {
                // Si solo tiene una denuncia previa, eliminar la víctima
                await victimario.findByIdAndDelete(id);
            } else {
                // Si tiene más de una denuncia, restar una a la cantidad de denuncias previas
                // y eliminar el ID de la denuncia del array denuncias_realizadas
                const updateDenunciasEnContra = Array.isArray(victimarioABorrar.denuncias_en_contra)
                    ? victimarioABorrar.denuncias_en_contra.filter(denuncia => denuncia !== denunciaId)
                    : [];

                await victimario.findByIdAndUpdate(id, { 
                    $inc: { cantidad_de_denuncias_previas: -1 },
                    denuncias_en_contra: updateDenunciasEnContra
                }, { new: true });
            }
        } else {
            console.log("Victimario no encontrado");
        }
    } catch (error) {
        console.log(error);
    }

}

// Editar victimario
export const updateVictimario = async (req, res) => {
    const { nombre_victimario, apellido_victimario, edad_victimario, dni_victimario, estado_civil_victimario, ocupacion_victimario, abuso_de_alcohol, antecedentes_toxicologicos, antecedentes_penales, antecedentes_contravencionales, entrenamiento_en_combate, notificacion, } = req.body

    try {
        const victimarioUpdated = await victimario.findByIdAndUpdate(req.params.id, {
            nombre: nombre_victimario,
            apellido: apellido_victimario,
            edad: edad_victimario,
            DNI: dni_victimario,
            estado_civil: estado_civil_victimario,
            ocupacion: ocupacion_victimario,
            abuso_de_alcohol,
            antecedentes_toxicologicos,
            antecedentes_penales,
            antecedentes_contravencionales,
            entrenamiento_en_combate,
            notificacion,
        }, { new: true })
        res.json(victimarioUpdated)
    } catch (error) {
        console.log(error)
    }

}

export const buscarVictimario = async (req, res) => {
    try{
        interface Query {
            nombre?: string;
            apellido?: string;
            DNI?: string;
            numero_de_expediente?: string;
        }
        // Obtener los parámetros de la URL
        const { nombre_victimario, apellido_victimario, dni_victimario, numero_de_expediente} = req.params;
        // Crear el objeto de consulta
        console.log(req.params)
    
        
        const query: Query = { };
    
        if (nombre_victimario !== 'no_ingresado') {
            query.nombre = nombre_victimario;
        }
        
        if (apellido_victimario !== 'no_ingresado') {
            query.apellido = apellido_victimario;
        }
        if (dni_victimario !== 'no_ingresado') {
            query.DNI = dni_victimario;
        }
        console.log(query)
        // Obtener las denuncias
        try {
            const victimariosFind = await victimario.find(query);
            res.json(victimariosFind);
        } catch (error) {
            // Error al obtener las denuncias
            res.status(500).json({ message: 'Hubo un error al obtener los victimarios.' });
        }
    }catch(error){
        console.log(error)
    }
}
