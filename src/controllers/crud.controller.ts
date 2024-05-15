// Importa los modelos de la base de datos
import victimas from '../models/victimas'
import victimario from '../models/victimario'
import denuncia from '../models/denuncias'

// DENUNCIAS
export const getDenuncia = async (req, res) => {
}

// Obtener denuncias del usuario
export const getMisDenuncias = async (req, res) => {
    interface Query {
        denunciada_cargada_por: string;
        fecha?: {
            $gte?: string;
            $lte?: string;
        };
        numero_de_expediente?: string;
        is_expediente_completo?: boolean;
    }
    const { desde, hasta, numero_de_expediente, is_expediente_completo } = req.params;
    const query: Query = { denunciada_cargada_por: req.user.id };

    if (desde !== 'no_ingresado') {
        query.fecha = { $gte: desde };
    }

    if (hasta !== 'no_ingresado') {
        query.fecha = query.fecha || {};
        query.fecha.$lte = hasta;
    }

    if (numero_de_expediente !== 'no_ingresado') {
        query.numero_de_expediente = numero_de_expediente;
    }

    if (is_expediente_completo !== 'no_ingresado') {
        query.is_expediente_completo = !is_expediente_completo;
    }

    try {
        const denuncias = await denuncia.find(query);
        res.json(denuncias);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener las denuncias.' });
    }
}

