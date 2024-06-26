import victimas from '../../models/victimas'
import denuncias from '../../models/denuncias'
import unorm from 'unorm'
// Crear víctima
export const createVictima = async (req, res) => {
    //Victima nueva
    try {
        const { nombre_victima, apellido_victima, direccion_victima,  edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, condicion_de_vulnerabilidad_victima, convivencia, hijos, dependencia_economica, mayor_de_18, menor_de_18, menores_discapacitados } = req.body
        let victimaExistente = await victimas.findOne({ DNI: dni_victima })
        if (req.body.dni_victima && !victimaExistente) {
            const newVictima = new victimas({
                nombre: nombre_victima,
                apellido: apellido_victima,
                edad: edad_victima,
                direccion: direccion_victima,
                DNI: dni_victima,
                estado_civil: estado_civil_victima,
                ocupacion: ocupacion_victima,
                condicion_de_vulnerabilidad: condicion_de_vulnerabilidad_victima,
                convivencia: convivencia ? convivencia : false,
                cantidad_de_denuncias_previas: 1,
                hijos: {
                    tiene_hijos: hijos ? hijos : false,
                    dependencia_economica: (hijos && dependencia_economica) ? dependencia_economica : false,
                    mayores_de_edad: (hijos && mayor_de_18) ? mayor_de_18 : false,
                    menores_de_edad: (hijos && menor_de_18) ? menor_de_18 : false,
                    menores_discapacitados: (hijos && menores_discapacitados) ? menores_discapacitados : false,
                },
            })
            const victimaSaved = await newVictima.save()
            res.json({ message: 'Victima creado con exito', id: victimaSaved._id })
        } else {

            // Actualiza los datos con los nuevos ingresados en caso de que difiera y suma 1 denuncia 
            // Actualiza los datos con los nuevos ingresados en caso de que difiera
            const victimaUpdated = await victimas.findOneAndUpdate({ DNI: dni_victima }, {
                $set: {
                    nombre: nombre_victima,
                    apellido: apellido_victima,
                    direccion: direccion_victima,
                    edad: edad_victima,
                    DNI: dni_victima,
                    estado_civil: estado_civil_victima,
                    ocupacion: ocupacion_victima,
                    condicion_de_vulnerabilidad: condicion_de_vulnerabilidad_victima,
                    convivencia: convivencia ? convivencia : false,
                    "hijos.tiene_hijos": hijos ? hijos : false,
                    "hijos.dependencia_economica": dependencia_economica ? dependencia_economica : false,
                    "hijos.mayores_de_edad": mayor_de_18 ? mayor_de_18 : false,
                    "hijos.menores_de_edad": menor_de_18 ? menor_de_18 : false,
                    "hijos.menores_discapacitados": menores_discapacitados ? menores_discapacitados : false,
                }
            }, { new: true })
            // Incrementa la cantidad de denuncias previas
            await victimas.updateOne({ DNI: dni_victima }, { $inc: { cantidad_de_denuncias_previas: 1 } });

            res.send('Victima ya existe')
        }

    } catch (error) {
        console.log(error)
        res.send('Victima ya existe o no se ingresaron datos')
    }
}
// Obtener víctima  
export const getVictima = async (req, res) => {
    try {
        //Obtener todas las denuncias donde el usuario sea el que cargó la denuncia
        const victima = await victimas.findOne({ _id: req.params.id })
        res.json(victima)
    } catch (error) {
        console.log(error)
    }
}

