import React from 'react'
import InputRegister from './InputRegister'
import SelectCargaDenuncias from './SelectCargaDenuncias'
import SelectRegister from './SelectRegister'
import InputCheckbox from './InputCheckbox'
import InputDate from './InputDate'
import { useForm } from 'react-hook-form'
import { unidadCampos } from '../GlobalConst/unidadCampos'
import InputExpediente from './InputExpediente'
import { useState } from 'react'
function CargarDenuncia() {
  const { control, register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()

  const [comisariaPertenece, setComisariaPertenece] = useState('')
  const [isArmas, setIsArmas] = useState(false)
  const [isDivision, setIsDivision] = useState(false)
  const [isSolicitada, setIsSolicitada] = useState(false)
  const [isDispuestoPorAutoridadJudicial, setIsDispuestoPorAutoridadJudicial] = useState(false)
  const [isDenunciadoPorTercero, setIsDenunciadoPorTercero] = useState(false)


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
    { nombre: "Acoso callejero", value: "Acoso callejero" },
  ]

  const opcionesTiposDeArma = [
    { nombre: "Arma de Fuego", value: "Arma de Fuego" },
    { nombre: "Arma Blanca", value: "Arma Blanca" },
    { nombre: "Elemento Contundente", value: "Elemento Contundente" },
    { nombre: "Elemento Punzante", value: "Elemento Punzante" },
    { nombre: "Elemento Corto Punzante", value: "Elemento Corto Punzante" }
  ]
  //Cómo extiendo unidadCampos para agregarle más subunidades al de Resistencia? 


  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row'>
        <SelectRegister campo="Género" nombre="Género" opciones={generos} register={register} setValue={setValue} type="text" error={errors.genero} />
        <InputDate campo="Fecha" nombre="Fecha" register={register} type="text" error={errors.fecha} />
      </div>
      <div className='flex flex-col md:flex-row'>
        <InputRegister campo="Dirección" nombre="Dirección" register={register} setValue={setValue} type="text" error={errors.direccion} />
        <InputRegister campo="GIS" nombre="GIS" register={register} setValue={setValue} type="text" error={errors.gis} />
        <InputRegister campo="Barrio" nombre="Barrio" register={register} setValue={setValue} type="text" error={errors.barrio} />
      </div>
      <div className='flex flex-col'>
        <SelectCargaDenuncias campo="Unidad de carga" setComisariaPertenece={setComisariaPertenece} nombre="Unidad de carga" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} state={isDivision} />
        <InputCheckbox campo="División Violencia Familiar y de Género" nombre="División Violencia Familiar y de Género" register={register} setValue={setValue} type="checkbox" setHook={setIsDivision} state={isDivision} id="division" />
        <InputExpediente campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="Número de Expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />

      </div>

      <div className='flex flex-col md:flex-row'>
        <SelectCargaDenuncias campo="Juzgado Interviniente" opciones={juzgadoIntervinente} nombre="Unidad de carga" register={register} setValue={setValue} type="text" error={errors.unidad} />
        <InputRegister campo="Dependencia Derivada" nombre="Dependencia Derivada" register={register} setValue={setValue} type="text" error={errors.dependencia_derivada} />
      </div>
      <div className='flex flex-col md:flex-row'>
        <SelectCargaDenuncias campo="Violencia" nombre="Violencia" opciones={opcionesViolencia} register={register} setValue={setValue} type="text" error={errors.violencia} />
        <SelectCargaDenuncias campo="Modalidades" nombre="Modalidades" opciones={opcionesModalidades} register={register} setValue={setValue} type="text" error={errors.modalidad} />
      </div>
      <>
        <span className='ml-4 font-medium xl:text-vw'> Tipo de Violencia </span>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3`}>
          <InputCheckbox campo="Física" nombre="Física" register={register} setValue={setValue} type="checkbox" id="fisica" />
          <InputCheckbox campo="Psicológica" nombre="Psicológica" register={register} setValue={setValue} type="checkbox" id="psicologica" />
          <InputCheckbox campo="Sexual" nombre="Sexual" register={register} setValue={setValue} type="checkbox" id="sexual" />
          <InputCheckbox campo="Económica y Patrimonial" nombre="Económica y Patrimonial" register={register} setValue={setValue} type="checkbox" id="economica_patrimonial" />
          <InputCheckbox campo="Simbólica" nombre="Simbólica" register={register} setValue={setValue} type="checkbox" id="simbolica" />
        </div>
      </>
      <div className='flex flex-col'>
        <span className='ml-4 font-medium xl:text-vw'> Empleo de armas </span>

        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Empleo de Armas" nombre="Se emplearon armas" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsArmas} state={isArmas} id="empleo_de_armas" />
          {isArmas &&
            <>
              <SelectCargaDenuncias campo="" nombre="Tipo de Arma" opciones={opcionesTiposDeArma} register={register} setValue={setValue} type="text" error={errors.modalidad} />
            </>
          }
        </div>
      </div>
      <div className='flex flex-col'>
        <span className='ml-4 font-medium xl:text-vw'> Medida Solicitada </span>
        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Solicitada" nombre="Solicitada" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsSolicitada} state={isSolicitada} id="solicitada" />
          <InputCheckbox campo="Dispuesto Por Autoridad Judicial" nombre="Dispuesto Por Autoridad Judicial" register={register} setValue={setValue} type="checkbox" error={errors.dispuestoPorAutoridadJudicial} setHook={setIsDispuestoPorAutoridadJudicial} state={isDispuestoPorAutoridadJudicial} id="dispuestoPorAutoridad" />
        </div>
        </div>
        {(isDispuestoPorAutoridadJudicial || isSolicitada) &&
        <>
        <div className='flex flex-col md:flex-row'>
              <InputCheckbox campo="Prohibición de Acercamiento" nombre="Prohibición de Acercamiento" register={register} setValue={setValue} type="checkbox" id="prohibicion" />
              <InputCheckbox campo="Restitución de Menor" nombre="Restitución de Menor" register={register} setValue={setValue} type="checkbox" id="restitucion" />
              <InputCheckbox campo="Exclusión Hogar" nombre="Exclusión Hogar" register={register} setValue={setValue} type="checkbox" id="exclusion" />
              <InputCheckbox campo="Alimento Provisorio" nombre="Alimento Provisorio" register={register} setValue={setValue} type="checkbox" id="alimentoProvisorio" />
              <InputCheckbox campo="Derecho Comunicación" nombre="Derecho Comunicación" register={register} setValue={setValue} type="checkbox" id="derechoComunicacion" />
              <InputCheckbox campo="Botón Antipánico" nombre="Botón Antipánico" register={register} setValue={setValue} type="checkbox" id="botonAntipanico" />
          <div/>
        </div>
        </>
        }
         <div className='flex flex-col'>
        <span className='ml-4 font-medium xl:text-vw'> Denunciado por tercero</span>
        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Denunciado por tercero" nombre="Denunciado por tercero" register={register} setValue={setValue} type="checkbox" error={errors.denunciado_por_tercero} setHook={setIsDenunciadoPorTercero} state={isDenunciadoPorTercero} id="denunciadoPorTercero" />
         </div>
         {isDenunciadoPorTercero &&
         <div className='flex flex-col md:flex-row'>
         <InputRegister campo="Nombre" nombre="Nombre" register={register} setValue={setValue} type="text" error={errors.nombre} />
         <InputRegister campo="Apellido" nombre="Apellido" register={register} setValue={setValue} type="text" error={errors.apellido} />
         <InputRegister campo="DNI" nombre="DNI" register={register} setValue={setValue} type="text" error={errors.DNI} />

         </div>
        }
        </div>
      </div>
  )
}

export default CargarDenuncia