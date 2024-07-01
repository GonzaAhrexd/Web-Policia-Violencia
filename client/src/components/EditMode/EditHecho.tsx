/*
______________________________________________________________________________
    Uso del componente:
    EditHecho recibe los datos del hecho para ser mostrados y editados en el formulario
    de la sección de hecho.
______________________________________________________________________________ */

// Hooks
import { useState } from 'react'
// Campos
import { generos } from '../../GlobalConst/generosCampos'
import { unidadCampos } from '../../GlobalConst/unidadCampos'
import { vinculo } from '../../GlobalConst/vinculoCampos'
import { juzgadoIntervinente } from '../../GlobalConst/juzgadoIntervinenteCampos'
import { opcionesViolencia } from '../../GlobalConst/violenciaCampos'
import { opcionesModalidades } from '../../GlobalConst/modalidadesCampos'
import { opcionesTiposDeArma } from '../../GlobalConst/tiposDeArmasCampos'
import { tiposDeViolenciaText, tiposModalidades } from '../../GlobalConst/modalTextos'
// Backend
import { getCoords } from '../../api/coordinates'
// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectCargaDenuncias from '../Select/SelectCargaDenuncias'
import SelectRegister from '../Select/SelectRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputDate from '../InputComponents/InputDate'
import SimpleTableCheckorX from '../ShowData/SimpleTableCheckorX'
import EditExpediente from '../EditMode/EditExpediente'
//Iconos
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

interface denunciaProps {
  register: any
  setValue: any
  errors: any
  handleOpenModal: any
  setTitulo: any
  datos: any
  datosGeograficos: any
  datosTerceros: any
}

function EditHecho({ datosTerceros, datosGeograficos, datos, setTitulo, handleOpenModal, register, setValue, errors }: denunciaProps) {
  // Función para dividir el expediente
  const dividirExpediente = (expediente: string) => {
    let division = expediente.split("-")
    let division2 = division[0].split("/")
    let divisionCompleta = []
    divisionCompleta[0] = division2[0]
    divisionCompleta[1] = division2[1]
    divisionCompleta[2] = division[1]
    divisionCompleta[3] = division[2]
    return divisionCompleta
  }

  // Estados
  const [expedienteDividido] = useState(dividirExpediente(datos.numero_de_expediente))
  const [comisariaPertenece, setComisariaPertenece] = useState(expedienteDividido[1] + "-")
  const [isArmas, setIsArmas] = useState(datos.empleo_de_armas)
  const [isDivision, setIsDivision] = useState(false)
  const [isSolicitada, setIsSolicitada] = useState(datos.medida_solicitada_por_la_victima)
  const [isDispuestoPorAutoridadJudicial, setIsDispuestoPorAutoridadJudicial] = useState(datos.medida_dispuesta_por_autoridad_judicial)
  const [isDenunciadoPorTercero, setIsDenunciadoPorTercero] = useState(datos.denunciado_por_tercero)
  const [municipio, setMunicipio] = useState('')
  const [coordenadas, setCoordenadas] = useState('')
  const [direccion, setDireccion] = useState('')
  const [modificarDatosGeograficos, setModificarDatosGeograficos] = useState(false)

  // Función para consultar las coordenadas
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


  return (
    <div className='w-full'>
      <InputRegister campo="" nombre="denuncia_id" register={register} setValue={setValue} type="hidden" error={errors._id} valor={datos._id} />
      <InputRegister campo="" nombre="tercero_ID" register={register} setValue={setValue} type="hidden" error={errors.tercero_ID} valor={datos.tercero_ID ? datos.tercero_ID : "No hay tercero"} />
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
                <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setModificarDatosGeograficos(!modificarDatosGeograficos)}>
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
          <span className='ml-4 font-medium  flex flex-row my-2'> Tipo de Violencia
            <QuestionMarkCircleIcon className="w-6 h-4 cursor-pointer" onClick={() => (
              setTitulo("Tipos de Violencia"),
              handleOpenModal(tiposDeViolenciaText)
            )}/>
            
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
          <span className='ml-4 font-medium '> Empleo de armas </span>

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
          <span className='ml-4 font-medium '> Medida Solicitada </span>
          <div className='flex flex-col md:flex-row'>
            <InputCheckbox campo="Solicitada" nombre="medida_solicitada_por_la_victima" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsSolicitada} state={isSolicitada} id="solicitada" />
            <InputCheckbox  campo="Dispuesto Por Autoridad Judicial" nombre="medida_dispuesta_por_autoridad_judicial" register={register} setValue={setValue} type="checkbox" error={errors.dispuestoPorAutoridadJudicial} setHook={setIsDispuestoPorAutoridadJudicial} state={isDispuestoPorAutoridadJudicial} id="dispuestoPorAutoridad" />
          </div>
        </div>
        {(isDispuestoPorAutoridadJudicial || isSolicitada) &&
          <>
        <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md`}>
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
          <span className='ml-4 font-medium '> Denunciado por tercero</span>
          <div className='flex flex-col md:flex-row'>
            <InputCheckbox campo="Denunciado por tercero" nombre="denunciado_por_tercero" register={register} setValue={setValue} type="checkbox" error={errors.denunciado_por_tercero} setHook={setIsDenunciadoPorTercero} state={isDenunciadoPorTercero} id="denunciadoPorTercero" />
          </div>
          {isDenunciadoPorTercero &&
            <>
              <div className='flex flex-col md:flex-row'>
                <InputRegister valor={datosTerceros[0].valor} campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} type="text" error={errors.nombre} />
                <InputRegister valor={datosTerceros[1].valor} campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} type="text" error={errors.apellido} />
                <InputRegister valor={datosTerceros[2].valor} campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} type="text" error={errors.DNI} />
              </div>
              <div className='flex flex-col'>
                <SelectRegister isRequired={false} valor={datosTerceros[3].valor} campo="Vínculo con la víctima" nombre="vinculo_con_la_victima" opciones={vinculo} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor} />
              </div>
            </>
          }
        </div>
      </div>
      )
}

export default EditHecho