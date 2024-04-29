import victimas from '../models/victimas'
import victimario from '../models/victimario'
import denuncia from '../models/denuncias'
export const getDenuncia = async (req, res) => {
}

export const getDenuncias = async (req, res) => {
}

export const createDenuncia = async (req, res) => {
    console.log("Llegó")
    try {
        const {victima_ID, victimario_ID, genero, fecha, direccion, GIS, barrio, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento,   restitucion_de_menor,exclusión_de_hogar, alimento_provisorio, 
        derecho_de_comunicacion,boton_antipanico, denunciado_por_tecero, nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_victima, observaciones} = req.body

        const { Fisica, Psicologica, Sexual, Economica_y_patrimonial, Simbolica } = tipo_de_violencia

        const newDenuncia = new denuncia({
            victima_ID, 
            victimario_ID,
            genero, 
            fecha, 
            direccion, 
            GIS, 
            barrio, 
            unidad_de_carga, 
            municipio, 
            jurisdiccion_policial, 
            cuadricula, 
            isDivision, 
            numero_de_expediente, 
            juzgado_interviniente, 
            dependencia_derivada, 
            violencia, 
            modalidades, 
            tipo_de_violencia: { 
                Fisica: Fisica, 
                Psicologica: Psicologica, 
                Sexual: Sexual, 
                Economica_y_patrimonial: Economica_y_patrimonial, 
                Simbolica: Simbolica, 
            },
            empleo_de_armas, 
            arma_empleada, 
            medida_solicitada_por_la_victima, 
            medida_dispuesta_por_autoridad_judicial, 
            prohibicion_de_acercamiento, 
            restitucion_de_menor,
            exclusión_de_hogar, 
            alimento_provisorio, 
            derecho_de_comunicacion,
            boton_antipanico, 
            denunciado_por_tecero, 
            nombre_tercero, 
            apellido_tercero, 
            dni_tercero,
            vinculo_con_victima,
            observaciones
        })
        const denunciaSaved = await newDenuncia.save()
        res.send('Denuncia creada con exito')
    }catch(error){
        console.log(error)
        res.send('No se ingresaron datos')
    }
}

export const deleteDenuncia = async (req, res) => {
}

export const updateDenuncia = async (req, res) => {
}

export const createVictima = async (req, res) => {
    console.log("Llegó")
    console.log(req.body)
    //Victima nueva
    try {
        const { nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil_victima, ocupacion_victima, vinculo_con_agresor_victima, condicion_de_vulnerabilidad_victima, convivencia,  tiene_hijos, dependencia_economica, mayor_de_18, menor_de_18, menores_discapacitados, cantidad_hijos_con_agresor } = req.body
        
//        console.log(nombre_victima, apellido_victima, edad_victima, dni_victima, estado_civil, ocupacion, vinculo_con_agresor, condicion_de_vulnerabilidad, convivencia,  tiene_hijos, dependencia_economica, mayores_de_edad, menores_de_edad, menores_discapacitados, hijos_con_el_agresor, cantidad_hijos)
       
        let victimaExistente = await victimas.findOne({ DNI: dni_victima })        
        
        
        if (req.body.dni_victima && !victimaExistente) {
            const newVictima = new victimas({
                nombre: nombre_victima, 
                apellido: apellido_victima,
                edad: edad_victima,
                DNI: dni_victima, 
                estado_civil: estado_civil_victima,
                ocupacion: estado_civil_victima,
                vinculo_con_agresor: vinculo_con_agresor_victima,
                condicion_de_vulnerabilidad: condicion_de_vulnerabilidad_victima,
                convivencia: convivencia? convivencia: false,
                cantidad_de_denuncias_previas: 1, 
                hijos: {
                    tiene_hijos:  tiene_hijos ? tiene_hijos : false,
                    dependencia_economica: dependencia_economica ? dependencia_economica : false,
                    mayores_de_edad: mayor_de_18 ? mayor_de_18 : false,
                    menores_de_edad: menor_de_18 ? menor_de_18 : false,
                    menores_discapacitados: menores_discapacitados ? menores_discapacitados : false,
                    hijos_con_el_agresor: cantidad_hijos_con_agresor ? cantidad_hijos_con_agresor : 0,
                }
            })
            
            const victimaSaved = await newVictima.save()
            res.send('Victima creada con exito')
        }else{
            res.send('Victima ya existe')                   
            //Actualiza la victima existente y agrega a cantida de denuncias previas una más
            const victimaUpdated = await victimas.findOneAndUpdate({ DNI: dni_victima }, { $inc: { cantidad_de_denunicas_previas: 1 } }, { new: true })
        }
        
    }catch(error){
        console.log(error)
        res.send('Victima ya existe o no se ingresaron datos')
    }
}

export const deleteVictima = async (req, res) => {
}

export const updateVictima = async (req, res) => {
}

export const createVictimario = async (req, res) => {
    try {
        const { nombre, apellido, edad, DNI, estado_civil, ocupacion, abuso_de_alcohol, antecedentes_toxicologicos, antecedentes_penales, antecedentes_contravencionales, entrenamiento_en_combate, notificacion,  } = req.body
        let victimaExistente = await victimario.findOne({ DNI: DNI })        
        if (req.body.DNI && !victimaExistente) {
            const newVictimario = new victimario({
                nombre,
                apellido,
                edad, 
                DNI, 
                estado_civil, 
                ocupacion, 
                abuso_de_alcohol, 
                antecedentes_toxicologicos, 
                antecedentes_penales, 
                antecedentes_contravencionales, 
                entrenamiento_en_combate, 
                notificacion, 
                cantidad_de_denuncias_previas: 1
            })
            
            const victimarioSaved = await newVictimario.save()
            res.send('Victimario creado con exito')
        }else{
            res.send('Victimario ya existe')                   
            //Actualiza al victimario existente y agrega a cantida de denuncias previas una más
            const victimarioUpdated = await victimario.findOneAndUpdate({ DNI: DNI }, { $inc: { cantidad_de_denuncias_previas: 1 } }, { new: true })
     
        }
        
    }catch(error){
        console.log(error)
        res.send('Victima ya existe o no se ingresaron datos')
    }
}

export const deleteVictimario = async (req, res) => {
}

export const updateVictimario = async (req, res) => {
}


