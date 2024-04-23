import React from 'react'
import InputRegister from './InputRegister'
import { useForm } from 'react-hook-form'
function CargarVictimario() {
    const { register, setValue, formState: {
        errors
      } } = useForm()

  return (
<div className='w-6/10'>
    <div className='flex flex-col md:flex-row'>
        <InputRegister campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} />
        <InputRegister campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} />
    </div>
    
    <div className='flex flex-col md:flex-row'>
        <InputRegister campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} />
        <InputRegister campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} />
    </div>
    
    <div className='flex flex-col md:flex-row'>
        <InputRegister campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} />
        <InputRegister campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} />
    </div>
    </div>
  )
}

export default CargarVictimario