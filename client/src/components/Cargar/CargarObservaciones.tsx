// Hook 
import InputTextArea from '../InputComponents/InputTextArea'
import { UseFormRegister } from 'react-hook-form';
import InputCheckbox from '../InputComponents/InputCheckbox';
// Interface
interface observacionesProps {
  register: UseFormRegister<any>
  setValue?: any
}

function CargarObservaciones({register, setValue}: observacionesProps) {
  return (
    <div className='flex flex-col items-center w-full'>
        <div className='w-full lg:w-6/10'>
        <InputCheckbox campo="Aprehensión" nombre="aprehension" register={register} setValue={setValue} type="checkbox" id="aprehension" />
        </div>
    <div className='flex flex-col items-center w-full'>
        <InputTextArea campo="Observaciones" nombre="observaciones" register={register} type="text" />
        </div>
    </div>
  )
}

export default CargarObservaciones