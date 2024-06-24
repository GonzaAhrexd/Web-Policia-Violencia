// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../Select/SelectRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputRadio from '../InputComponents/InputRadio'

// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import { ocupaciones } from '../../GlobalConst/ocupacionesCampos'
import { opcionesNotificado } from '../../GlobalConst/opcionesNotificadoCampos'

// Props
interface CargarVictimarioProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
}

function CargarVictimario   ({register, setValue, errors}:CargarVictimarioProps) {

  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victimario" register={register} setValue={setValue} type="text" error={errors.nombre_victimario} />
        <InputRegister campo="Apellido" nombre="apellido_victimario" register={register} setValue={setValue} type="text" error={errors.apellido_victimario} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Edad" nombre="edad_victimario" register={register} setValue={setValue} type="number" error={errors.edad_victimario} />
        <InputRegister campo="DNI"  require={false} nombre="dni_victimario" register={register} setValue={setValue} type="text" error={errors.apellido_victimario} />
      </div>

      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil_victimario" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victimario} />
        <SelectRegister campo="Ocupación" nombre="ocupacion_victimario" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupaciones_victimario} />
      </div>
    <>
    <span className='ml-4 font-medium'>Detalles</span>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2`}>  
        <InputCheckbox campo="Abuso de Alcohol" nombre="abuso_de_alcohol" register={register} setValue={setValue} type="checkbox" id="abusoAlcohol"  />          
        <InputCheckbox campo="Antecedentes toxicológicos" nombre="antecedentes_toxicologicos" register={register} setValue={setValue} type="checkbox" id="antecedentesToxicologicos"  />          
        <InputCheckbox campo="Antecedentes penales" nombre="antecedentes_penales" register={register} setValue={setValue} type="checkbox" id="antecedentesPenales"  />          
        <InputCheckbox campo="Antecedentes contravencionales" nombre="antecedentes_contravencionales" register={register} setValue={setValue} type="checkbox" id="antecedentesConvencionales"/>          
        <InputCheckbox campo="Entrenamiento en  combate" nombre="entrenamiento_en_combate" register={register} setValue={setValue} type="checkbox" id="entrenamientoCombate" />          
      </div>
    </>
    <>
        <span className='ml-4 font-medium my-2'> Notificación </span> 
        <InputRadio campo="Notificación" nombre="notificacion" register={register} type="radio" opciones={opcionesNotificado}  defaultValue={3}/>          
    </>
    
    </div>
  )
}

export default CargarVictimario 