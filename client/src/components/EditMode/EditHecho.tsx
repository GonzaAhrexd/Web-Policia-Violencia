import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Campos
import { unidadCampos } from '../../GlobalConst/unidadCampos'

// Backend
import { getCoords } from '../../api/coordinates'

// Componentes
import InputRegister from '../InputComponents/InputRegister'
import InputDireccion from '../InputComponents/InputDireccion'
import SelectCargaDenuncias from '../Select/SelectCargaDenuncias'
import SelectRegister from '../Select/SelectRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputDate from '../InputComponents/InputDate'
import InputExpediente from '../InputComponents/InputExpediente'
import SimpleTableCheckorX from '../ShowData/SimpleTableCheckorX'
import EditExpediente from '../EditMode/EditExpediente'
//Iconos
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid';
interface denunciaProps {
  register: any
  setValue: any
  errors: any
  handleOpenModal: any
  setTitulo: any
  datos: any
  datosGeograficos: any
}

function EditHecho({datosGeograficos, datos, setTitulo, handleOpenModal, register, setValue, errors }: denunciaProps) {

  
  const dividirExpediente = (expediente: string) => {
    let division = expediente.split("-")
    let division2 = division[0].split("/")
    let divisionCompleta = []

    divisionCompleta[0] = division2[0]
    divisionCompleta[1] = division2[1]
    divisionCompleta[2] = division[1]
    divisionCompleta[3] = division[2]

    console.log(divisionCompleta)

    return divisionCompleta
  }

  const [expedienteDividido, setExpedienteDividido] = useState(dividirExpediente(datos.numero_de_expediente))
  const [comisariaPertenece, setComisariaPertenece] = useState(expedienteDividido[1] + "-")
  const [isArmas, setIsArmas] = useState(datos.empleo_de_armas)
  const [isDivision, setIsDivision] = useState(false)
  const [isSolicitada, setIsSolicitada] = useState(datos.medida_solicitada_por_la_victima)
  const [isDispuestoPorAutoridadJudicial, setIsDispuestoPorAutoridadJudicial] = useState(datos.medida_dispuesta_por_autoridad_judicial)
  const [isDenunciadoPorTercero, setIsDenunciadoPorTercero] = useState(datos.denunciado_por_tercero)
  const [municipio, setMunicipio] = useState('')
  const [coordenadas, setCoordenadas] = useState('')
  const [direccion, setDireccion] = useState('')


  const generos = [
    { nombre: "Masculino", value: "Masculino" },
    { nombre: "Femenino", value: "Femenino" }]

  const juzgadoIntervinente = [
    { nombre: "Fiscalia Entorno", value: "Fiscalia Entorno" },
    { nombre: "Juzgado de Paz Local", value: "Juzgado de Paz Local" },
    { nombre: "Juzgado  de Faltas Local", value: "Juzgado de Faltas Local" },

  ]

  const opcionesViolencia = [
    { nombre: "Violencia de Género", value: "Violencia de Género" },
    { nombre: "Violencia Familiar", value: "Violencia Familiar" },
  ]

  const opcionesModalidades = [
    { nombre: "Violencia Doméstica", value: "Violencia Doméstica" },
    { nombre: "Violencia Institucional", value: "Violencia Institucional" },
    { nombre: "Violencia Laboral", value: "Violencia Laboral" },
    { nombre: "Violencia Contra la Libertad Reproductiva", value: "Violencia contra la Libertad Reproductiva" },
    { nombre: "Violencia Obstétrica", value: "Violencia Obstétrica" },
    { nombre: "Violencia Mediática", value: "Violencia Mediática" },
    { nombre: "Violencia Contra las Mujeres en el Espacio Público", value: "Violencia Contra las Mujeres en el Espacio Público" },
    { nombre: "Violencia Pública-Política", value: "Violencia Pública-Política" },
    { nombre: "Violencia Digital o Telemática", value: "Violencia Digital o Telemática" },
  ]

  const opcionesTiposDeArma = [
    { nombre: "Arma de Fuego", value: "Arma de Fuego" },
    { nombre: "Arma Blanca", value: "Arma Blanca" },
    { nombre: "Elemento Contundente", value: "Elemento Contundente" },
    { nombre: "Elemento Punzante", value: "Elemento Punzante" },
    { nombre: "Elemento Corto Punzante", value: "Elemento Corto Punzante" }
  ]


  const vinculoConVictima = [
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


  const consultarCoordenadas = async () => {

    let buscarDir = direccion + "," + municipio
    const fetchCoords = async () => {
      const coords = await getCoords(buscarDir);
      const coordenadasObtenidas = coords.lat + " " + coords.lon // Aquí puedes hacer lo que necesites con las coordenadas
      return coordenadasObtenidas
    };

    if (buscarDir) {
      fetchCoords().then((response) => {
        setCoordenadas(response)
        setValue('GIS', coordenadas)
      })

    }
  }

  const tiposDeViolenciaText = [
    { tipo: "Física", text: "La que se emplea contra el cuerpo de la mujer produciendo dolor, daño o riesgo de producirlo y cualquier otra forma de maltrato agresión que afecte su integridad física." },
    { tipo: "Psicológica", text: "La que causa daño emocional y disminución de la autoestima o perjudica y perturba el pleno desarrollo personal o que busca degradar o controlar sus acciones, comportamientos, creencias y decisiones, mediante amenaza, acoso, hostigamiento, restricción, humillación, deshonra, descrédito, manipulación aislamiento. Incluye también la culpabilización, vigilancia constante, exigencia de obediencia sumisión, coerción verbal, persecución, insulto, indiferencia, abandono, celos excesivos, chantaje, ridiculización, explotación y limitación del derecho de circulación o cualquier otro medio que cause perjuicio a su salud psicológica y a la autodeterminación." },
    { tipo: "Sexual", text: "Cualquier acción que implique la vulneración en todas sus formas, con o sin acceso genital, del derecho de la mujer de decidir voluntariamente acerca de su vida sexual o reproductiva a través de amenazas, coerción, uso de la fuerza o intimidación, incluyendo la violación dentro del matrimonio o de otras relaciones vinculares o de parentesco, exista o no convivencia, así como la prostitución forzada, explotación, esclavitud, acoso, abuso sexual y trata de mujeres." },
    {
      tipo: "Económica y patrimonial", text: "La que se dirige a ocasionar un menoscabo en los recursos económicos o patrimoniales de la mujer, a través de:", subtext:
        ["a) La perturbación de la posesión, tenencia o propiedad de sus bienes;", "b) La pérdida, sustracción, destrucción, retención o distracción indebida de objetos, instrumentos de trabajo, documentos personales, bienes, valores y derechos patrimoniales;", "c) La limitación de los recursos económicos destinados a satisfacer sus necesidades o privación de los medios indispensables para vivir una vida digna;", "d) La limitación o control de sus ingresos, así como la percepción de un salario menor por igual tarea, dentro de un mismo lugar de trabajo."]
    },
    { tipo: "Simbólica", text: "La que a través de patrones estereotipados, mensajes, valores, íconos o signos transmita y reproduzca dominación, desigualdad y discriminación en las relaciones sociales, naturalizando la subordinación de la mujer en la sociedad." },
    { tipo: "Política", text: "La que se dirige a menoscabar, anular, impedir, obstaculizar o restringir la participación política de la mujer, vulnerando el derecho a una vida política libre de violencia y/o el derecho a participar en los asuntos públicos y políticos en condiciones de igualdad con los varones. (Inciso incorporado por art. 3° de la Ley N° 27.533 B.O. 20/12/2019)" }
  ]

  const tiposModalidades = [
    { tipo: "Violencia doméstica contra las mujeres", text: " Aquella ejercida contra las mujeres por un integrante del grupo familiar, independientemente del espacio físico donde ésta ocurra, que dañe la dignidad, el bienestar, la integridad física, psicológica, sexual, económica o patrimonial, la libertad, comprendiendo la libertad reproductiva y el derecho al pleno desarrollo de las mujeres. Se entiende por grupo familiar el originado en el parentesco sea por consanguinidad o por afinidad, el matrimonio, las uniones de hecho y las parejas o noviazgos. Incluye las relaciones vigentes o finalizadas, no siendo requisito la convivencia;" },
    { tipo: "Violencia institucional contra las mujeres", text: "Aquella realizada por las/los funcionarias/os, profesionales, personal y agentes pertenecientes a cualquier órgano, ente o institución pública, que tenga como fin retardar, obstaculizar o impedir que las mujeres tengan acceso a las políticas públicas y ejerzan los derechos previstos en esta ley. Quedan comprendidas, además, las que se ejercen en los partidos políticos, sindicatos, organizaciones empresariales, deportivas y de la sociedad civil;" },
    { tipo: " Violencia laboral contra las mujeres", text: "Aquella que discrimina a las mujeres en los ámbitos de trabajo públicos o privados y que obstaculiza su acceso al empleo, contratación, ascenso, estabilidad o permanencia en el mismo, exigiendo requisitos sobre estado civil, maternidad, edad, apariencia física o la realización de test de embarazo. Constituye también violencia contra las mujeres en el ámbito laboral quebrantar el derecho de igual remuneración por igual tarea o función. Asimismo, incluye el hostigamiento psicológico en forma sistemática sobre una determinada trabajadora con el fin de lograr su exclusión laboral;" },
    { tipo: "Violencia contra la libertad reproductiva", text: "Aquella que vulnere el derecho de las mujeres a decidir libre y responsablemente el número de embarazos o el intervalo entre los nacimientos, de conformidad con la Ley 25.673 de Creación del Programa Nacional de Salud Sexual y Procreación Responsable;" },
    { tipo: "Violencia obstétrica", text: "Aquella que ejerce el personal de salud sobre el cuerpo y los procesos reproductivos de las mujeres, expresada en un trato deshumanizado, un abuso de medicalización y patologización de los procesos naturales, de conformidad con la Ley 25.929." },
    { tipo: "Violencia mediática contra las mujeres", text: "Aquella publicación o difusión de mensajes e imágenes estereotipados a través de cualquier medio masivo de comunicación, que de manera directa o indirecta promueva la explotación de mujeres o sus imágenes, injurie, difame, discrimine, deshonre, humille o atente contra la dignidad de las mujeres, como así también la utilización de mujeres, adolescentes y niñas en mensajes e imágenes pornográficas, legitimando la desigualdad de trato o construya patrones socioculturales reproductores de la desigualdad o generadores de violencia contra las mujeres." },
    { tipo: "Violencia contra las mujeres en el espacio público", text: " aquella ejercida contra las mujeres por una o más personas, en lugares públicos o de acceso público, como medios de transporte o centros comerciales, a través de conductas o expresiones verbales o no verbales, con connotación sexual, que afecten o dañen su dignidad, integridad, libertad, libre circulación o permanencia y/o generen un ambiente hostil u ofensivo. (Inciso incorporado por art. 1° de la Ley N° 27.501 B.O. 8/5/2019)" },
    { tipo: "Violencia pública-política contra las mujeres", text: "Aquella que, fundada en razones de género, mediando intimidación, hostigamiento, deshonra, descrédito, persecución, acoso y/o amenazas, impida o limite el desarrollo propio de la vida política o el acceso a derechos y deberes políticos, atentando contra la normativa vigente en materia de representación política de las mujeres, y/o desalentando o menoscabando el ejercicio político o la actividad política de las mujeres, pudiendo ocurrir en cualquier espacio de la vida pública y política, tales como instituciones estatales, recintos de votación, partidos políticos, organizaciones sociales, asociaciones sindicales, medios de comunicación, entre otros. (Inciso incorporado por art. 4° de la Ley N° 27.533 B.O. 20/12/2019)" },
    { tipo: "Violencia digital o telemática", text: "Toda conducta, acción u omisión en contra de las mujeres basada en su género que sea cometida, instigada o agravada, en parte o en su totalidad, con la asistencia, utilización y/o apropiación de las tecnologías de la información y la comunicación, con el objeto de causar daños físicos, psicológicos, económicos, sexuales o morales tanto en el ámbito privado como en el público a ellas o su grupo familiar. En especial conductas que atenten contra su integridad, dignidad, identidad, reputación, libertad, y contra el acceso, permanencia y desenvolvimiento en el espacio digital o que impliquen la obtención, reproducción y difusión, sin consentimiento de material digital real o editado, intimo o de desnudez, que se le atribuya a las mujeres, o la reproducción en el espacio digital de discursos de odio misóginos y patrones estereotipados sexistas o situaciones de acoso, amenaza, extorsión, control o espionaje de la actividad virtual, accesos no autorizados a dispositivos electrónicos o cuentas en línea, robo y difusión no consentida de datos personales en la medida en que no sean conductas permitidas por la ley 25.326 y/o la que en el futuro la reemplace, o acciones que atenten contra la integridad sexual de las mujeres a través de las tecnologías de la información y la comunicación, o cualquier ciberataque que pueda surgir a futuro y que afecte los derechos protegidos en la presente ley." }
  ]

  const [modificarDatosGeograficos, setModificarDatosGeograficos] = useState(false)



  return (
    <div className='w-full'>
      <InputRegister campo="" nombre="denuncia_id" register={register} setValue={setValue} type="hidden" error={errors.dependencia_derivada} valor={datos._id} />
      <h1 className='text-2xl my-5'>Hecho</h1>
      <div className='flex flex-col xl:flex-row'>
        <SelectRegister isRequired={false} campo="Género" nombre="genero" opciones={generos} register={register} setValue={setValue} type="text" error={errors.genero} valor={datos.genero} />
        <InputDate valor={new Date(datos.fecha).toISOString().slice(0, 10)} campo="Fecha" nombre="fecha" register={register} type="text" error={errors.fecha} />
      </div>

      <div className='flex flex-col my-2'>
          {modificarDatosGeograficos ?
            <SelectCargaDenuncias consultarCoordenadas={consultarCoordenadas} direccion={direccion} setDireccion={setDireccion} coordenadas={coordenadas} setCoordenadas={setCoordenadas} errors={errors} setMunicipio={setMunicipio} campo="Unidad de carga" setComisariaPertenece={setComisariaPertenece} nombre="unidad_de_carga" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} state={isDivision} />
            :
            <SimpleTableCheckorX campo="Datos geográficos" datos={datosGeograficos} />
          }
          
          
          <div className='flex flex-col md:flex-row items-center justify-center w-full mt-2 '>
                <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setModificarDatosGeograficos(!modificarDatosGeograficos)}>
                   {!modificarDatosGeograficos ? <PencilIcon className='h-6'/> : <XMarkIcon className='h-6'/>}                
              </div>
          </div>
          <InputCheckbox campo="División Violencia Familiar y de Género" nombre="isDivision" register={register} setValue={setValue} type="checkbox" setHook={setIsDivision} state={isDivision} id="division" />
          <EditExpediente expediente={expedienteDividido} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />
        </div>

        <div className='flex flex-col md:flex-row my-2'>
          <SelectCargaDenuncias campo="Juzgado Interviniente" nombre="juzgado_interviniente" opciones={juzgadoIntervinente} register={register} setValue={setValue} type="text" error={errors.juzgado_interviniente} state={"Aasd"} />
          <InputRegister notMid={true} campo="Dependencia Derivada" nombre="dependencia_derivada" register={register} setValue={setValue} type="text" error={errors.dependencia_derivada} valor={datos.dependencia_derivada} />
        </div>
        <div className='flex flex-col md:flex-row my-2' >
          <SelectCargaDenuncias valor={datos.violencia} campo="Violencia" nombre="violencia" opciones={opcionesViolencia} register={register} setValue={setValue} type="text" error={errors.violencia} />
          <SelectCargaDenuncias valor={datos.modalidades} setTitulo={setTitulo} info={tiposModalidades} campo="Modalidades" nombre="modalidades" opciones={opcionesModalidades} register={register} setValue={setValue} type="text" error={errors.modalidades} handleOpenModal={handleOpenModal} />
        </div>
        <>
          <span className='ml-4 font-medium xl:text-vw flex flex-row my-2'> Tipo de Violencia
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4 cursor-pointer" onClick={() => (

              setTitulo("Tipos de Violencia"),
              handleOpenModal(tiposDeViolenciaText)

            )}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </span>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 my-2`}>
            <InputCheckbox campo="Física" nombre="fisica" register={register} setValue={setValue} type="checkbox" id="fisica" state={datos.tipo_de_violencia.Fisica} />
            <InputCheckbox campo="Psicológica" nombre="psicologica" register={register} setValue={setValue} type="checkbox" id="psicologica" state={datos.tipo_de_violencia.Psicologica} />
            <InputCheckbox campo="Sexual" nombre="sexual" register={register} setValue={setValue} type="checkbox" id="sexual" state={datos.tipo_de_violencia.Sexual} />
            <InputCheckbox campo="Económica y Patrimonial" nombre="economica_y_patrimonial" register={register} setValue={setValue} type="checkbox" id="economica_patrimonial" state={datos.tipo_de_violencia.Economica_y_patrimonial} />
            <InputCheckbox campo="Simbólica" nombre="simbolica" register={register} setValue={setValue} type="checkbox" id="simbolica" state={datos.tipo_de_violencia.Simbolica} />
            <InputCheckbox campo="Política" nombre="politica" register={register} setValue={setValue} type="checkbox" id="politica" state={datos.tipo_de_violencia.Politica} />
          </div>
        </>
        <div className='flex flex-col my-2'>
          <span className='ml-4 font-medium xl:text-vw'> Empleo de armas </span>

          <div className='flex flex-col md:flex-row my-2'>
            <InputCheckbox campo="Empleo de Armas" nombre="empleo_de_armas" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsArmas} state={isArmas} id="empleo_de_armas" />
            {isArmas &&
              <>
                <SelectCargaDenuncias valor={datos.arma_empleada} campo="Arma empleada" nombre="tipo_de_arma" opciones={opcionesTiposDeArma} register={register} setValue={setValue} type="text" error={errors.modalidad} />
              </>
            }
          </div>
        </div>
        <div className='flex flex-col my-2'>
          <span className='ml-4 font-medium xl:text-vw'> Medida Solicitada </span>
          <div className='flex flex-col md:flex-row'>
            <InputCheckbox campo="Solicitada" nombre="medida_solicitada_por_la_victima" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsSolicitada} state={isSolicitada} id="solicitada" />
            <InputCheckbox  campo="Dispuesto Por Autoridad Judicial" nombre="medida_dispuesta_por_autoridad_judicial" register={register} setValue={setValue} type="checkbox" error={errors.dispuestoPorAutoridadJudicial} setHook={setIsDispuestoPorAutoridadJudicial} state={isDispuestoPorAutoridadJudicial} id="dispuestoPorAutoridad" />
          </div>
        </div>
        {(isDispuestoPorAutoridadJudicial || isSolicitada) &&
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
              <InputCheckbox state={datos.medida.prohibicion_de_acercamiento} campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento" register={register} setValue={setValue} type="checkbox" id="prohibicion" />
              <InputCheckbox state={datos.medida.restitucion_de_menor} campo="Restitución de Menor" nombre="restitucion_de_menor" register={register} setValue={setValue} type="checkbox" id="restitucion" />
              <InputCheckbox state={datos.medida.exclusion_de_hogar} campo="Exclusión Hogar" nombre="exclusion_de_hogar" register={register} setValue={setValue} type="checkbox" id="exclusion" />
              <InputCheckbox state={datos.medida.alimento_provisorio} campo="Alimento Provisorio" nombre="alimento_provisorio" register={register} setValue={setValue} type="checkbox" id="alimentoProvisorio" />
              <InputCheckbox state={datos.medida.derecho_de_comunicacion} campo="Derecho Comunicación" nombre="derecho_de_comunicacion" register={register} setValue={setValue} type="checkbox" id="derechoComunicacion" />
              <InputCheckbox state={datos.medida.boton_antipanico} campo="Botón Antipánico" nombre="boton_antipanico" register={register} setValue={setValue} type="checkbox" id="botonAntipanico" />
              <div />
            </div>
          </>
        }
        <div className='flex flex-col '>
          <span className='ml-4 font-medium xl:text-vw'> Denunciado por tercero</span>
          <div className='flex flex-col md:flex-row'>
            <InputCheckbox campo="Denunciado por tercero" nombre="denunciado_por_tercero" register={register} setValue={setValue} type="checkbox" error={errors.denunciado_por_tercero} setHook={setIsDenunciadoPorTercero} state={isDenunciadoPorTercero} id="denunciadoPorTercero" />
          </div>
          {isDenunciadoPorTercero &&
            <>
              <div className='flex flex-col md:flex-row'>
                <InputRegister valor={datos.nombre_tercero} campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} type="text" error={errors.nombre} />
                <InputRegister valor={datos.apellido_tercero} campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} type="text" error={errors.apellido} />
                <InputRegister valor={datos.dni_tercero} campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} type="text" error={errors.DNI} />
              </div>
              <div className='flex flex-col'>
                <SelectRegister valor={datos.vinculo_con_victima} campo="Vinculo con la víctima" nombre="vinculo_con_la_victima" opciones={vinculoConVictima} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor} />
              </div>
            </>
          }
        </div>
      </div>
      )
}

      export default EditHecho