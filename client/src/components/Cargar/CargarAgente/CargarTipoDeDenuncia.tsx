// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import SelectRegister from '../../Select/SelectRegister'

// Campos 

// Props
interface TipoDenunciaProps{
  setTipoDenuncia: any;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    errors: FieldErrors;
    }

function CargarTipoDeDenuncia({setTipoDenuncia, register, setValue, errors}: TipoDenunciaProps) {

    const tipoDeDenuncia = [
        { nombre: 'Mujer', value: 'mujer' },
        { nombre: 'Hombre', value: 'hombre' },
        { nombre: 'Exposición', value: 'exposicion' },
    ]

  return (
    <div className='w-full lg:w-6/10'>
     
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister setTipoDenuncia={setTipoDenuncia} campo="Tipo de Denuncia" nombre="tipo_denuncia" opciones={tipoDeDenuncia} register={register} setValue={setValue} type="text" error={errors.estado_civil_victima} />
      </div>

     </div>
  )
}

export default CargarTipoDeDenuncia