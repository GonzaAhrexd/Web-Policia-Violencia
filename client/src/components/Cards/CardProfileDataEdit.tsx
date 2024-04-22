import InputRegister from '../InputRegister'
import SelectRegister from '../SelectRegister'
import { useForm } from 'react-hook-form'
import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos';
import { unidadCampos } from '../../GlobalConst/unidadCampos';
import { zonaCampos } from '../../GlobalConst/zonaCampos';
import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
//@ts-ignore
function CardProfileDataEdit({ user }) {

  const { control, register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()

  const [mensajeError, setMensajeError] = useState("")


  // @ts-ignore
  const { editProfile } = useAuth()

  return (
    <div className=" mt-10 sm:mt-0 sm:h-full bg-gray-900 pt-6 sm:pt-12 rounded-xl  ">
      <div className="mx-auto w-95/100  bg-gray-500 rounded-lg overflow-hidden shadow-lg">
        <form className='flex flex-col w-95/100'
          onSubmit={handleSubmit(async (values) => {
             if (values.telefono.length && values.telefono.length != 10) {
              console.log("El teléfono debe tener 10 dígitos")
              setMensajeError("El teléfono debe tener 10 dígitos");
            }
            else {
              try {
                const response = await editProfile(values);
                if(response) {
                  setMensajeError('')
                  window.location.reload()
                }else {
                 setMensajeError("Usuario ya existe")
              }

              } catch (error) { 
                console.log(error)
                setMensajeError("Usuario ya existente")
              }
            }
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
          <SelectRegister campo="Jerarquía" nombre="jerarquia" opciones={jerarquiaCampos} register={register} setValue={setValue} type="text" error={errors.jerarquia} />

        </div>
        <div className='flex flex-col md:flex-row'>
          <InputRegister campo="N° de Plaza" nombre="plaza" register={register} setValue={setValue} type="text" error={errors.plaza} valor={user.plaza} />
          <SelectRegister campo="Zona" nombre="zona" opciones={zonaCampos} register={register} setValue={setValue} type="text" error={errors.zona} />
        </div>
        <SelectRegister campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
        <span className='text-red-400 pl-3'> {mensajeError} </span>

        <div className="flex gap-2 px-2 py-2">
          <button
            className="flex-1 rounded-full bg-sky-950 hover:bg-sky-700 text-white dark:text-white antialiased font-bold px-4 py-2">
            Modificar
          </button>

        </div>
      </form>
    </div>
    </div >


  )
}

export default CardProfileDataEdit