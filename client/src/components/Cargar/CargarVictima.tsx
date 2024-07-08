// Hooks
import { useState } from 'react'
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../Select/SelectRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputNumber from '../InputComponents/InputNumber'
// Campos 
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import { ocupaciones } from '../../GlobalConst/ocupacionesCampos'
import { vinculo } from '../../GlobalConst/vinculoCampos'
import { condicionVulnerabilidad } from '../../GlobalConst/condicionesVulnerabilidadCampos'

// Props
interface CargarVictimaProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
}

function CargarVictima({ register, setValue, errors }: CargarVictimaProps) {
  // Estados
  const [isHijos, setIsHijos] = useState(false) // Para mostrar o no los campos de hijos si es seleccionado el checkbox hijos
  const [isHijosConAgresor, setIsHijosConAgresor] = useState(false) // Para mostrar o no el campo de cantidad de hijos con el agresor si es seleccionado el checkbox hijos con el agresor

  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} type="text" error={errors.nombre_victima} />
        <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} type="text" error={errors.apellido_victima} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Domicilio" nombre="direccion_victima" require={false} register={register} setValue={setValue} type="text" error={errors.direccion_victima} />
        <InputNumber campo="Edad" nombre="edad_victima" require={false} register={register} setValue={setValue} type="text" error={errors.edad_victima} maxLenght={2} />
        <InputNumber campo="DNI" nombre="dni_victima" require={false} register={register} setValue={setValue} type="text" error={errors.dni_victima} maxLenght={8} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victima} />
        <SelectRegister campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupacion_victima} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor_victima} />
        <SelectRegister campo="Condición de Vulnerabilidad" nombre="condicion_de_vulnerabilidad_victima" opciones={condicionVulnerabilidad} register={register} setValue={setValue} type="text" error={errors.condicion_de_vulnerabilidad_victima} />
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 my-2`}>
        <InputCheckbox campo="Convivencia " nombre="convivencia" register={register} setValue={setValue} type="checkbox" error={errors.convivencia} id="convivencia" />
        <InputCheckbox campo="Hijos" nombre="hijos" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsHijos} state={isHijos} id="isHijos" />
      </div>

      {isHijos &&
        <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md`}>
            <InputCheckbox campo="Dependencia económica" nombre="dependencia_economica" register={register} setValue={setValue} type="checkbox" error={errors.dependencia_economica} id="dependenciaEconomica" />
            <InputCheckbox campo="Mayores de 18" nombre="mayor_de_18" register={register} setValue={setValue} type="checkbox" error={errors.mayor_de_18} id="mayores18" />
            <InputCheckbox campo="Menores de 18" nombre="menor_de_18" register={register} setValue={setValue} type="checkbox" error={errors.menor_de_18} id="menores18" />
            <InputCheckbox campo="Menores discapacitados" nombre="menores_discapacitados" register={register} setValue={setValue} type="checkbox" error={errors.menores_discapacitados} id="menoresDiscapacitados" />
            <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue} type="checkbox" error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor" />
          </div>

      }

      {isHijosConAgresor && <InputNumber campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} type="text" error={errors.cantidad_hijos_con_agresor} maxLenght={2} />}


    </div>

  )
}

export default CargarVictima