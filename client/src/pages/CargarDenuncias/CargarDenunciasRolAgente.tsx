// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Conexión con BackEnd
import { crearDenunciaSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';
import { crearExposicion } from '../../api/CRUD/exposicion.crud';
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
import InputExpediente from '../../components/InputComponents/InputExpediente';
import InputRegister from '../../components/InputComponents/InputRegister';
import { useStore } from './store';
type CargarDenunciasRolCargaProps = {
  user: any;
}

function CargarDenunciasRolAgente({ user }: CargarDenunciasRolCargaProps) {
  // Formulario
  const { watch, register, handleSubmit, setValue, getValues, formState: {
    errors
  } } = useForm()

  // Estados
  const [tipoDenuncia, setTipoDenuncia] = useState('')
  const [comisariaPertenece,] = useState('')
  const userDivisionZona = user.unidad.split(",")
  const [isDivision,] = useState(!(userDivisionZona.length > 1));

  const { genero } = useStore((state) => ({
    genero: state.genero,
  }))


  // Función para imprimir
  const handleImprimir = async () => {
    const datos = getValues()
    const blob = await pdf(<PDF genero={genero} tipoDenuncia={tipoDenuncia} datos={datos} user={user} />).toBlob();
    // Crea una URL de objeto a partir del blob
    const url = URL.createObjectURL(blob);
    // Abre la URL en una nueva pestaña
    window.open(url);
  }

  return (
    <div className='min-h-screen sm:h-full p-2 sm:p-10'>
      <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
      <div>
        <form onSubmit={
          handleSubmit(async (values) => {
            console.log(values)
            Swal.fire({
              title: '¿Estás seguro?',
              text: "Una vez enviado, debe ser verificado.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0C4A6E',
              cancelButtonColor: '#FF554C',
              confirmButtonText: 'Sí, subir',
              cancelButtonText: 'Cancelar'
            }).then(async (result) => {
              // Si el usuario confirma
              if (result.isConfirmed) {

                console.log("Actuación" + values.modo_actuacion)

                if (values.modo_actuacion == "Exposición") {
                  crearExposicion(values)
                }
                else {
                  if( values.modo_actuacion == "Denuncia"){
                    values.modo_actuacion = values.modo_actuacion_2
                  }

                  values.numero_de_expediente = values.PrefijoExpediente + values.numero_de_expediente + values.Expediente + values.SufijoExpediente
                  crearDenunciaSinVerificar(values)
                }
                Swal.fire({
                  title: `${values.modo_actuacion == "Exposición" ? "Exposición" : "Denuncia"} cargada`,
                  icon: 'success',
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#0C4A6E',
                  allowOutsideClick: false
                }).then((result) => {
                  // Si el usuario confirma
                  if (result.isConfirmed) {
                    // Recarga la página
                    window.location.reload()
                  }
                })
              }
            })
          })}
        >
          <h1 className='text-2xl my-5'>Tipo de denuncia</h1>
          <div className='flex flex-col items-center justify-center'>
            <CargarTipoDeDenuncia tipoDenuncia={tipoDenuncia} setTipoDenuncia={setTipoDenuncia} register={register} setValue={setValue} errors={errors} />
          </div>
          {(tipoDenuncia != "Exposición" && tipoDenuncia != "") && (
            <>
              <h1 className='text-2xl my-5'>Expediente</h1>
              <div className='flex justify-center'>
                <InputExpediente cargaAgente={true} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />
              </div>
              {!isDivision &&
                <div className='flex flex-row w-full justify-center'>
                  <div className='flex flex-row w-full lg:w-6/10'>
                    <InputRegister campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
                    <InputRegister campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
                  </div>
                </div>
              }
              <h1 className='text-2xl my-5'>Denunciante</h1>
              <div className='flex justify-center'>
                <CargarVictimaAgente register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Denuncia</h1>
              <div className='flex justify-center'>
                <CargarObservaciones rolAgenteHidden setValue={setValue} register={register} />
              </div>
              <h1 className='text-2xl my-5'>Preguntas</h1>
              <div className='flex justify-center'>
                <CargarPreguntas watch={watch} genero={genero} tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
              </div>
              <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
              <div className="flex justify-center my-3">
                <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => handleImprimir()}>Imprimir</div>
                <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
              </div>
            </>
          )}
          {tipoDenuncia == "Exposición" && (
            <>
              {!isDivision &&
                <div className='flex flex-row w-full justify-center'>
                  <div className='flex flex-row w-full lg:w-6/10'>
                    <InputRegister campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
                    <InputRegister campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
                  </div>
                </div>
              }
              <h1 className='text-2xl my-5'>Expositor</h1>
              <div className='flex justify-center'>
                <CargarVictimaAgente register={register} setValue={setValue} errors={errors} />
              </div>

              <h1 className='text-2xl my-5'>Denuncia</h1>
              <div className='flex justify-center'>
                <CargarObservaciones rolAgenteHidden register={register} />
              </div>
              <h1 className='text-2xl my-5'>Preguntas</h1>
              <div className='flex justify-center'>
                <CargarPreguntas watch={watch} tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
              </div>
              <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
              <div className="flex justify-center my-3">
                <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => handleImprimir()}>Imprimir</div>
                <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
              </div>
            </>
          )}

        </form>
      </div>
    </div>

  )
}


export default CargarDenunciasRolAgente