import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

// Backend
import { editarVictima } from '../../api/crud'

// Componentes
import InputRadio from '../InputComponents/InputRadio'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../SelectRegister'

// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import { ocupaciones } from '../../GlobalConst/ocupacionesCampos'
import { opcionesNotificado } from '../../GlobalConst/opcionesNotificadoCampos'

interface CargarVictimarioProps {
  datos: any;
  register: any;
  setValue: any;
  errors: any;
}

function EditVictimario   ({datos, register, setValue, errors}:CargarVictimarioProps) {
  
  const defaultIndex = opcionesNotificado.findIndex(opcion => opcion.nombre === datos.notificacion);
  return (
    <div className='w-full'>
       <h1 className='text-2xl my-5'>Victimario</h1>
       <InputRegister campo="" nombre="victimario_id" register={register} setValue={setValue} type="hidden" error={errors.nombre_victima} valor={datos._id} />
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victimario" register={register} setValue={setValue} type="text" error={errors.nombre_victimario} valor={datos.nombre}/>
        <InputRegister campo="Apellido" nombre="apellido_victimario" register={register} setValue={setValue} type="text" error={errors.apellido_victimario} valor={datos.apellido}/>
      </div>
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Edad" nombre="edad_victimario" register={register} setValue={setValue} type="number" error={errors.edad_victimario} valor={datos.edad}/>
        <InputRegister campo="DNI"  require={false} nombre="dni_victimario" register={register} setValue={setValue} type="text" error={errors.dni_victimario} valor={datos.DNI}/> 
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil_victimario" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victimario} valor={datos.estado_civil} isRequired={false} />
        <SelectRegister campo="Ocupación" nombre="ocupacion_victimario" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupaciones_victimario} valor={datos.ocupacion} isRequired={false} />
      </div>
    <>
    <span className='ml-4 font-medium xl:text-vw'>Detalles</span>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2`}>  
        <InputCheckbox campo="Abuso de Alcohol" nombre="abuso_de_alcohol" register={register} setValue={setValue} type="checkbox" id="abusoAlcohol" state={datos.abuso_de_alcohol}/>          
        <InputCheckbox campo="Antecedentes toxicológicos" nombre="antecedentes_toxicologicos" register={register} setValue={setValue} type="checkbox" id="antecedentesToxicologicos" state={datos.antecedentes_toxicologicos} />          
        <InputCheckbox campo="Antecedentes penales" nombre="antecedentes_penales" register={register} setValue={setValue} type="checkbox" id="antecedentesPenales"  state={datos.antecedentes_penales}/>          
        <InputCheckbox campo="Antecedentes contravencionales" nombre="antecedentes_contravencionales" register={register} setValue={setValue} type="checkbox" id="antecedentesConvencionales" state={datos.antecedentes_contravencionales}/>          
        <InputCheckbox campo="Entrenamiento en  combate" nombre="entrenamiento_en_combate" register={register} setValue={setValue} type="checkbox" id="entrenamientoCombate" state={datos.entrenamiento_en_combate}/>          
      </div>
    </>
    <>
        <span className='ml-4 font-medium xl:text-vw my-2'> Notificación </span> 
        <InputRadio campo="Notificación" nombre="notificacion" register={register} setValue={setValue} type="radio" opciones={opcionesNotificado}  defaultValue={defaultIndex}/>          
    </>
    
    </div>
  )
}

export default EditVictimario 