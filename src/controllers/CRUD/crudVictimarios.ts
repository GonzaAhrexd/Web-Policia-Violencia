import victimario from '../../models/victimario'
import denuncias from '../../models/denuncias'
import { agregarActividadReciente } from './crudActividadReciente'

// POST: Crear victimario
export const createVictimario = async (req, res) => {
    try {
        const { 
            nombre_victimario, apellido_victimario, direccion_victimario, edad_victimario, dni_victimario, 
            estado_civil_victimario, ocupacion_victimario, abuso_de_alcohol, antecedentes_toxicologicos, 
            antecedentes_penales, antecedentes_contravencionales, antecedentes_psicologicos, 
            entrenamiento_en_combate, aprehension, solicitud_de_aprehension_dispuesta, esta_aprehendido 
        } = req.body;

        // No permitir avanzar si no se mandaron los campos básicos
        if (!nombre_victimario || !apellido_victimario || !direccion_victimario || !edad_victimario) {
            return res.status(400).send('Faltan datos obligatorios');
        }

        let victimarioExistente = null;

        if (dni_victimario && dni_victimario !== "S/N") {
            victimarioExistente = await victimario.findOne({ DNI: dni_victimario });
        }

        // Objeto base para crear o actualizar
        const datosVictimario = {
            nombre: nombre_victimario,
            apellido: apellido_victimario,
            direccion: direccion_victimario,
            edad: edad_victimario,
            DNI: dni_victimario,
            estado_civil: estado_civil_victimario,
            ocupacion: ocupacion_victimario,
            abuso_de_alcohol: !!abuso_de_alcohol,
            antecedentes_toxicologicos: !!antecedentes_toxicologicos,
            antecedentes_psicologicos: !!antecedentes_psicologicos,
            antecedentes_penales: !!antecedentes_penales,
            antecedentes_contravencionales: !!antecedentes_contravencionales,
            entrenamiento_en_combate: !!entrenamiento_en_combate,
            esta_aprehendido: esta_aprehendido 
                ? esta_aprehendido 
                : (aprehension !== null && solicitud_de_aprehension_dispuesta) 
                    ? aprehension 
                    : false,
        };

        if (!victimarioExistente) {
            // Crear nuevo victimario
            const newVictimario = new victimario(datosVictimario);
            const victimarioSaved = await newVictimario.save();
            await agregarActividadReciente(`Se ha creado un nuevo victimario: ${nombre_victimario} ${apellido_victimario}`, 'Victimario', victimarioSaved._id, req.cookies);
            return res.status(201).json({ message: 'Victimario creado con éxito', id: victimarioSaved._id });
        } else {
            // Actualizar victimario existente
            const victimarioUpdated = await victimario.findOneAndUpdate(
                { DNI: dni_victimario },
                datosVictimario,
                { new: true }
            );

            if (victimarioUpdated) {
                await agregarActividadReciente(`Se agregó una denuncia al victimario: ${nombre_victimario} ${apellido_victimario}`, 'Victimario', victimarioUpdated._id, req.cookies);
                return res.status(200).json({ message: 'Victimario actualizado con éxito', id: victimarioUpdated._id });
            } else {
                return res.status(404).send('No se pudo actualizar el victimario');
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al procesar la solicitud');
    }
}


// GET: Listar victimario
export const getVictimario = async (req, res) => {
    try {
        // Obtener el víctimario por Id
        if(req.params.id != "Sin victimario"){
            const victimarioABuscar = await victimario.findById(req.params.id)
            // Devolver el víctimario que se está buscando
            res.json(victimarioABuscar)
        }else{
            res.json("Sin victimario")
        }
    } catch (error) {
        console.log(error)
    }
}

// DELETE: Eliminar victimario, solo accesible desde este archivo
export const deleteVictimario = async (id, denunciaId, req) => {
    try {
        // Buscar la víctima por ID
        const victimarioABorrar = await victimario.findById(id)
        if (victimarioABorrar) {
            // Verificar la cantidad de denuncias previas
            if (victimarioABorrar.denuncias_en_contra.length == 0) {
                // Si solo tiene una denuncia previa, eliminar la víctima
                await victimario.findByIdAndDelete(id);
                await agregarActividadReciente("Eliminación de denuncia del victimario", "Victimario", id, req.cookies);
            } else {
                // Si tiene más de una denuncia, restar una a la cantidad de denuncias previas
                // y eliminar el ID de la denuncia del array denuncias_realizadas
                const updateDenunciasEnContra = Array.isArray(victimarioABorrar.denuncias_en_contra)
                    ? victimarioABorrar.denuncias_en_contra.filter(denuncia => denuncia !== denunciaId)
                    : [];
                // Actualizar la cantidad de denuncias previas y el array de denuncias en contra
                await victimario.findByIdAndUpdate(id, {
                    denuncias_en_contra: updateDenunciasEnContra
                }, { new: true });
                await agregarActividadReciente("Eliminación de denuncia del victimario", "Victimario", id, req.cookies);

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
    try {
        const { id } = req.params;
        const { 
            nombre_victimario, apellido_victimario, direccion_victimario, edad_victimario, dni_victimario, 
            estado_civil_victimario, ocupacion_victimario, abuso_de_alcohol, antecedentes_toxicologicos, antecedentes_psicologicos,
            antecedentes_penales, antecedentes_contravencionales, entrenamiento_en_combate, 
            esta_aprehendido, fue_liberado 
        } = req.body;

        if (!id) {
            return res.status(400).send('ID de victimario no proporcionado');
        }

        const datosVictimario = {
            nombre: nombre_victimario,
            apellido: apellido_victimario,
            direccion: direccion_victimario,
            edad: edad_victimario,
            DNI: dni_victimario,
            estado_civil: estado_civil_victimario,
            ocupacion: ocupacion_victimario,
            abuso_de_alcohol: !!abuso_de_alcohol,
            antecedentes_toxicologicos: !!antecedentes_toxicologicos,
            antecedes_psicologicos: !!antecedentes_psicologicos, // Asegurarse de que este campo también se maneje
            antecedentes_penales: !!antecedentes_penales,
            antecedentes_contravencionales: !!antecedentes_contravencionales,
            entrenamiento_en_combate: !!entrenamiento_en_combate,
            esta_aprehendido: !!esta_aprehendido,
            fue_liberado: !!fue_liberado,
        };

        const victimarioUpdated = await victimario.findByIdAndUpdate(
            id,
            datosVictimario,
            { new: true }
        );

        if (!victimarioUpdated) {
            return res.status(404).send('Victimario no encontrado');
        }

        // Actualizar victimario_nombre en las denuncias relacionadas
        await denuncias.updateMany(
            { victimario_ID: id },
            { victimario_nombre: `${nombre_victimario} ${apellido_victimario}` }
        );

        await agregarActividadReciente("Edición de victimario", "Victimario", id, req.cookies);

        return res.status(200).json(victimarioUpdated);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al editar el victimario');
    }
}


// Buscar victimario
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
        // Crear el objeto de consulta
        const query: Query = {};
        // Función para normalizar las letras -> Permite buscar con o sin tildes y con letras similares donde pueden ocurrir errores de tipeo
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
            if (denuncia != null) {
                query._id = denuncia.victimario_ID;
            }else {
                query._id = "Sin victima";
            }
        }
        // Obtener las denuncias
        try {
            const victimariosFind = await victimario.find(query);
            await agregarActividadReciente("Búsqueda de victimario", "Victimario", "Varias", req.cookies)
            res.json(victimariosFind);
        } catch (error) {
            // Error al obtener las denuncias
            res.status(500).json({ message: 'Hubo un error al obtener los victimarios.' });
        }
    } catch (error) {
        console.log(error)
    }
}


export const buscarVictimarioPorDni = async (req, res) => {
    try 
    {
        const { dni_victimario } = req.params
        let respuesta = await victimario.findOne({ DNI: dni_victimario })

        // Agrega a la respuesta para cada elemento en denuncias_en_contra el objeto que devuelve con su id en denuncias

        if (respuesta) {
            let denuncias_detalles = []

            for (const denuncia of respuesta.denuncias_en_contra) {
                let denuncia_encontrada = await denuncias.findById(denuncia) 
                
                if( denuncia_encontrada != null){
                    // @ts-ignore
                    denuncias_detalles.push(denuncia_encontrada)
                }
            }

            res.json({
                     // @ts-ignore
                     ...respuesta._doc,
                     denuncias_detalles
            })

        } else {
            res.json("No se encontró al victimario")
        }
 
    } catch (error) {
        console.log(error)

    }
}



export const buscarVictimariosArray = async (req: any, res: any) => {
    try {
        const { victimariosIds } = req.body;
        if (!Array.isArray(victimariosIds) || victimariosIds.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar un array de IDs de victimarios.' });
        }

        const victimariosSet = new Set();
        for (const id of victimariosIds) {
            try {
                const victimarioData = await victimario.findById(id);
                if (victimarioData) {
                    // Convertimos el objeto a string para evitar repeticiones
                    victimariosSet.add(JSON.stringify(victimarioData));
                }
            } catch (error) {
                console.error(`Error al obtener el victimario con ID ${id}:`, error);
            }
        }
        // Convertimos el Set a un arreglo de objetos
        // @ts-ignore
        const victimariosArray = Array.from(victimariosSet).map((victimarioString) => JSON.parse(victimarioString));
        res.json(victimariosArray);


    }catch(error){
        console.error('Error al obtener las estadísticas de victimarios:', error);
        res.status(500).json({ message: 'Hubo un error al obtener las estadísticas de victimarios.' });
    }

}