// Eliminar víctima, solo accesible desde este archivo
export const deleteVictima = async (id, denunciaId) => {
    try {
        // Buscar la víctima por ID
        const victimaABorrar = await victimas.findById(id);
        if (victimaABorrar) {
            // Verificar la cantidad de denuncias previas
            if (victimaABorrar.cantidad_de_denuncias_previas == 1) {
                // Si solo tiene una denuncia previa, eliminar la víctima
                await victimas.findByIdAndDelete(id);
            } else {
                // Si tiene más de una denuncia, restar una a la cantidad de denuncias previas
                // y eliminar el ID de la denuncia del array denuncias_realizadas
                const updatedDenunciasRealizadas = Array.isArray(victimaABorrar.denuncias_realizadas)
                    ? victimaABorrar.denuncias_realizadas.filter(denuncia => denuncia !== denunciaId)
                    : [];
                await victimas.findByIdAndUpdate(id, {
                    $inc: { cantidad_de_denuncias_previas: -1 },
                    denuncias_realizadas: updatedDenunciasRealizadas
                }, { new: true });
            }
        } else {
            console.log("Victima no encontrada");
        }
    } catch (error) {
        console.log(error);
    }
}

// Editar víctima
export const updateVictima = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre_victima, apellido_victima, direccion_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, condicion_de_vulnerabilidad_victima, convivencia, hijos, dependencia_economica, mayor_de_18, menor_de_18, menores_discapacitados } = req.body

        const victimaUpdated = await victimas.findByIdAndUpdate(id, {
            nombre: nombre_victima,
            apellido: apellido_victima,
            direccion: direccion_victima,
            edad: edad_victima,
            DNI: dni_victima,
            estado_civil: estado_civil_victima,
            ocupacion: ocupacion_victima,
            condicion_de_vulnerabilidad: condicion_de_vulnerabilidad_victima,
            convivencia: convivencia ? convivencia : false,
            hijos: {
                tiene_hijos: hijos ? hijos : false,
                dependencia_economica: dependencia_economica ? dependencia_economica : false,
                mayores_de_edad: mayor_de_18 ? mayor_de_18 : false,
                menores_de_edad: menor_de_18 ? menor_de_18 : false,
                menores_discapacitados: menores_discapacitados ? menores_discapacitados : false,
            }
        }, { new: true })
        res.json(victimaUpdated)
        // Actualizar victima_nombre de las denuncias que tenga la víctima en caso de que se haya modificado
        await denuncias.updateMany({
            victima_ID: id
        }, {
            victima_nombre: `${nombre_victima} ${apellido_victima}`
        });

    } catch (error) {
        console.log(error)
    }

}
// Buscar víctima
export const buscarVictima = async (req, res) => {
    interface Query {
        nombre?: RegExp;
        apellido?: RegExp;
        DNI?: string;
        _id?: string;
    }
    // Obtener los parámetros de la URL
    const { nombre_victima, apellido_victima, dni_victima, numero_de_expediente, id_victima } = req.params;
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
            console.log("Expresión regular de combinaciones:", regexCombinaciones);
            // Devolver la expresión regular
            return new RegExp(regexCombinaciones, 'i');
        } else {
            // Si no se ha ingresado el nombre/apellido, devolver null
            return null;
        }
    }        
    if(id_victima !== 'no_ingresado'){
        query._id = id_victima;
    }
    if (nombre_victima !== 'no_ingresado') {
        // @ts-ignore
        query.nombre = new RegExp(construirExpresionRegular(nombre_victima));
    }
    if (apellido_victima !== 'no_ingresado') {
        // @ts-ignore
        query.apellido = new RegExp(construirExpresionRegular(apellido_victima));
    }
    if (dni_victima !== 'no_ingresado') {
        //Haz que se eliminen . si que se ingresan en el dni
        query.DNI =  dni_victima.replace(/\./g, '');
    }
    if (numero_de_expediente !== 'no_ingresado') {
        const denuncia = await denuncias.findOne({ numero_de_expediente: numero_de_expediente });
        if (denuncia) {
            query._id = denuncia.victima_ID;
        }
    }
    // Obtener las denuncias
    try {
        const victimasBuscar = await victimas.find(query);
        res.json(victimasBuscar);
    } catch (error) {
        // Error al obtener las denuncias
        res.status(500).json({ message: 'Hubo un error al obtener las víctimas.' });
    }
}
