import { useState } from 'react'
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../SelectRegister'
import { useForm } from 'react-hook-form'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputRadio from '../InputComponents/InputRadio'

interface CargarVictimarioProps {
  register: any;
  setValue: any;
  errors: any;
}

function CargarVictimario   ({register, setValue, errors}:CargarVictimarioProps) {


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

  const opcionesNotificado = [
    { nombre: 'Aprehensión', value: 'Aprehensión', id: "Aprehension" },
    { nombre: 'Solicitud de Aprehensión', value: 'Solicitud de Aprehensión', id: "SolicitudAprehension" },
    { nombre: 'Expedientes c/cautelar', value: 'Expedientes c/cautelar', id: "ExpedientesCCautelar" },
    {nombre: 'Ninguno', value: 'Ninguno', id: "Ninguno"},
  ]

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
    <span className='ml-4 font-medium xl:text-vw'>Detalles</span>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2`}>  
        <InputCheckbox campo="Abuso de Alcohol" nombre="abuso_de_alcohol" register={register} setValue={setValue} type="checkbox" id="abusoAlcohol"  />          
        <InputCheckbox campo="Antecedentes toxicológicos" nombre="antecedentes_toxicologicos" register={register} setValue={setValue} type="checkbox" id="antecedentesToxicologicos"  />          
        <InputCheckbox campo="Antecedentes penales" nombre="antecedentes_penales" register={register} setValue={setValue} type="checkbox" id="antecedentesPenales"  />          
        <InputCheckbox campo="Antecedentes contravencionales" nombre="antecedentes_contravencionales" register={register} setValue={setValue} type="checkbox" id="antecedentesConvencionales"/>          
        <InputCheckbox campo="Entrenamiento en  combate" nombre="entrenamiento_en_combate" register={register} setValue={setValue} type="checkbox" id="entrenamientoCombate" />          
      </div>
    </>
    <>
        <span className='ml-4 font-medium xl:text-vw my-2'> Notificación </span> 
        <InputRadio campo="Notificación" nombre="notificacion" register={register} setValue={setValue} type="radio" opciones={opcionesNotificado}  defaultValue={3}/>          
    </>
    
    </div>
  )
}

export default CargarVictimario 