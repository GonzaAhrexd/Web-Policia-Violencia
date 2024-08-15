// Hook 
import InputTextArea from '../InputComponents/InputTextArea'
import { UseFormRegister } from 'react-hook-form';
import InputCheckbox from '../InputComponents/InputCheckbox';

// Zustand
import { useStore } from '../../pages/CargarDenuncias/store'

// Interface
interface observacionesProps {
  register: UseFormRegister<any>
  setValue?: any
  rolAgenteHidden?: boolean
}

function CargarObservaciones({rolAgenteHidden, register, setValue}: observacionesProps) {
  const { isSolicitudAprehension } = useStore();
  return (
    <div className='flex flex-col items-center w-full'>
        {(rolAgenteHidden !== null) && (!rolAgenteHidden) &&
        <div className='w-full lg:w-6/10'>
        <InputCheckbox disabled={!isSolicitudAprehension} campo="Aprehensión" nombre="aprehension" register={register} setValue={setValue} type="checkbox" id="aprehension" />
        </div>
        }
    <div className='flex flex-col items-center w-full'>
        <InputTextArea campo="Observaciones" nombre="observaciones" register={register} type="text" />
        </div>
    </div>
  )
}

export default CargarObservaciones