// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRadio from '../../InputComponents/InputRadio'
// Campos 

// Props
interface CargarVictimaProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  tipoDenuncia: string;
}

function CargarPreguntas({ tipoDenuncia, register, setValue, errors }: CargarVictimaProps) {

  const opcionesAsistidaPorDichoOrganismo = [
    { nombre: 'Sí', value: 'si', id: "si_asistida" },
    { nombre: 'No', value: 'no', id: "no_asistida" },
  ]

  const opcionesExaminadaMedicoPolicial = [
    { nombre: 'Sí', value: 'si', id: "si_examinacion_medica" },
    { nombre: 'No', value: 'no', id: "no_examinacion_medica" },
  ]

  const opcionesAccionarPenalmente = [
    { nombre: 'Sí', value: 'si', id: "si_accion_penal" },
    { nombre: 'No', value: 'no', id: "no_accion_penal" },
  ]

  const opcionesAgregarQuitarOEnmendarAlgo = [
    { nombre: 'Sí', value: 'si', id: "si_agregado" },
    { nombre: 'No', value: 'no', id: "no_agregado" },
  ]

  return (
    <div className='w-full lg:w-6/10'>
      {tipoDenuncia == "mujer" &&
        <div className='flex flex-col my-2'>
          <p> Se le hace
            saber que existe la Línea 137, ubicado en Calle Mitre N° 171 -Resistencia-, donde se brinda asesoramiento legal y
            asistencia psicológica las 24 horas del dia de manera GRATUITA, y la Línea 102 ubicado en Avenida Sarmiento
            N° 1675-Resistencia-.</p>
          <span className='ml-4 font-medium xl:text-vw my-2'> ¿Desea ser asistid{tipoDenuncia == "mujer" ? "a" : "o"} por dicho organismo? </span>
          <InputRadio campo="AsistidaPorDichoOrganismo" nombre="AsistidaPorDichoOrganismo" register={register} setValue={setValue} type="radio" opciones={opcionesAsistidaPorDichoOrganismo} defaultValue={3} />
        </div>
      }
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium xl:text-vw my-2'> ¿Desea ser examinad{tipoDenuncia == "mujer" ? "a" : "o"} por el medico policial en turno? </span>
        <InputRadio campo="ExaminadaMedicoPolicial" nombre="ExaminadaMedicoPolicial" register={register} setValue={setValue} type="radio" opciones={opcionesExaminadaMedicoPolicial} defaultValue={3} />
      </div>

      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium xl:text-vw my-2'> ¿Desea accionar penalmente por el delito que diera lugar? </span>
        <InputRadio campo="AccionarPenalmente" nombre="AccionarPenalmente" register={register} setValue={setValue} type="radio" opciones={opcionesAccionarPenalmente} defaultValue={3} />
      </div>


      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium xl:text-vw my-2'> ¿Desea agregar, quitar o enmendar algo a lo expuesto precedentemente? </span>
        <InputRadio campo="AgregarQuitarOEnmendarAlgo" nombre="AgregarQuitarOEnmendarAlgo" register={register} setValue={setValue} type="radio" opciones={opcionesAgregarQuitarOEnmendarAlgo} defaultValue={3} />
      </div>

    </div>
  )
}

export default CargarPreguntas