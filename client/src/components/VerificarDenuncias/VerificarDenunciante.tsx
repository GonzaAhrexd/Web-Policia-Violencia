/*
 Uso del componente:
    EditVictima recibe los datos de las victimas para ser mostrados y editados en el formulario
    de la sección de victima.
    Este componente es utilizado en editSection.
*/
// Hooks
import { useState } from 'react'
//Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../Select/SelectRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import { ocupaciones } from '../../GlobalConst/ocupacionesCampos'
import { vinculo } from '../../GlobalConst/vinculoCampos'
import { condicionVulnerabilidad } from '../../GlobalConst/condicionesVulnerabilidadCampos'
import InputNumber from '../InputComponents/InputNumber'

interface CargarVictimaProps {
    datos: any;
    register: any;
    setValue: any;
    errors: any;
}

function VerificarDenunciante({ datos, register, setValue, errors }: CargarVictimaProps) {

    const [isHijos, setIsHijos] = useState(  false)
    const [isHijosConAgresor, setIsHijosConAgresor] = useState(datos.hijos ? datos.hijos.hijos_con_el_agresor > 0 : false)

    return (
        <div className='w-full lg:w-6/10'>
        <div className='flex flex-col md:flex-row my-2'>
          <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} type="text" error={errors.nombre_victima} valor={datos.nombre} />
          <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} type="text" error={errors.apellido_victima}  valor={datos.apellido} />
        </div>
  
        <div className='flex flex-col md:flex-row my-2'>
          <InputNumber campo="Edad" nombre="edad_victima" register={register} setValue={setValue} type="text" error={errors.edad_victima} valor={datos.edad} maxLenght={2}/>
          <InputNumber campo="DNI" nombre="dni_victima" register={register} setValue={setValue} type="text" error={errors.dni_victima} valor={datos.DNI} maxLenght={8} />
        </div>
  
        <div className='flex flex-col xl:flex-row my-2'>
          <SelectRegister campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victima} isRequired={false} valor={datos.estado_civil}/>
          <SelectRegister campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupacion_victima} isRequired={false} valor={datos.ocupacion}/>
        </div>
        <div className='flex flex-col xl:flex-row my-2'>
          <SelectRegister campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor_victima}/>
          <SelectRegister valor={datos?.condicion_de_vulnerabilidad ? datos?.condicion_de_vulnerabilidad : null} campo="Condición de Vulnerabilidad" nombre="condicion_de_vulnerabilidad_victima" opciones={condicionVulnerabilidad} register={register} setValue={setValue} type="text" error={errors.condicion_de_vulnerabilidad_victima} />
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 my-2` }>
          <InputCheckbox campo="Convivencia " nombre="convivencia" register={register} setValue={setValue} type="checkbox" error={errors.convivencia} id="convivencia" />
          <InputCheckbox campo="Hijos" nombre="hijos" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsHijos} state={isHijos} id="isHijos"/>
          {isHijos &&
            <>
              <InputCheckbox campo="Dependencia económica" nombre="dependencia_economica" register={register} setValue={setValue} type="checkbox" error={errors.dependencia_economica} id="dependenciaEconomica" />
              <InputCheckbox campo="Mayores de 18" nombre="mayor_de_18" register={register} setValue={setValue} type="checkbox" error={errors.mayor_de_18} id="mayores18"/>
              <InputCheckbox campo="Menores de 18" nombre="menor_de_18" register={register} setValue={setValue} type="checkbox" error={errors.menor_de_18} id="menores18" />
              <InputCheckbox campo="Menores discapacitados" nombre="menores_discapacitados" register={register} setValue={setValue} type="checkbox" error={errors.menores_discapacitados} id="menoresDiscapacitados" />
              <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue} type="checkbox" error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor"/>
            </>
          }
           
        </div>
        {isHijosConAgresor && <InputNumber campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} type="text" error={errors.cantidad_hijos_con_agresor} maxLenght={2} /> }
  
  
      </div>

    )
}

export default VerificarDenunciante