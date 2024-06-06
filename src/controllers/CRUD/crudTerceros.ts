import terceros from '../../models/terceros'
import denuncias from '../../models/denuncias'
// Obtener víctima
export const getTercero = async (req, res) => {
    try {
        console.log("HERE")
        //Obtener todas las denuncias donde el usuario sea el que cargó la denuncia
        const tercero = await terceros.findOne({ _id: req.params.id })
        res.json(tercero)
    } catch (error) {
        console.log(error)
    }
}
// Eliminar tercero, solo accesible desde este archivo
export const deleteTercero = async (id, denunciaId) => {
    try {
        // Buscar la víctima por ID
        const terceroABorrar = await terceros.findById(id);

        if (terceroABorrar) {
            // Verificar la cantidad de denuncias previas
            if (terceroABorrar.cantidad_de_denuncias == 1) {
                // Si solo tiene una denuncia previa, eliminar la víctima
                await terceros.findByIdAndDelete(id);
            } else {
                // Si tiene más de una denuncia, restar una a la cantidad de denuncias previas
                // y eliminar el ID de la denuncia del array denuncias_realizadas
                const updatedDenunciasRealizadas = Array.isArray(terceroABorrar.denuncias_realizadas)
                    ? terceroABorrar.denuncias_realizadas.filter(denuncia => denuncia !== denunciaId)
                    : [];

                await terceros.findByIdAndUpdate(id, {
                    $inc: { cantidad_de_denuncias_previas: -1 },
                    denuncias_realizadas: updatedDenunciasRealizadas
                }, { new: true });
            }
        } else {
            console.log("Tercero no encontrado");
        }
    } catch (error) {
        console.log(error);
    }
}

// Editar tercero
export const updateTercero = async (req, res) => {
    try {
        const { id } = req.params

        console.log("Llegó" + req.params.id)
        console.log(req.body)
        const { nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima } = req.body

        const terceroUpdated = await terceros.findByIdAndUpdate(id, {
            nombre: nombre_tercero,
            apellido: apellido_tercero,
            DNI: dni_tercero,
            vinculo_con_victima: vinculo_con_la_victima
        }, { new: true })
        
        console.log(terceroUpdated)
        
        res.json(terceroUpdated)
        // Actualizar victima_nombre de las denuncias que tenga la víctima en caso de que se haya modificado
    

    } catch (error) {
        console.log(error)
    }

}

export const createTercero = async (req, res) => {
    //Tercero nuevo
    try {
        const { nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima } = req.body

        let terceroExistente = await terceros.findOne({ DNI: dni_tercero })
        if (req.body.dni_tercero && !terceroExistente){
            const newTercero = new terceros({
                nombre: nombre_tercero,
                apellido: apellido_tercero,
                DNI: dni_tercero,
                vinculo_con_victima: vinculo_con_la_victima,
                cantidad_de_denuncias: 1
            })
            const terceroSaved = await newTercero.save()
            res.json({ message: 'Tercero creado con exito', id: terceroSaved._id })
        } else {
            // Actualiza los datos con los nuevos ingresados en caso de que difiera y suma 1 denuncia 
            const tercerosUpdate = await terceros.findOneAndUpdate({ DNI: dni_tercero }, {
                $set: {
                    nombre: nombre_tercero,
                    apellido: apellido_tercero,
                    DNI: dni_tercero,
                    vinculo_con_victima: vinculo_con_la_victima,
                }
            }, { new: true })
            // Incrementa la cantidad de denuncias previas
            await terceros.updateOne({ DNI: dni_tercero }, { $inc: { cantidad_de_denuncias: 1 } });
            res.send('Tercero ya existe')
        }

    } catch (error) {
        console.log(error)
        res.send('Victima ya existe o no se ingresaron datos')
    }
}

export const buscarTercero = async (req, res) => {
    interface Query {
        nombre?: RegExp;
        apellido?: RegExp;
        DNI?: string;
        _id?: string;
    }
    // Obtener los parámetros de la URL
    const { nombre_tercero, apellido_tercero, dni_tercero, numero_de_expediente } = req.params;
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

    function construirExpresionRegular(cadena) {
        console.log("Cadena recibida:", cadena);
        if (cadena !== 'no_ingresado') {
            // Convertir la cadena a minúsculas
            const cadena_lower = cadena.toLowerCase();
            console.log("Cadena convertida a minúsculas:", cadena_lower);
        
            // Separar los nombres/apellidos y eliminar espacios en blanco adicionales
            const partes = cadena_lower.trim().split(/\s+/);
            console.log("Partes separadas:", partes);
        
            // Crear la expresión regular
            const regexPattern = partes
                .map(part => part.split('').map(normalizarLetras).join(''))
                .join('.*');
            console.log("Expresión regular:", regexPattern);
        
            // Crear expresión regular para buscar todas las combinaciones de nombres/apellidos
            const regexCombinaciones = partes
                .map(part => `(?=.*${part.split('').map(normalizarLetras).join('')})`)
                .join('');
            console.log("Expresión regular de combinaciones:", regexCombinaciones);
        
            // Devolver la expresión regular
            return new RegExp(regexCombinaciones, 'i');
        } else {
            // Si no se ha ingresado el nombre/apellido, devolver null
            return null;
        }
    }        

    if (nombre_tercero !== 'no_ingresado') {
        // @ts-ignore
        query.nombre = new RegExp(construirExpresionRegular(nombre_tercero));
    }
    if (apellido_tercero !== 'no_ingresado') {
        // @ts-ignore
        query.apellido = new RegExp(construirExpresionRegular(apellido_tercero));
    }

    if (dni_tercero !== 'no_ingresado') {
        //Haz que se eliminen . si que se ingresan en el dni
        query.DNI =  dni_tercero.replace(/\./g, '');
    }
    if (numero_de_expediente !== 'no_ingresado') {
        const denuncia = await denuncias.findOne({ numero_de_expediente: numero_de_expediente });
        if (denuncia) {
            // @ts-ignore
            query._id = denuncia.tercero_ID;
        }
    }
    // Obtener las denuncias
    try {
        const terceroBuscar = await terceros.find(query);
        res.json(terceroBuscar);
    } catch (error) {
        // Error al obtener las denuncias
        res.status(500).json({ message: 'Hubo un error al obtener las víctimas.' });
    }

}
