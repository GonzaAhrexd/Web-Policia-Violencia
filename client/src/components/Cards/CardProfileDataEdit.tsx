import React from 'react'
import InputRegister from '../InputRegister'
import SelectRegister from '../SelectRegister'
import { useForm } from 'react-hook-form'
import { jerarquiaCampos } from '../../pages/Perfil/jerarquiaCampos';
import { unidadCampos } from '../../pages/Perfil/unidadCampos';
import { zonaCampos } from '../../pages/Perfil/zonaCampos';
import { useAuth } from '../../context/auth';
//@ts-ignore
function CardProfileDataEdit({ user }) {

  const { control, register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()

  // @ts-ignore
  const { editProfile } = useAuth()

  return (
    <div className="h-full bg-gray-950 pt-12 rounded-xl ">
      <div className="mx-auto w-95/100 h-full bg-gray-600 rounded-lg overflow-hidden shadow-lg">
        <form action="" className='flex flex-col w-95/100'
          onSubmit={
            handleSubmit(async (values) => {
              console.log(values)
              editProfile(values)

            })}>
          <InputRegister campo="id" nombre="id" register={register} setValue={setValue} type="hidden" error={errors.nombre} valor={user.id} />
          <div className='flex flex-col md:flex-row'>
            
            <InputRegister campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} valor={user.nombre} />
            <InputRegister campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} valor={user.apellido} />
          </div>
          <div className='flex flex-col md:flex-row'>
            <InputRegister campo="Teléfono" nombre="telefono" placeholder={user.telefono} register={register} setValue={setValue} type="number" error={errors.telefono} valor={user.telefono} />
            <InputRegister campo="Nombre de usuario" nombre="nombre_de_usuario" register={register} setValue={setValue} type="text" error={errors.nombre_de_usuario} valor={user.username} />
          </div>

          <div className='flex flex-col md:flex-row'>
            <InputRegister campo="N° de Credencial" nombre="credencial" register={register} setValue={setValue} type="text" error={errors.credencial} valor={user.credencial} />
            <SelectRegister campo="Jerarquía" nombre="jerarquia" opciones={jerarquiaCampos} register={register} setValue={setValue} type="text" error={errors.jerarquia} valorOriginal={user.jerarquia} />

          </div>
          <div className='flex flex-col md:flex-row'>
            <InputRegister campo="N° de Plaza" nombre="plaza" register={register} setValue={setValue} type="text" error={errors.plaza} valor={user.plaza} />
            <SelectRegister campo="Zona" nombre="zona" opciones={zonaCampos} register={register} setValue={setValue} type="text" error={errors.zona} valorOriginal={user.zona} />
          </div>
          <SelectRegister campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} valorOriginal={user.unidad} />

          <div className="flex gap-2 px-2 py-2">
            <button
              className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Modificar
            </button>

          </div>
        </form>
      </div>
    </div>


  )
}

export default CardProfileDataEdit