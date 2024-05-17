// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// Conexión con BackEnd
import { crearDenuncia, agregarVictima, agregarVictimario } from '../../api/crud';

// Librerías React
import Swal from 'sweetalert2'

// Componentes
import CargarVictimaAgente from '../../components/Cargar/CargarAgente/CargarVictimaAgente';
import CargarObservaciones from '../../components/Cargar/CargarObservaciones';
import CargarPreguntas from '../../components/Cargar/CargarAgente/CargarPreguntas';
import CargarInstructorYSecretario from '../../components/Cargar/CargarAgente/CargarInstructor';

interface CargarDenunciasRolCargaProps {
    user: any;
    }

function CargarDenunciasRolAgente({user}: CargarDenunciasRolCargaProps) {
    const {  register, handleSubmit, setValue, formState: {
        errors
      } } = useForm()
      
    
  return (
    <div className='h-screen sm:h-full p-2 sm:p-10'>
          <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
          <div>
            <h1 className='text-2xl my-5'>Denunciante</h1>
            <form onSubmit={
              handleSubmit(async (values) => {
                
                console.log(values)
              })}>
              <div className='flex justify-center'>
                <CargarVictimaAgente register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Denuncia</h1>
              <div className='flex justify-center'>
                <CargarObservaciones register={register} />
              </div>
              <h1 className='text-2xl my-5'>Preguntas</h1>
              <div className='flex justify-center'>
                <CargarPreguntas register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Instructor</h1>
              <div className='flex justify-center'>
                <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
              </div>
              <div className="flex justify-center my-3">
                <button className='bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-6/10' type="submit">Enviar</button>
              </div>
            </form>
          </div>
          </div>

  )
}

export default CargarDenunciasRolAgente