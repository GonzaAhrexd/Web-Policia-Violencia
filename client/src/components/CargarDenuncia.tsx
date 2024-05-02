import React, { useEffect } from 'react'
import InputRegister from './InputRegister'
import SelectCargaDenuncias from './SelectCargaDenuncias'
import SelectRegister from './SelectRegister'
import InputCheckbox from './InputCheckbox'
import InputDate from './InputDate'
import { useForm } from 'react-hook-form'
import { unidadCampos } from '../GlobalConst/unidadCampos'
import InputExpediente from './InputExpediente'
import { useState } from 'react'
import { getCoords } from '../api/coordinates'
import InputDireccion from './InputDireccion'
interface denunciaProps {
  register: any
  setValue: any
  errors: any
}

function CargarDenuncia({register, setValue, errors}: denunciaProps) {


  const [comisariaPertenece, setComisariaPertenece] = useState('')
  const [isArmas, setIsArmas] = useState(false)
  const [isDivision, setIsDivision] = useState(false)
  const [isSolicitada, setIsSolicitada] = useState(false)
  const [isDispuestoPorAutoridadJudicial, setIsDispuestoPorAutoridadJudicial] = useState(false)
  const [isDenunciadoPorTercero, setIsDenunciadoPorTercero] = useState(false)
  const [municipio, setMunicipio] = useState('')
  const [coordenadas, setCoordenadas] = useState('')
  const [direccion, setDireccion] = useState('')


  const generos = [{ nombre: "Masculino", value: "Masculino" },
  { nombre: "Femenino", value: "Femenino" }]

  const juzgadoIntervinente = [
    { nombre: "Fiscalia Entorno", value: "Fiscalia Entorno" },
    { nombre: "Juzgado de Paz Local", value: "Juzgado de Paz Local" },
    { nombre: "Juzgado  de Faltas Local", value: "Juzgado de Faltas Local" },

  ]

  const opcionesViolencia = [
    { nombre: "Violencia de Género", value: "Violencia de Género" },
    { nombre: "Violencia Familiar", value: "Violencia Familiar" },
  ]

  const opcionesModalidades = [
    { nombre: "Violencia Doméstica", value: "Violencia Doméstica" },
    { nombre: "Violencia Institucional", value: "Violencia Institucional" },
    { nombre: "Violencia contra la Libertad Reproductiva", value: "Violencia contra la Libertad Reproductiva" },
    { nombre: "Violencia Laboral", value: "Violencia Laboral" },
    { nombre: "Violencia Obstétrica", value: "Violencia Obstétrica" },
    { nombre: "Violencia Mediática", value: "Violencia Mediática" },
    { nombre: "Violencia Digital", value: "Violencia Digital" },
    { nombre: "Acoso callejero", value: "Acoso callejero" },
  ]

  const opcionesTiposDeArma = [
    { nombre: "Arma de Fuego", value: "Arma de Fuego" },
    { nombre: "Arma Blanca", value: "Arma Blanca" },
    { nombre: "Elemento Contundente", value: "Elemento Contundente" },
    { nombre: "Elemento Punzante", value: "Elemento Punzante" },
    { nombre: "Elemento Corto Punzante", value: "Elemento Corto Punzante" }
  ]
  
  
  const vinculoConVictima = [
    { nombre: 'Ninguno', value: 'Ninguno' },
    //Parejas
    { nombre: 'Novio/a', value: 'Novio/a' },
    { nombre: 'Ex Novio/a', value: 'Ex Novio/a' },
    { nombre: 'Esposo/a', value: 'Esposo/a' },
    { nombre: 'Ex esposo/a', value: 'Ex esposo/a' },
    { nombre: 'Concubino/a', value: 'Concubino/a' },
    { nombre: 'Ex Concubino/a', value: 'Ex Concubino/a' },
    //Familia
    { nombre: 'Hijo/a', value: 'Hijo/a' },
    { nombre: 'Padre', value: 'Padre' },
    { nombre: 'Madre', value: 'Madre' },
    { nombre: 'Hermano/a', value: 'Hermano/a' },
    { nombre: 'Tío/a', value: 'Tío/a' },
    { nombre: 'Sobrino/a ', value: 'Sobrino/a' },
    { nombre: 'Nieto/a', value: 'Nieto/a' },
    { nombre: 'Abuelo/a', value: 'Abuelo/a' },
    { nombre: 'Primo/a', value: 'Primo/a' },
    //No familia
    { nombre: 'Cuñado/a', value: 'Cuñado/a' },
    { nombre: 'Ex cuñado/a', value: 'Ex cuñado/a' },
    { nombre: 'Suegro/a', value: 'Suegro/a' },
    { nombre: 'Ex suegro/a', value: 'Ex suegro/a' },
    { nombre: 'Yerno', value: 'Yerno' },
    { nombre: 'Nuera', value: 'Nuera' },
    { nombre: 'Madrastra', value: 'Madrastra' },
    { nombre: 'Padrastro', value: 'Padrastro' },
    { nombre: 'Hijastro', value: 'Hijastro' },
    { nombre: 'Colega', value: 'Colega' },
    { nombre: 'Otros', value: 'Otros' },
  ]

  
  const consultarCoordenadas = async () => {

    let buscarDir = direccion + "," + municipio 
    const fetchCoords = async () => {
        const coords = await getCoords(buscarDir);
        const coordenadasObtenidas = coords.lat + " " + coords.lon // Aquí puedes hacer lo que necesites con las coordenadas
        return coordenadasObtenidas
      };

    if (buscarDir){
        fetchCoords().then((response) => {
          setCoordenadas(response)
        })
        
    }
}

  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col xl:flex-row'>
        <SelectRegister campo="Género" nombre="genero" opciones={generos} register={register} setValue={setValue} type="text" error={errors.genero} />
        <InputDate campo="Fecha" nombre="fecha" register={register} type="text" error={errors.fecha} />
      </div>
      <div className='flex flex-col'>
        <SelectCargaDenuncias consultarCoordenadas={consultarCoordenadas} direccion={direccion} setDireccion={setDireccion} coordenadas={coordenadas} setCoordenadas={setCoordenadas} errors={errors} setMunicipio={setMunicipio} campo="Unidad de carga" setComisariaPertenece={setComisariaPertenece} nombre="unidad_de_carga" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} state={isDivision} />
        <InputCheckbox campo="División Violencia Familiar y de Género" nombre="isDivision" register={register} setValue={setValue} type="checkbox" setHook={setIsDivision} state={isDivision} id="division" />
        <InputExpediente campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />
      </div>
   
      <div className='flex flex-col md:flex-row'>
        <SelectCargaDenuncias campo="Juzgado Interviniente" nombre="juzgado_interviniente"  opciones={juzgadoIntervinente}  register={register} setValue={setValue} type="text" error={errors.juzgado_interviniente} />
        <InputRegister campo="Dependencia Derivada" nombre="dependencia_derivada" register={register} setValue={setValue} type="text" error={errors.dependencia_derivada} />
      </div>
      <div className='flex flex-col md:flex-row'>
        <SelectCargaDenuncias campo="Violencia" nombre="violencia" opciones={opcionesViolencia} register={register} setValue={setValue} type="text" error={errors.violencia} />
        <SelectCargaDenuncias campo="Modalidades" nombre="modalidades" opciones={opcionesModalidades} register={register} setValue={setValue} type="text" error={errors.modalidades} />
      </div>
      <>
        <span className='ml-4 font-medium xl:text-vw'> Tipo de Violencia </span>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3`}>
          <InputCheckbox campo="Física" nombre="fisica" register={register} setValue={setValue} type="checkbox" id="fisica" />
          <InputCheckbox campo="Psicológica" nombre="psicologica" register={register} setValue={setValue} type="checkbox" id="psicologica" />
          <InputCheckbox campo="Sexual" nombre="sexual" register={register} setValue={setValue} type="checkbox" id="sexual" />
          <InputCheckbox campo="Económica y Patrimonial" nombre="economica_y_patrimonial" register={register} setValue={setValue} type="checkbox" id="economica_patrimonial" />
          <InputCheckbox campo="Simbólica" nombre="simbolica" register={register} setValue={setValue} type="checkbox" id="simbolica" />
        </div>
      </>
      <div className='flex flex-col'>
        <span className='ml-4 font-medium xl:text-vw'> Empleo de armas </span>

        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Empleo de Armas" nombre="empleo_de_armas" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsArmas} state={isArmas} id="empleo_de_armas" />
          {isArmas &&
            <>
              <SelectCargaDenuncias campo="" nombre="tipo_de_arma" opciones={opcionesTiposDeArma} register={register} setValue={setValue} type="text" error={errors.modalidad} />
            </>
          }
        </div>
      </div>
      <div className='flex flex-col'>
        <span className='ml-4 font-medium xl:text-vw'> Medida Solicitada </span>
        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Solicitada" nombre="medida_solicitada_por_la_victima" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsSolicitada} state={isSolicitada} id="solicitada" />
          <InputCheckbox campo="Dispuesto Por Autoridad Judicial" nombre="medida_dispuesta_por_autoridad_judicial" register={register} setValue={setValue} type="checkbox" error={errors.dispuestoPorAutoridadJudicial} setHook={setIsDispuestoPorAutoridadJudicial} state={isDispuestoPorAutoridadJudicial} id="dispuestoPorAutoridad" />
        </div>
        </div>
        {(isDispuestoPorAutoridadJudicial || isSolicitada) &&
        <>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
              <InputCheckbox campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento" register={register} setValue={setValue} type="checkbox" id="prohibicion" />
              <InputCheckbox campo="Restitución de Menor" nombre="restitucion_de_menor" register={register} setValue={setValue} type="checkbox" id="restitucion" />
              <InputCheckbox campo="Exclusión Hogar" nombre="exclusion_de_hogar" register={register} setValue={setValue} type="checkbox" id="exclusion" />
              <InputCheckbox campo="Alimento Provisorio" nombre="alimento_provisorio" register={register} setValue={setValue} type="checkbox" id="alimentoProvisorio" />
              <InputCheckbox campo="Derecho Comunicación" nombre="derecho_de_comunicacion" register={register} setValue={setValue} type="checkbox" id="derechoComunicacion" />
              <InputCheckbox campo="Botón Antipánico" nombre="boton_antipanico" register={register} setValue={setValue} type="checkbox" id="botonAntipanico" />
          <div/>
        </div>
        </>
        }
         <div className='flex flex-col'>
        <span className='ml-4 font-medium xl:text-vw'> Denunciado por tercero</span>
        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Denunciado por tercero" nombre="denunciado_por_tercero" register={register} setValue={setValue} type="checkbox" error={errors.denunciado_por_tercero} setHook={setIsDenunciadoPorTercero} state={isDenunciadoPorTercero} id="denunciadoPorTercero" />
         </div>
         {isDenunciadoPorTercero &&
         <> 
         <div className='flex flex-col md:flex-row'>
         <InputRegister campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} type="text" error={errors.nombre} />
         <InputRegister campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} type="text" error={errors.apellido} />
         <InputRegister campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} type="text" error={errors.DNI} />
         </div>
         <div className='flex flex-col'>
         
         <SelectRegister campo="Vinculo con la víctima" nombre="vinculo_con_la_victima" opciones={vinculoConVictima} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor} />
          </div>
         </>
        }
        </div>
      </div>
  )
}

export default CargarDenuncia