import React from 'react'
import InputRegister from './InputRegister'
import SelectCargaDenuncias from './SelectCargaDenuncias'
import SelectRegister from './SelectRegister'

import InputDate from './InputDate'
import { useForm } from 'react-hook-form'
import { unidadCampos } from '../GlobalConst/unidadCampos'

function CargarDenuncia() {
  const { control, register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()

  const generos = [{nombre: "Masculino", value: "Masculino"},
                   {nombre: "Femenino", value: "Femenino"}]

  console.log(unidadCampos)
  //Cómo extiendo unidadCampos para agregarle más subunidades al de Resistencia? 
  
  
  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row'>
      <SelectRegister campo="Género" nombre="Género" opciones={generos} register={register} setValue={setValue} type="text" error={errors.nombre} />
      <InputDate campo="Fecha" nombre="Género" register={register}  type="text" error={errors.nombre}  />
      </div>
      <div className='flex flex-col md:flex-row'>
      <InputRegister campo="Dirección" nombre="Dirección" register={register} setValue={setValue} type="text" error={errors.nombre} />
      <InputRegister campo="GIS" nombre="GIS" register={register} setValue={setValue} type="text" error={errors.nombre} />
       </div>
       <div className='flex flex-col md:flex-row'>
        <SelectCargaDenuncias campo="Unidad de carga" nombre="Unidad de carga" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />

       </div>
    </div>
  )
}

export default CargarDenuncia