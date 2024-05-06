import { useState } from 'react'
import InputRegister from './InputRegister'
import SelectRegister from './SelectRegister'
import { useForm } from 'react-hook-form'
import InputCheckbox from './InputCheckbox'
interface CargarVictimaProps {
  register: any;
  setValue: any;
  errors: any;
}

function CargarVictima({register, setValue, errors}: CargarVictimaProps) {


  const [isHijos, setIsHijos] = useState(false)
  const [isHijosConAgresor, setIsHijosConAgresor] = useState(false)

  const estadoCivil = [
    { nombre: 'Soltero/a', value: 'Soltero/a' },
    { nombre: 'Casado/a', value: 'Casado/a' },
    { nombre: 'Convivente', value: 'Convivente' },
    { nombre: 'Separado/a', value: 'Separado/a' },
    { nombre: 'Divorciado/a', value: 'Divorciado/a' },
    { nombre: 'Viudo/a', value: 'Viudo/a' },
  ]
  const ocupaciones = [
    // Empleado, Jornalero, Personal de Salud, Personal de educación, Profesional, Jubilado, Estudiante, Albañil, Policia, PFA, SPP, SPF, PSA, GNA, Ejército Argentina, PNA, Desocupado, Ama de casa, Empleado público, Comerciante, 
    { nombre: 'Empleado', value: 'Empleado' },
    { nombre: 'Empleado público', value: 'Empleado público' },
    { nombre: 'Jornalero', value: 'Jornalero' },
    { nombre: 'Comerciante', value: 'Comerciante' },
    { nombre: 'Personal de Salud', value: 'Personal de Salud' },
    { nombre: 'Personal de educación', value: 'Personal de educación' },
    { nombre: 'Profesional', value: 'Profesional' },
    { nombre: 'Jubilado', value: 'Jubilado' },
    { nombre: 'Estudiante', value: 'Estudiante' },
    { nombre: 'Albañil', value: 'Albañil' },
    { nombre: 'Policía Provincial', value: 'Policía Provincial' },
    { nombre: 'Policía Federal Argentina', value: 'Policía Federal Argentina' },
    { nombre: 'Servicio Penitenciario Provincial', value: 'Servicio Penitenciario Provincial' },
    { nombre: 'Servicio Penitenciario Federal', value: 'Servicio Penitenciario Federal' },
    { nombre: 'Policía de Seguridad Aeroportuaria', value: 'Policía de Seguridad Aeroportuaria' },
    { nombre: 'Gendarmería Nacional Argentina', value: 'Gendarmería Nacional Argentina' },
    { nombre: 'Ejército Argentino', value: 'Ejército Argentino' },
    { nombre: 'Prefectura Naval Argentina', value: 'Prefectura Naval Argentina' },
    { nombre: 'Desocupado', value: 'Desocupado' },
    { nombre: 'Ama de casa', value: 'Ama de casa' },
  ]

  const vinculoConAgresor = [
    { nombre: 'Ninguno', value: 'Ninguno' },
    //Parejas
    { nombre: 'Novio/a', value: 'Novio/a' },
    { nombre: 'Ex Novio/a', value: 'Ex Novio/a' },
    { nombre: 'Esposo/a', value: 'Esposo/a' },
    { nombre: 'Ex esposo/a', value: 'Ex esposo/a' },
    { nombre: 'Concubino/a', value: 'Concubino/a' },
    { nombre: 'Ex Concubino/a', value: 'Ex Concubino/a' },
    //Familia
    { nombre: 'Hijo/a', value: 'Hijo/a' },
    { nombre: 'Padre', value: 'Padre' },
    { nombre: 'Madre', value: 'Madre' },
    { nombre: 'Hermano/a', value: 'Hermano/a' },
    { nombre: 'Tío/a', value: 'Tío/a' },
    { nombre: 'Sobrino/a ', value: 'Sobrino/a' },
    { nombre: 'Nieto/a', value: 'Nieto/a' },
    { nombre: 'Abuelo/a', value: 'Abuelo/a' },
    { nombre: 'Primo/a', value: 'Primo/a' },
    //No familia
    { nombre: 'Cuñado/a', value: 'Cuñado/a' },
    { nombre: 'Ex cuñado/a', value: 'Ex cuñado/a' },
    { nombre: 'Suegro/a', value: 'Suegro/a' },
    { nombre: 'Ex suegro/a', value: 'Ex suegro/a' },
    { nombre: 'Yerno', value: 'Yerno' },
    { nombre: 'Nuera', value: 'Nuera' },
    { nombre: 'Madrastra', value: 'Madrastra' },
    { nombre: 'Padrastro', value: 'Padrastro' },
    { nombre: 'Hijastro', value: 'Hijastro' },
    { nombre: 'Colega', value: 'Colega' },
    { nombre: 'Otros', value: 'Otros' },
  ]

  const condicionVulnerabilidad = [
    { nombre: 'Ninguna', value: 'Ninguna' },
    { nombre: 'Embarazo', value: 'Embarazo' },
    { nombre: 'Periodo Post-parto', value: 'Periodo Post-parto' },
    { nombre: 'Periodo de Lactancia', value: 'Lactancia' },
    { nombre: 'Discapacidad', value: 'Discapacidad' },
    { nombre: 'Enfermedad Crónica', value: 'Enfermedad Crónica' },
    { nombre: 'Adulto mayor', value: 'Adulto mayor' },
    { nombre: 'Menor de edad', value: 'Menor de edad' },
    { nombre: 'Tratamiento psicológico', value: 'Tratamiento psicológico' }
  ]

  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} type="text" error={errors.nombre_victima} />
        <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} type="text" error={errors.apellido_victima} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Edad" nombre="edad_victima" register={register} setValue={setValue} type="number" error={errors.edad_victima} />
        <InputRegister campo="DNI" nombre="dni_victima" register={register} setValue={setValue} type="number" error={errors.dni_victima} />
      </div>

      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victima} />
        <SelectRegister campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupacion_victima} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Vinculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculoConAgresor} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor_victima} />
        <SelectRegister campo="Condición de Vulnerabilidad" nombre="condicion_de_vulnerabilidad_victima" opciones={condicionVulnerabilidad} register={register} setValue={setValue} type="text" error={errors.condicion_de_vulnerabilidad_victima} />
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
      {isHijosConAgresor &&
               <InputRegister campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} type="number" error={errors.cantidad_hijos_con_agresor} />
            }


    </div>

  )
}

export default CargarVictima