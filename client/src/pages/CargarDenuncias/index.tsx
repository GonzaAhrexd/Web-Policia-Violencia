import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useState } from 'react';
import CargarVictima from '../../components/CargarVictima';
import CargarVictimario from '../../components/CargarVictimario';
import CargarDenuncia from '../../components/CargarDenuncia';
import CargarObservaciones from '../../components/CargarObservaciones';
import { useForm } from 'react-hook-form';
import { crearDenuncia, agregarVictima, agregarVictimario } from '../../api/crud';
function CargarDenuncias() {
  const { control, register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()
  //@ts-ignore
  const { signUp, user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />


  if (user.rol === 'carga' || user.rol === 'admin') {
    return (
      <>
        <NavBar user={user} />
        <div className='h-screen sm:h-full p-2 sm:p-10'>
          <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
          <div>
            <h1 className='text-2xl my-5'>Victima</h1>
            <form action="" onSubmit={
              handleSubmit(async (values) => {
                console.log(values)
                
                const idVictima = await agregarVictima(values).then((id) => {
                  return id
                })
                values.dni_victimario = values.dni_victimario ? values.dni_victimario : 'S/N'
                const idVictimario = await agregarVictimario(values).then((id) => {
                  return id
                })

                values.victima_ID = idVictima
                values.victimario_ID = idVictimario
                if(!values.Expediente) {
                  values.Expediente = 'S/N'
                  values.is_expediente_completo = false
                }else{
                  values.is_expediente_completo = true
                }

                values.numero_de_expediente = values.PrefijoExpediente + values.numero_de_expediente + values.Expediente + values.SufijoExpediente
                crearDenuncia(values)

                console.log(values.observaciones)

              })}>
              <div className='flex justify-center'>
                <CargarVictima register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Victimario</h1>
              <div className='flex justify-center'>
                <CargarVictimario register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Hecho</h1>
              <div className='flex justify-center'>

                <CargarDenuncia register={register} setValue={setValue} errors={errors} />

              </div>
              <h1 className='text-2xl my-5'>Observaciones o denuncia</h1>
              <div className='flex justify-center h-80'>
                <CargarObservaciones register={register} setValue={setValue} errors={errors} />
              </div>

              <div className="flex justify-center my-3">
                <button className='bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-6/10' type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Navigate to="/" replace />
    );
  }
}

export default CargarDenuncias