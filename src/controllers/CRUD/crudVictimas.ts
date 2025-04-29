import victimas from '../../models/victimas'
import denuncias from '../../models/denuncias'
import { agregarActividadReciente } from './crudActividadReciente'

// Crear víctima
export const createVictima = async (req, res) => {
    try {
        const {
            nombre_victima, apellido_victima, direccion_victima, edad_victima, dni_victima,
            estado_civil_victima, ocupacion_victima, condicion_de_vulnerabilidad,
            embarazo, periodo_post_parto, periodo_de_lactancia, discapacidad,
            enfermedad_cronica, adulto_mayor, menor_de_edad, tratamiento_psicologico,
            genero_victima, hijos, dependencia_economica,
            mayor_de_18, menor_de_18, menores_discapacitados
        } = req.body;

        // Armar objetos auxiliares
        const condicionesDeVulnerabilidad = {
            embarazo: !!embarazo,
            periodo_post_parto: !!periodo_post_parto,
            periodo_de_lactancia: !!periodo_de_lactancia,
            discapacidad: !!discapacidad,
            enfermedad_cronica: !!enfermedad_cronica,
            adulto_mayor: !!adulto_mayor,
            menor_de_edad: !!menor_de_edad,
            tratamiento_psicologico: !!tratamiento_psicologico,
        };

        const datosHijos = {
            tiene_hijos: hijos === "Sí",
            dependencia_economica: hijos === "Sí" ? dependencia_economica || false : false,
            mayores_de_edad: hijos === "Sí" ? mayor_de_18 || false : false,
            menores_de_edad: hijos === "Sí" ? menor_de_18 || false : false,
            menores_discapacitados: hijos === "Sí" ? menores_discapacitados || false : false,
        };

        const datosVictima = {
            nombre: nombre_victima,
            apellido: apellido_victima,
            direccion: direccion_victima,
            edad: edad_victima,
            DNI: dni_victima,
            estado_civil: estado_civil_victima,
            genero: genero_victima,
            ocupacion: ocupacion_victima,
            condicion_de_vulnerabilidad: condicion_de_vulnerabilidad === "Sí",
            condiciones_de_vulnerabilidad: condicionesDeVulnerabilidad,
            hijos: datosHijos,
        };

        console.log(datosVictima)

        let victimaExistente = null;
        if (dni_victima && dni_victima !== "S/N") {
            victimaExistente = await victimas.findOne({ DNI: dni_victima });
        }

        if (!victimaExistente) {
            const nuevaVictima = new victimas(datosVictima);
            const victimaGuardada = await nuevaVictima.save();

            if (victimaGuardada && victimaGuardada._id) {
                await agregarActividadReciente(
                    `Se ha creado nueva víctima ${nombre_victima} ${apellido_victima}`,
                    "Víctima",
                    victimaGuardada._id,
                    req.cookies
                );
            }

            return res.json({ message: 'Víctima creada con éxito', id: victimaGuardada._id });
        } else {
            const victimaActualizada = await victimas.findOneAndUpdate(
                { DNI: dni_victima },
                { $set: datosVictima },
                { new: true }
            );

            if (victimaActualizada && victimaActualizada._id) {
                await agregarActividadReciente(
                    `Se ha agregado una denuncia a la víctima ${nombre_victima} ${apellido_victima}`,
                    "Víctima",
                    victimaActualizada._id,
                    req.cookies
                );
            }

            return res.send('Víctima ya existe');
        }


    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al crear o actualizar la víctima');
    }
};

// Obtener víctima  
export const getVictima = async (req, res) => {
    try {
        //Obtener todas las denuncias donde el usuario sea el que cargó la denuncia
        if (req.params.id != "Sin victima") {
            const victima = await victimas.findOne({ _id: req.params.id })
            res.json(victima)
        } else {
            res.json("Sin resultados")
        }
    } catch (error) {
        console.log(error)
    }
}

