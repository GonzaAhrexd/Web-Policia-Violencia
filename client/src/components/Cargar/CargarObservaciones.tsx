// Hook 
import InputTextArea from '../InputComponents/InputTextArea'
import { UseFormRegister } from 'react-hook-form';

// Interface
interface observacionesProps {
  register: UseFormRegister<any>
}

function CargarObservaciones({register}: observacionesProps) {
  return (
        <InputTextArea campo="Observaciones" nombre="observaciones" register={register} type="text" />
  )
}

export default CargarObservaciones