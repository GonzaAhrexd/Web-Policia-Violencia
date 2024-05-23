// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Conexión con BackEnd
import { crearDenunciaSinVerificar } from '../../api/crud';
// Librerías React
import Swal from 'sweetalert2'
import { pdf } from '@react-pdf/renderer';


// Componentes
import CargarVictimaAgente from '../../components/Cargar/CargarAgente/CargarVictimaAgente';
import CargarObservaciones from '../../components/Cargar/CargarObservaciones';
import CargarPreguntas from '../../components/Cargar/CargarAgente/CargarPreguntas';
import CargarInstructorYSecretario from '../../components/Cargar/CargarAgente/CargarInstructor';
import CargarTipoDeDenuncia from '../../components/Cargar/CargarAgente/CargarTipoDeDenuncia';
import PDF from './PDF';
import { useEffect } from 'react';

interface CargarDenunciasRolCargaProps {
  user: any;
}

function CargarDenunciasRolAgente({ user }: CargarDenunciasRolCargaProps) {
  // Create styles


  const { register, handleSubmit, setValue, getValues, formState: {
    errors
  } } = useForm()

  const [tipoDenuncia, setTipoDenuncia] = useState('')

  const handleImprimir = async () => {
    const datos = getValues()
    const blob = await pdf(<PDF tipoDenuncia={tipoDenuncia} datos={datos} user={user} />).toBlob();
    // Crea una URL de objeto a partir del blob
    const url = URL.createObjectURL(blob);
    // Abre la URL en una nueva pestaña
    window.open(url);
  }

  useEffect(() => {
    const datos = getValues()
    console.log(datos)
  }, [tipoDenuncia])
  return (
    <div className='h-screen sm:h-full p-2 sm:p-10'>
      <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
      <div>
        <form onSubmit={
          handleSubmit(async (values) => {

            console.log(values)
            crearDenunciaSinVerificar(values)

            Swal.fire({
              title: 'Denuncia cargada',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#0C4A6E',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
              }
            })

          })}>
          <h1 className='text-2xl my-5'>Tipo de denuncia</h1>
          <div className='flex justify-center'>
            <CargarTipoDeDenuncia setTipoDenuncia={setTipoDenuncia} register={register} setValue={setValue} errors={errors} />
          </div>

          {(tipoDenuncia == "mujer" || tipoDenuncia == "hombre") && (
            <>
              <h1 className='text-2xl my-5'>Denunciante</h1>
              <div className='flex justify-center'>
                <CargarVictimaAgente register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Denuncia</h1>
              <div className='flex justify-center'>
                <CargarObservaciones register={register} />
              </div>
              <h1 className='text-2xl my-5'>Preguntas</h1>
              <div className='flex justify-center'>
                <CargarPreguntas tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
              </div>
              <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
              <div className="flex justify-center my-3">
                <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => handleImprimir()}>Imprimir</div>
                <button className='bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
              </div>
            </>
          )}
          {tipoDenuncia == "hombre" && (
            <>

            </>
          )}

        </form>
      </div>
    </div>

  )
}


export default CargarDenunciasRolAgente