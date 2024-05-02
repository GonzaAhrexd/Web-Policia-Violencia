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
        const {victima_ID, victimario_ID, dni_victima, dni_victimario, genero, fecha, direccion, GIS, barrio, unidad_de_carga, municipio, jurisdiccion_policial, cuadricula, isDivision, numero_de_expediente, juzgado_interviniente, dependencia_derivada, violencia, modalidades, tipo_de_violencia, empleo_de_armas, arma_empleada, medida_solicitada_por_la_victima, medida_dispuesta_por_autoridad_judicial, prohibicion_de_acercamiento,   restitucion_de_menor,exclusion_de_hogar, alimento_provisorio, 
        derecho_de_comunicacion,boton_antipanico, denunciado_por_tecero, nombre_tercero, apellido_tercero, dni_tercero, vinculo_con_victima, observaciones, fisica, psicologica, sexual, economica_y_patrimonial, simbolica, nombre_victimario, apellido_victimario, is_expediente_completo} = req.body


        console.log(req.body)
        
        const findVictima = await victimas.findOne({ DNI: dni_victima })
        let findVictimario

        if(dni_victimario == "S/N"){
            findVictimario = victimario_ID
        }else{
            findVictimario = await victimario.findOne({ DNI: dni_victimario })
        }



        const newDenuncia = new denuncia({
            victima_ID: findVictima?._id ? findVictima._id : victima_ID, 
            victimario_ID: findVictimario?._id ? findVictimario._id : victimario_ID,
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
            },
            empleo_de_armas : empleo_de_armas ? empleo_de_armas : false, 
            arma_empleada: arma_empleada ? arma_empleada : 'Sin armas', 
            medida_solicitada_por_la_victima: medida_solicitada_por_la_victima ? medida_solicitada_por_la_victima : false, 
            medida_dispuesta_por_autoridad_judicial: medida_dispuesta_por_autoridad_judicial ? medida_dispuesta_por_autoridad_judicial : false, 
            medida: {
                prohibicion_de_acercamiento: prohibicion_de_acercamiento ? prohibicion_de_acercamiento : false, 
                restitucion_de_menor: restitucion_de_menor ? restitucion_de_menor : false,
                exclusion_de_hogar: exclusion_de_hogar ? exclusion_de_hogar : false, 
                alimento_provisorio: alimento_provisorio ? alimento_provisorio : false, 
                derecho_de_comunicacion: derecho_de_comunicacion ? derecho_de_comunicacion : false,
                boton_antipanico: boton_antipanico ? boton_antipanico : false, 
            },
            denunciado_por_tecero: denunciado_por_tecero ? denunciado_por_tecero : false, 
            nombre_tercero: nombre_tercero ? nombre_tercero : 'Sin tercero', 
            apellido_tercero: apellido_tercero ? apellido_tercero : 'Sin tercero', 
            dni_tercero: dni_tercero ? dni_tercero : 'Sin tercero',
            vinculo_con_victima: vinculo_con_victima ? vinculo_con_victima : 'Sin tercero',
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
            res.json({ message: 'Victima creado con exito', id: victimaSaved._id })
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
        const { nombre_victimario, apellido_victimario, edad_victimario, dni_victimario, estado_civil_victimario, ocupacion_victimario, abuso_de_alcohol, antecedentes_toxicologicos, antecedentes_penales, antecedentes_contravencionales, entrenamiento_en_combate, notificacion,  } = req.body
        console.log(req.body)

        let victimarioExistente
        if(dni_victimario != "S/N"){
            victimarioExistente = await victimario.findOne({ DNI: dni_victimario })        
        }else{
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

        }else{
            res.send('Victimario ya existe')                   
            //Actualiza al victimario existente y agrega a cantida de denuncias previas una más
            if(dni_victimario != "S/N"){
                const victimarioUpdated = await victimario.findOneAndUpdate({ DNI: dni_victimario }, { $inc: { cantidad_de_denuncias_previas: 1 } }, { new: true })  
            }
          
     
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


