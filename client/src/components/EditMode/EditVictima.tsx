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
import InputNumber from '../InputComponents/InputNumber'
// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import { ocupaciones } from '../../GlobalConst/ocupacionesCampos'
import { vinculo } from '../../GlobalConst/vinculoCampos'
import { condicionVulnerabilidad } from '../../GlobalConst/condicionesVulnerabilidadCampos'

interface CargarVictimaProps {
    datos: any;
    register: any;
    setValue: any;
    errors: any;
    md?: any;
    vinculo_con_agresor?: any;
    hijos_con_agresor?: any;
    existente?: any;
    variante?: any;
    editarConDenuncia?: any;
    cantidad_hijos_con_agresor?: string;

}

function EditVictima({ editarConDenuncia, existente, hijos_con_agresor, cantidad_hijos_con_agresor, vinculo_con_agresor, datos, register, setValue, errors, md }: CargarVictimaProps) {

    const [isHijos, setIsHijos] = useState(datos.hijos.tiene_hijos)
    const [isHijosConAgresor, setIsHijosConAgresor] = useState(hijos_con_agresor ? hijos_con_agresor > 0 : false)

    return (
        <div className={`w-full ${md && "lg:w-6/10"}`}>
            {!existente && <h1 className='text-2xl my-5'>Víctima</h1>}
            <InputRegister campo="" nombre="victima_id" register={register} setValue={setValue} type="hidden" error={errors.nombre_victima} valor={datos._id} />
            <div className='flex flex-col md:flex-row my-2'>
                <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} type="text" error={errors.nombre_victima} valor={datos.nombre} />
                <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} type="text" error={errors.apellido_victima} valor={datos.apellido} />
            </div>
            <div className='flex flex-col md:flex-row my-2'>
                <InputRegister campo="Domicilio de la víctima" nombre="direccion_victima" require={false} register={register} setValue={setValue} type="text" error={errors.direccion_victima} valor={datos.direccion != "" ? datos.direccion : " "} />
                <InputNumber require={false} campo="Edad" nombre="edad_victima" register={register} setValue={setValue} type="text" error={errors.edad_victima} valor={datos.edad != null ? datos.edad : ""} maxLenght={2} />
                <InputNumber require={false} campo="DNI" nombre="dni_victima" register={register} setValue={setValue} type="text" error={errors.dni_victima} valor={datos.DNI != "S/N" ? datos.DNI : ""} maxLenght={8} />
            </div>
            <div className='flex flex-col xl:flex-row my-2'>
                <SelectRegister valor={datos.estado_civil} campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victima} isRequired={false} />
                <SelectRegister valor={datos.ocupacion} campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupacion_victima} isRequired={false} />
            </div>
            <div className='flex flex-col xl:flex-row my-2'>
                {existente && <SelectRegister campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor_victima} />}
                {editarConDenuncia && <SelectRegister valor={vinculo_con_agresor} campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor_victima} isRequired={false} />}

                <SelectRegister valor={datos.condicion_de_vulnerabilidad} campo="Condición de Vulnerabilidad" nombre="condicion_de_vulnerabilidad_victima" opciones={condicionVulnerabilidad} register={register} setValue={setValue} type="text" error={errors.condicion_de_vulnerabilidad_victima} isRequired={false} />
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 my-2`}>
                <InputCheckbox campo="Convivencia " nombre="convivencia" register={register} setValue={setValue} type="checkbox" error={errors.convivencia} id="convivencia" state={datos.convivencia} />
                <InputCheckbox campo="Hijos" nombre="hijos" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsHijos} state={isHijos} id="isHijos" />
            </div>
            {isHijos &&
                <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md`}>
                    <InputCheckbox campo="Dependencia económica" nombre="dependencia_economica" register={register} setValue={setValue} type="checkbox" error={errors.dependencia_economica} id="dependenciaEconomica" state={datos.hijos.dependencia_economica} />
                    <InputCheckbox campo="Mayores de 18" nombre="mayor_de_18" register={register} setValue={setValue} type="checkbox" error={errors.mayor_de_18} id="mayores18" state={datos.hijos.mayores_de_edad} />
                    <InputCheckbox campo="Menores de 18" nombre="menor_de_18" register={register} setValue={setValue} type="checkbox" error={errors.menor_de_18} id="menores18" state={datos.hijos.menores_de_edad} />
                    <InputCheckbox campo="Menores discapacitados" nombre="menores_discapacitados" register={register} setValue={setValue} type="checkbox" error={errors.menores_discapacitados} id="menoresDiscapacitados" state={datos.hijos.menores_discapacitados} />
                    {existente && <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue} type="checkbox" error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor" />}
                    {editarConDenuncia && <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue} type="checkbox" error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor" />}
                </div>
            }

            {(isHijosConAgresor && existente) && <InputNumber campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} type="text" error={errors.cantidad_hijos_con_agresor} maxLenght={2} />}
            {(isHijosConAgresor && editarConDenuncia) && <InputNumber valor={cantidad_hijos_con_agresor} campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} type="text" error={errors.cantidad_hijos_con_agresor} maxLenght={2} />}

        </div>
    )
}

export default EditVictima