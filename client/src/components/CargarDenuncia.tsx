import React from 'react'
import InputRegister from './InputRegister'
import SelectCargaDenuncias from './SelectCargaDenuncias'
import SelectRegister from './SelectRegister'

import InputDate from './InputDate'
import { useForm } from 'react-hook-form'
import { unidadCampos } from '../GlobalConst/unidadCampos'
import InputExpediente from './InputExpediente'
function CargarDenuncia() {
  const { control, register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()

  const [comisariaPertenece, setComisariaPertenece] = React.useState('')

  const generos = [{nombre: "Masculino", value: "Masculino"},
                   {nombre: "Femenino", value: "Femenino"}]


  //Cómo extiendo unidadCampos para agregarle más subunidades al de Resistencia? 
  
  
  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row'>
      <InputExpediente campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="Número de Expediente" register={register} setValue={setValue} type="text" error={errors.expediente}  />
      <SelectRegister campo="Género" nombre="Género" opciones={generos} register={register} setValue={setValue} type="text" error={errors.genero} />
      <InputDate campo="Fecha" nombre="Fecha" register={register}  type="text" error={errors.fecha}  />
      </div>
      <div className='flex flex-col md:flex-row'>
      <InputRegister campo="Dirección" nombre="Dirección" register={register} setValue={setValue} type="text" error={errors.direccion} />
      <InputRegister campo="GIS" nombre="GIS" register={register} setValue={setValue} type="text" error={errors.gis} />
      <InputRegister campo="Barrio" nombre="Barrio" register={register} setValue={setValue} type="text" error={errors.barrio} />
       </div>
       <div className='flex flex-col md:flex-row'>
        <SelectCargaDenuncias campo="Unidad de carga" setComisariaPertenece={setComisariaPertenece} nombre="Unidad de carga" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
       </div>

       <div className='flex flex-col md:flex-row'>
      <InputRegister campo="Juzgado Interviniente" nombre="Juzgado Interviniente" register={register} setValue={setValue} type="text" error={errors.juzgado_interviniente} />
      <InputRegister campo="Dependencia Derivada" nombre="Dependencia Derivada" register={register} setValue={setValue} type="text" error={errors.dependencia_derivada} />
      </div>
      
      <div className='flex flex-col md:flex-row'>
      <InputDate campo="Fecha de ingreso" nombre="Fecha de ingreso" register={register}  type="text" error={errors.fecha_ingreso}  />
      <InputDate campo="Fecha de salida" nombre="Fecha de salida" register={register}  type="text" error={errors.fecha_salida}  />
     
      </div>
    </div>
  )
}

export default CargarDenuncia