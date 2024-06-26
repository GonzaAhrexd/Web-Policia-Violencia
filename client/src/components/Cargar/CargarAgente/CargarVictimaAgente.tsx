// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRegister from '../../InputComponents/InputRegister'
import SelectRegister from '../../Select/SelectRegister'
import InputRadio from '../../InputComponents/InputRadio'
import InputNumber from '../../InputComponents/InputNumber'
// Campos 
import { estadoCivil } from '../../../GlobalConst/estadoCivilCampos'
import { ocupaciones } from '../../../GlobalConst/ocupacionesCampos'

// Props
interface CargarVictimaProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
}

function CargarVictimaAgente({ register, setValue, errors }: CargarVictimaProps) {

  const opcionesSabeLeerYEscribir = [
    { nombre: 'Sí', value: 'si', id: "si_leer_escribir" },
    { nombre: 'No', value: 'no', id: "no_leer_escribir" },
  ]


  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} type="text" error={errors.nombre_victima} />
        <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} type="text" error={errors.apellido_victima} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nacionalidad" nombre="nacionalidad_victima" register={register} setValue={setValue} type="text" error={errors.nacionalidad_victima} />
        <InputNumber campo="Edad" nombre="edad_victima" register={register} setValue={setValue} type="text" error={errors.edad_victima} maxLenght={2} />
      </div>

      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victima} />
        <SelectRegister campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupacion_victima} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Dirección" nombre="direccion_victima" register={register} setValue={setValue} type="text" error={errors.nacionalidad_victima} />
        <InputRegister campo="Teléfono celular" nombre="telefono_victima" register={register} setValue={setValue} type="text" error={errors.nacionalidad_victima} />
        <InputNumber campo="DNI" nombre="dni_victima" register={register} setValue={setValue} type="text" error={errors.dni_victima} maxLenght={8} />
      </div>

      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium my-2'> ¿Sabe leer y escribir?</span>
        <InputRadio campo="SabeLeerYEscribir" nombre="SabeLeerYEscribir" register={register} type="radio" opciones={opcionesSabeLeerYEscribir} defaultValue={3} />
      </div>

    </div>
  )
}

export default CargarVictimaAgente