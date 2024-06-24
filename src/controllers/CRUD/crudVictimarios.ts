import victimario from '../../models/victimario'
import denuncias from '../../models/denuncias'

// VICTIMARIO
// Crear victimario
export const createVictimario = async (req, res) => {
    try {
        // Extraemos los datos del body
        const { nombre_victimario, apellido_victimario, edad_victimario, dni_victimario, estado_civil_victimario, ocupacion_victimario, abuso_de_alcohol, antecedentes_toxicologicos, antecedentes_penales, antecedentes_contravencionales, entrenamiento_en_combate, notificacion, } = req.body
        // Buscar si ya existe un víctimario con el DNI ingresado
        let victimarioExistente
        if (dni_victimario != "S/N") {
            victimarioExistente = await victimario.findOne({ DNI: dni_victimario })
        } else {
            victimarioExistente = null
        }
        // Si no existe un víctimario con el DNI ingresado, crear uno nuevo
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
        // Obtener el víctimario por Id
        const victimarioABuscar = await victimario.findById(req.params.id)
        // Devolver el víctimario que se está buscando
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
                // Actualizar la cantidad de denuncias previas y el array de denuncias en contra
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
    const { id } = req.params
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

        // Actualizar victima_nombre de las denuncias que tenga la víctima en caso de que se haya modificado
        await denuncias.updateMany({
            victimario_ID: id
        }, {
            victimario_nombre: `${nombre_victimario} ${apellido_victimario}`
        });

        res.json(victimarioUpdated)

    } catch (error) {
        console.log(error)
    }

}

export const buscarVictimario = async (req, res) => {
    try {
        interface Query {
            nombre?: RegExp;
            apellido?: RegExp;
            DNI?: string;
            numero_de_expediente?: string;
            _id?: string;
        }
        // Obtener los parámetros de la URL
        const { nombre_victimario, apellido_victimario, dni_victimario, numero_de_expediente, victimario_id } = req.params;
        
        console.log(req.params)
        
        // Crear el objeto de consulta
        const query: Query = {};
        function normalizarLetras(caracter:string) {
            if (caracter === 's' || caracter === 'z') return '[sz]';
            if (caracter === 'i' || caracter === 'y') return '[iy]';
            if ( caracter === 'k' || caracter === 'q') return '[kq]';
            if ( caracter === 'v' || caracter === 'b') return '[vb]';
            if ( caracter === 'g' || caracter === 'j') return '[gj]';
            if (caracter === 'á' || caracter === 'a') return '[áa]';
            if (caracter === 'é' || caracter === 'e') return '[ée]';
            if (caracter === 'í' || caracter === 'i') return '[íi]';
            if (caracter === 'ó' || caracter === 'o') return '[óo]';
            if (caracter === 'ú' || caracter === 'u') return '[úu]';
            if (caracter === 'ü') return '[üu]';
            return caracter;
        }
    
        function construirExpresionRegular(cadena): any {
            if (cadena !== 'no_ingresado') {
                // Convertir la cadena a minúsculas
                const cadena_lower = cadena.toLowerCase();
            
                // Separar los nombres/apellidos y eliminar espacios en blanco adicionales
                const partes = cadena_lower.trim().split(/\s+/);
            
                // Crear la expresión regular
                const regexPattern = partes
                    .map(part => part.split('').map(normalizarLetras).join(''))
                    .join('.*');
            
                // Crear expresión regular para buscar todas las combinaciones de nombres/apellidos
                const regexCombinaciones = partes
                    .map(part => `(?=.*${part.split('').map(normalizarLetras).join('')})`)
                    .join('');
            
                // Devolver la expresión regular
                return new RegExp(regexCombinaciones, 'i');
            } else {
                // Si no se ha ingresado el nombre/apellido, devolver null
                return null;
            }
        }        
        if(victimario_id !== 'no_ingresado'){
            query._id = victimario_id;
        } 
        if (nombre_victimario !== 'no_ingresado') {
            query.nombre = new RegExp(construirExpresionRegular(nombre_victimario));
        }
        if (apellido_victimario !== 'no_ingresado') {
            query.apellido = new RegExp(construirExpresionRegular(apellido_victimario));
        }
        if (dni_victimario !== 'no_ingresado') {
            query.DNI =  dni_victimario.replace(/\./g, '');
        }
        if (numero_de_expediente !== 'no_ingresado') {
            const denuncia = await denuncias.findOne({ numero_de_expediente: numero_de_expediente });
            if (denuncia) {
                query._id = denuncia.victimario_ID;
            }
        }
        // Obtener las denuncias
        try {
            const victimariosFind = await victimario.find(query);
            res.json(victimariosFind);
        } catch (error) {
            // Error al obtener las denuncias
            res.status(500).json({ message: 'Hubo un error al obtener los victimarios.' });
        }
    } catch (error) {
        console.log(error)
    }
}
