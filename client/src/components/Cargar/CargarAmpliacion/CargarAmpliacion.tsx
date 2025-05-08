import CargarVictimaAgente from "../CargarAgente/CargarVictimaAgente"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import CargarObservaciones from "../CargarObservaciones"
import CargarInstructorYSecretario from "../CargarAgente/CargarInstructor"
type CargarAmpliacionProps = {
  data: any;
  setAmpliarDenuncia: any;
}
function CargarAmpliacion({ data, setAmpliarDenuncia }: CargarAmpliacionProps) {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      nombre_victima: data.nombre_victima,
      apellido_victima: data.apellido_victima,
      edad_victima: data.edad_victima,
      dni_victima: data.DNI_victima,
      genero_victima: data.genero_victima,
      estado_civil_victima: data.estado_civil_victima,
      ocupacion_victima: data.ocupacion_victima,
      nacionalidad_victima: data.nacionalidad_victima,
      direccion_victima: data.direccion_victima,
      telefono_victima: data.telefono_victima,
      sabe_leer_y_escribir_victima: data.sabe_leer_y_escribir_victima,
      observaciones: data.observaciones
    }
  })

  return (
    <div>
      <div className='flex flex-col items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full ' onClick={() => setAmpliarDenuncia(false)} >Cancelar</div>
      <h1 className='text-3xl my-5 font-sans'>Ampliación de denuncias </h1>
      <form action="" onSubmit={handleSubmit(async (data) => {
        Swal.fire({
          title: '¿Está seguro de que desea enviar la ampliación de denuncia?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          denyButtonText: `No enviar`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Enviada!', '', 'success')
            setAmpliarDenuncia(false)
          } else if (result.isDenied) {
            Swal.fire('No se envió la ampliación', '', 'info')
          }
        })

      })}
      >

      <h2 className="text-2xl my-5 font-sans">Víctima</h2>
      <div className='flex flex-col items-center justify-center md:flex-row my-2'>
        <CargarVictimaAgente valores={data} register={register} setValue={setValue} errors={errors} />
      </div>
      <h1 className='text-2xl my-5'>Denuncia</h1>
      <div className='flex justify-center'>
        <CargarObservaciones rolAgenteHidden setValue={setValue} register={register} />
      </div>
      <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />

      </form>
    </div>
  )
}

export default CargarAmpliacion