// Crear denuncias
export const createDenuncia = async (req, res) => {
    try {
        const { user_id, victima_ID, victimario_ID, nombre_victima, apellido_victima, nombre_victimario, apellido_victimario, dni_victima, dni_victimario, genero, fecha, direccion, GIS, barrio, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio,
            derecho_de_comunicacion, boton_antipanico, denunciado_por_tercero, nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, is_expediente_completo, politica } = req.body

        // Buscar si la victima y victimario ya existen
        const findVictima = await victimas.findOne({ DNI: dni_victima })
        let findVictimario

        // Si el DNI del victimario es S/N, se asigna el ID del victimario
        if (dni_victimario == "S/N") {
            findVictimario = victimario_ID
        } else {
            findVictimario = await victimario.findOne({ DNI: dni_victimario })
        }
        const newDenuncia = new denuncia({
            victima_ID: findVictima?._id ? findVictima._id : victima_ID,
            victimario_ID: findVictimario?._id ? findVictimario._id : victimario_ID,
            victima_nombre: nombre_victima + ' ' + apellido_victima,
            victimario_nombre: nombre_victimario + ' ' + apellido_victimario,
            genero,
            fecha,
            direccion,
            GIS,
            barrio,
            unidad_de_carga,
            municipio,
            jurisdiccion_policial: jurisdiccion_policial ? jurisdiccion_policial : 'No existe',
            cuadricula: cuadricula ? cuadricula : 'No existe',
            isDivision,
            numero_de_expediente,
            is_expediente_completo,
            juzgado_interviniente,
            dependencia_derivada,
            violencia,
            modalidades,
            tipo_de_violencia: {
                Fisica: fisica,
                Psicologica: psicologica,
                Sexual: sexual,
                Economica_y_patrimonial: economica_y_patrimonial,
                Simbolica: simbolica,
                Politica: politica,
            },
            empleo_de_armas: empleo_de_armas ? empleo_de_armas : false,
            arma_empleada: arma_empleada ? arma_empleada : 'Sin armas',
            medida_solicitada_por_la_victima: medida_solicitada_por_la_victima ? medida_solicitada_por_la_victima : false,
            medida_dispuesta_por_autoridad_judicial: medida_dispuesta_por_autoridad_judicial ? medida_dispuesta_por_autoridad_judicial : false,
            medida: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial) )? prohibicion_de_acercamiento : false,
                restitucion_de_menor: (restitucion_de_menor !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? restitucion_de_menor : false,
                exclusion_de_hogar: (exclusion_de_hogar !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? exclusion_de_hogar : false,
                alimento_provisorio: (alimento_provisorio !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? alimento_provisorio : false,
                derecho_de_comunicacion: (derecho_de_comunicacion !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? derecho_de_comunicacion : false,
                boton_antipanico: (boton_antipanico !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? boton_antipanico : false,
          },
            denunciado_por_tercero: denunciado_por_tercero ? denunciado_por_tercero : false,
            nombre_tercero: nombre_tercero ? nombre_tercero : 'Sin tercero',
            apellido_tercero: apellido_tercero ? apellido_tercero : 'Sin tercero',
            dni_tercero: dni_tercero ? dni_tercero : 'Sin tercero',
            vinculo_con_victima: vinculo_con_la_victima ? vinculo_con_la_victima : 'Sin tercero',
            observaciones,
            denunciada_cargada_por: user_id
        })
        const denunciaSaved = await newDenuncia.save()
        res.send('Denuncia creada con exito')
    } catch (error) {
        console.log(error)
        res.send('No se ingresaron datos')
    }
}

// Eliminar denuncias
export const deleteDenuncia = async (req, res) => {
    try {
        const { id } = req.params

        // Buscar la victima y victimario y restarle 1 denuncia para desvincular
        const denunciaABorrar = await denuncia.findById(id)

        deleteVictima(denunciaABorrar?.victima_ID)
        deleteVictimario(denunciaABorrar?.victimario_ID)

        const denunciaDeleted = await denuncia.findByIdAndDelete(id)
        res.json(denunciaDeleted)
    } catch (error) {
        console.log(error)
    }
}

// Actualizar denuncias
export const updateDenuncia = async (req, res) => {
    try {
        //Edita los parametros de la denuncia salvo los id de la victima y victimario
        const { id } = req.params
        const { nombre_victima, apellido_victima, nombre_victimario, apellido_victimario, genero, fecha, direccion, GIS, barrio, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento, restitucion_de_menor, exclusion_de_hogar, alimento_provisorio,
            derecho_de_comunicacion, nuevoExpediente, boton_antipanico, denunciado_por_tercero, nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_la_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, politica, isExpedienteCompleto } = req.body

        console.log(req.isExpedienteCompleto)

        const denunciaUpdated = await denuncia.findByIdAndUpdate(id, {
            victima_nombre: nombre_victima + ' ' + apellido_victima,
            victimario_nombre: nombre_victimario + ' ' + apellido_victimario,
            genero,
            fecha,
            direccion,
            GIS,
            barrio,
            unidad_de_carga,
            municipio,
            jurisdiccion_policial: jurisdiccion_policial,
            cuadricula: cuadricula,
            isDivision,
            numero_de_expediente: nuevoExpediente,
            juzgado_interviniente,
            dependencia_derivada,
            is_expediente_completo: isExpedienteCompleto,
            violencia,
            modalidades,
            tipo_de_violencia: {
                Fisica: fisica,
                Psicologica: psicologica,
                Sexual: sexual,
                Economica_y_patrimonial: economica_y_patrimonial,
                Simbolica: simbolica,
                Politica: politica,
            },
            empleo_de_armas: empleo_de_armas,
            arma_empleada: arma_empleada,
            medida_solicitada_por_la_victima: medida_solicitada_por_la_victima,
            medida_dispuesta_por_autoridad_judicial: medida_dispuesta_por_autoridad_judicial,
            medida: {
                prohibicion_de_acercamiento: (prohibicion_de_acercamiento !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial) )? prohibicion_de_acercamiento : false,
                restitucion_de_menor: (restitucion_de_menor !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? restitucion_de_menor : false,
                exclusion_de_hogar: (exclusion_de_hogar !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? exclusion_de_hogar : false,
                alimento_provisorio: (alimento_provisorio !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? alimento_provisorio : false,
                derecho_de_comunicacion: (derecho_de_comunicacion !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? derecho_de_comunicacion : false,
                boton_antipanico: (boton_antipanico !== undefined && (medida_solicitada_por_la_victima || medida_dispuesta_por_autoridad_judicial)) ? boton_antipanico : false,
            },
            denunciado_por_tercero: denunciado_por_tercero,
            nombre_tercero: nombre_tercero,
            apellido_tercero: apellido_tercero,
            dni_tercero: dni_tercero,
            vinculo_con_victima: vinculo_con_la_victima,
            observaciones,
        }, { new: true })
        res.json(denunciaUpdated)


    } catch (error) {
        console.log(error)
    }
}

// VÍCTIMA
// Crear víctima
export const createVictima = async (req, res) => {
    //Victima nueva
    try {
        const { nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, vinculo_con_agresor_victima, condicion_de_vulnerabilidad_victima, convivencia, hijos, dependencia_economica, mayor_de_18, menor_de_18, menores_discapacitados, cantidad_hijos_con_agresor } = req.body
        let victimaExistente = await victimas.findOne({ DNI: dni_victima })
        if (req.body.dni_victima && !victimaExistente) {
            const newVictima = new victimas({
                nombre: nombre_victima,
                apellido: apellido_victima,
                edad: edad_victima,
                DNI: dni_victima,
                estado_civil: estado_civil_victima,
                ocupacion: ocupacion_victima,
                vinculo_con_agresor: vinculo_con_agresor_victima,
                condicion_de_vulnerabilidad: condicion_de_vulnerabilidad_victima,
                convivencia: convivencia ? convivencia : false,
                cantidad_de_denuncias_previas: 1,
                hijos: {
                    tiene_hijos: hijos ? hijos : false,
                    dependencia_economica: dependencia_economica ? dependencia_economica : false,
                    mayores_de_edad: mayor_de_18 ? mayor_de_18 : false,
                    menores_de_edad: menor_de_18 ? menor_de_18 : false,
                    menores_discapacitados: menores_discapacitados ? menores_discapacitados : false,
                    hijos_con_el_agresor: cantidad_hijos_con_agresor ? cantidad_hijos_con_agresor : 0,
                }
            })

            const victimaSaved = await newVictima.save()
            res.json({ message: 'Victima creado con exito', id: victimaSaved._id })
        } else {
            res.send('Victima ya existe')
            //Actualiza la victima existente y agrega a cantida de denuncias previas una más
            const victimaUpdated = await victimas.findOneAndUpdate({ DNI: dni_victima }, { $inc: { cantidad_de_denunicas_previas: 1 } }, { new: true })

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
const deleteVictima = async (id) => {
    try {
        // Solo si cantidad de denuncias previas una vez restada, se puede borrar

        const victimaABorrar = await victimas.findById(id)
        if (victimaABorrar?.cantidad_de_denuncias_previas == 1) {
            const victimaDeleted = await victimas.findByIdAndDelete(id)
        } else {
            // Si no es 0, no se puede borrar y debe restar 1 denuncia
            const victimaUpdated = await victimas.findByIdAndUpdate(id, { $inc: { cantidad_de_denuncias_previas: -1 } }, { new: true })
        }
    } catch (error) {
        console.log(error)
    }
}

// Editar víctima
export const updateVictima = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, vinculo_con_agresor_victima, condicion_de_vulnerabilidad_victima, convivencia, hijos, dependencia_economica, mayor_de_18, menor_de_18, menores_discapacitados, cantidad_hijos_con_agresor } = req.body

        const victimaUpdated = await victimas.findByIdAndUpdate(id, {
            nombre: nombre_victima,
            apellido: apellido_victima,
            edad: edad_victima,
            DNI: dni_victima,
            estado_civil: estado_civil_victima,
            ocupacion: ocupacion_victima,
            vinculo_con_agresor: vinculo_con_agresor_victima,
            condicion_de_vulnerabilidad: condicion_de_vulnerabilidad_victima,
            convivencia: convivencia ? convivencia : false,
            hijos: {
                tiene_hijos: hijos ? hijos : false,
                dependencia_economica: dependencia_economica ? dependencia_economica : false,
                mayores_de_edad: mayor_de_18 ? mayor_de_18 : false,
                menores_de_edad: menor_de_18 ? menor_de_18 : false,
                menores_discapacitados: menores_discapacitados ? menores_discapacitados : false,
                hijos_con_el_agresor: cantidad_hijos_con_agresor ? cantidad_hijos_con_agresor : 0,
            }
        }, { new: true })
        res.json(victimaUpdated)
    } catch (error) {
        console.log(error)
    }

}

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
                const victimarioUpdated = await victimario.findOneAndUpdate({ DNI: dni_victimario }, { $inc: { cantidad_de_denuncias_previas: 1 } }, { new: true })
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
const deleteVictimario = async (id) => {
    try {
        const victimarioABorrar = await victimario.findById(id)
        if (victimarioABorrar?.cantidad_de_denuncias_previas == 1) {
            const victimarioDeleted = await victimario.findByIdAndDelete(id)
        } else {
            const victimarioUpdated = await victimario.findByIdAndUpdate(id, { $inc: { cantidad_de_denuncias_previas: -1 } }, { new: true })
        }
    } catch (error) {
        console.log(error)
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


