// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputNumber from '../InputComponents/InputNumber'
import InputCheckboxExternalCondition from '../InputComponents/InputCheckboxExternalCondition';
// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
// Hooks
import { useEffect, useState } from 'react';
// Contexto
import { useCampos } from '../../context/campos'
// Props
interface CargarVictimarioProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  watch: any;
}

function CargarVictimario({watch, register, setValue, errors }: CargarVictimarioProps) {


  const [entrenamiento_en_combate, setEntrenamiento_en_combate] = useState(false)

  const ocupacionVictimario = watch('ocupacion_victimario');
  const { ocupaciones } = useCampos();


  useEffect(() => {
    if ((ocupacionVictimario === "Policía Provincial") || (ocupacionVictimario === "Policía Federal Argentina") || (ocupacionVictimario == "Servicio Penitenciario Provincial") || (ocupacionVictimario == "Servicio Penitenciario Federal") || (ocupacionVictimario === "Policía de Seguridad Aeroportuaria") || (ocupacionVictimario == "Gendarmería Nacional Argentina") || (ocupacionVictimario == "Ejército Argentino") || (ocupacionVictimario == "Prefectura Naval Argentina") ) {
      setEntrenamiento_en_combate(true);
    } else {
      // Opcional: establecer en false si se desea resetear el estado para otras ocupaciones
      setEntrenamiento_en_combate(false);
    }
  }, [ocupacionVictimario]); // Dependencia del efecto



  return (
    <div className='w-full lg:w-6/10'> 
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victimario" register={register} setValue={setValue} type="text" error={errors.nombre_victimario} />
        <InputRegister campo="Apellido" nombre="apellido_victimario" register={register} setValue={setValue} type="text" error={errors.apellido_victimario} />
      </div>
      <div className='flex flex-col md:flex-row my-2'>
        <InputNumber campo="Edad" nombre="edad_victimario" register={register} require={false} setValue={setValue} type="text" error={errors.edad_victimario} maxLenght={2} />
        <InputNumber campo="DNI" nombre="dni_victimario" require={false} register={register} setValue={setValue} type="text" error={errors.dni_victimario} maxLenght={8} />
        <InputRegister campo="Domicilio" nombre="direccion_victimario" require={false} register={register} setValue={setValue} type="text" error={errors.direccion_victimario} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegisterSingle campo="Estado Civil" nombre="estado_civil_victimario" opciones={estadoCivil}  setValue={setValue} error={errors.estado_civil_victimario} />
        <SelectRegisterSingle campo="Ocupación" nombre="ocupacion_victimario" opciones={ocupaciones} setValue={setValue}  error={errors.ocupaciones_victimario} />
      </div>
      <>
        <span className='ml-4 font-medium'>Detalles</span>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2`}>
          <InputCheckbox campo="Abuso de Alcohol" nombre="abuso_de_alcohol" register={register} setValue={setValue} type="checkbox" id="abusoAlcohol" />
          <InputCheckbox campo="Antecedentes toxicológicos" nombre="antecedentes_toxicologicos" register={register} setValue={setValue} type="checkbox" id="antecedentesToxicologicos" />
          <InputCheckbox campo="Antecedentes psicológicos" nombre="antecedentes_psicologicos" register={register} setValue={setValue} type="checkbox" id="antecedentesPsicologicos" />
          <InputCheckbox campo="Antecedentes penales" nombre="antecedentes_penales" register={register} setValue={setValue} type="checkbox" id="antecedentesPenales" />
          <InputCheckbox campo="Antecedentes contravencionales" nombre="antecedentes_contravencionales" register={register} setValue={setValue} type="checkbox" id="antecedentesConvencionales" />
          <InputCheckboxExternalCondition campo="Entrenamiento en combate" nombre="entrenamiento_en_combate" register={register} setValue={setValue} type="checkbox" id="entrenamientoCombate" state={entrenamiento_en_combate}/>
        </div>
      </>
    </div>
  )
}

export default CargarVictimario 