// Eliminar víctima, solo accesible desde este archivo
export const deleteVictima = async (id, denunciaId, req) => {
    try {
        // Buscar la víctima por ID
        const victimaABorrar = await victimas.findById(id);
        if (victimaABorrar) {
            // Verificar la cantidad de denuncias previas
            if (victimaABorrar.denuncias_realizadas?.length == 1) {
                // Si solo tiene una denuncia previa, eliminar la víctima
                await victimas.findByIdAndDelete(id);
                await agregarActividadReciente("Eliminación de víctima", "Víctima", id, {});
            } else {
                // Si tiene más de una denuncia, restar una a la cantidad de denuncias previas
                // y eliminar el ID de la denuncia del array denuncias_realizadas
                const updatedDenunciasRealizadas = Array.isArray(victimaABorrar.denuncias_realizadas)
                    ? victimaABorrar.denuncias_realizadas.filter(denuncia => denuncia !== denunciaId)
                    : [];
                await victimas.findByIdAndUpdate(id, {
                    denuncias_realizadas: updatedDenunciasRealizadas
                }, { new: true });
                await agregarActividadReciente("Eliminación de denuncia de víctima", "Víctima", id, req.cookies);
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
        const { id } = req.params;
        const {
            nombre_victima, apellido_victima, direccion_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima,
            condicion_de_vulnerabilidad, genero_victima, embarazo, periodo_post_parto, periodo_de_lactancia, discapacidad, enfermedad_cronica,
            adulto_mayor, menor_de_edad, tratamiento_psicologico, hijos,
            mayor_de_18, menor_de_18, menores_discapacitados
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'ID de víctima no proporcionado' });
        }

        const datosVictima = {
            nombre: nombre_victima,
            apellido: apellido_victima,
            direccion: direccion_victima,
            genero: genero_victima,
            edad: edad_victima,
            DNI: dni_victima,
            estado_civil: estado_civil_victima,
            ocupacion: ocupacion_victima,
            condicion_de_vulnerabilidad: condicion_de_vulnerabilidad === "Sí",
            condiciones_de_vulnerabilidad: {
                embarazo: (embarazo && condicion_de_vulnerabilidad === "Sí") ? embarazo : false,
                periodo_post_parto: (periodo_post_parto && condicion_de_vulnerabilidad === "Sí") ? periodo_post_parto : false,
                periodo_de_lactancia: (periodo_de_lactancia && condicion_de_vulnerabilidad === "Sí") ? periodo_de_lactancia : false,
                discapacidad: (discapacidad && condicion_de_vulnerabilidad === "Sí") ? discapacidad : false,
                enfermedad_cronica: (enfermedad_cronica && condicion_de_vulnerabilidad === "Sí") ? enfermedad_cronica : false,
                adulto_mayor: (adulto_mayor && condicion_de_vulnerabilidad === "Sí") ? adulto_mayor : false,
                menor_de_edad: (menor_de_edad && condicion_de_vulnerabilidad === "Sí") ? menor_de_edad : false,
                tratamiento_psicologico: (tratamiento_psicologico && condicion_de_vulnerabilidad === "Sí") ? tratamiento_psicologico : false
            },
            hijos: {
                tiene_hijos: hijos === "Sí",
                mayores_de_edad: mayor_de_18 || false,
                menores_de_edad: menor_de_18 || false,
                menores_discapacitados: menores_discapacitados || false
            }
        };

        const victimaUpdated = await victimas.findByIdAndUpdate(id, { $set: datosVictima }, { new: true });

        if (!victimaUpdated) {
            return res.status(404).json({ message: 'Víctima no encontrada' });
        }

        // Registrar actividad reciente
        await agregarActividadReciente(
            `Se editó a la víctima ${nombre_victima} ${apellido_victima}`,
            "Víctima",
            id,
            req.cookies
        );

        // Actualizar nombre en todas las denuncias relacionadas
        await denuncias.updateMany(
            { victima_ID: id },
            { victima_nombre: `${nombre_victima} ${apellido_victima}` }
        );

        return res.json(victimaUpdated);

    } catch (error) {
        console.error('Error al actualizar víctima:', error);
        return res.status(500).json({ message: 'Error al actualizar víctima' });
    }
};

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

    function normalizarLetras(caracter: string) {
        if (caracter === 's' || caracter === 'z') return '[sz]';
        if (caracter === 'i' || caracter === 'y') return '[iy]';
        if (caracter === 'k' || caracter === 'q') return '[kq]';
        if (caracter === 'v' || caracter === 'b') return '[vb]';
        if (caracter === 'g' || caracter === 'j') return '[gj]';
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
            // Devolver la expresión regular
            return new RegExp(regexCombinaciones, 'i');
        } else {
            // Si no se ha ingresado el nombre/apellido, devolver null
            return null;
        }
    }
    if (id_victima !== 'no_ingresado') {
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
        query.DNI = dni_victima.replace(/\./g, '');
    }
    if (numero_de_expediente !== 'no_ingresado') {
        const denuncia = await denuncias.findOne({ numero_de_expediente: numero_de_expediente });

        if (denuncia != null) {
            query._id = denuncia.victima_ID;
        } else {
            query._id = "Sin victima";
        }
    }
    // Obtener las víctimas
    try {
        const victimasBuscar = await victimas.find(query);

        await agregarActividadReciente("Búsqueda de víctima", "Víctima", "Varias", req.cookies)
        res.json(victimasBuscar);

    } catch (error) {
        // Error al obtener las denuncias
        res.status(500).json({ message: 'Hubo un error al obtener las víctimas.' });
    }
}

export const buscarVictimaV2 = async (req, res) => {
    interface Query {
        nombre?: RegExp;
        apellido?: RegExp;
        DNI?: string;
        _id?: string;
    }
    // Obtener los parámetros de la URL
    const { nombre_victima, dni_victima } = req.params;

    // Crear el objeto de consulta    
    const query: Query = {};

    function normalizarLetras(caracter: string) {
        if (caracter === 's' || caracter === 'z') return '[sz]';
        if (caracter === 'i' || caracter === 'y') return '[iy]';
        if (caracter === 'k' || caracter === 'q') return '[kq]';
        if (caracter === 'v' || caracter === 'b') return '[vb]';
        if (caracter === 'g' || caracter === 'j') return '[gj]';
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
            // Devolver la expresión regular
            return new RegExp(regexCombinaciones, 'i');
        } else {
            // Si no se ha ingresado el nombre/apellido, devolver null
            return null;
        }
    }

    if (nombre_victima !== 'no_ingresado') {
        // @ts-ignore
        query.nombre = new RegExp(construirExpresionRegular(nombre_victima));
    }
    if (dni_victima !== 'no_ingresado') {
        //Haz que se eliminen . si que se ingresan en el dni
        query.DNI = dni_victima.replace(/\./g, '');
    }

    // Obtener las víctimas
    try {
        const victimasBuscar: any = await victimas.find(query);
    
        const victimasConDenuncias:any = [];
    
        for (const victima of victimasBuscar) {
            const denuncias_detalles = [];
    
            for (const denunciaId of victima.denuncias_realizadas) {
                const denuncia_encontrada:any = await denuncias.findById(denunciaId);
    
                if (denuncia_encontrada) {
                    // @ts-ignore
                    denuncias_detalles.push(denuncia_encontrada);
                }
            }
    
            victimasConDenuncias.push({
                ...victima._doc, // para sacar los datos planos de Mongoose
                denuncias_detalles
            });
        }
    
        res.json(victimasConDenuncias);
    
    } catch (error) {
        console.error("Error al buscar víctimas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
    

}