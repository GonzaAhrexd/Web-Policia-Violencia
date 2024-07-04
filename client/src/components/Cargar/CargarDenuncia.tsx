// Hooks
import { useState } from 'react'
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';

// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectCargaDenuncias from '../Select/SelectCargaDenuncias'
import SelectRegister from '../Select/SelectRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputDate from '../InputComponents/InputDate'
import InputExpediente from '../InputComponents/InputExpediente'
import EditExpediente from '../EditMode/EditExpediente';
import InputRadio from '../InputComponents/InputRadio'
// Apis y BackEnd
import { getCoords } from '../../api/coordinates'

// Campos
import { generos } from '../../GlobalConst/generosCampos'
import { unidadCampos } from '../../GlobalConst/unidadCampos'
import { vinculo } from '../../GlobalConst/vinculoCampos'
import { juzgadoIntervinente } from '../../GlobalConst/juzgadoIntervinenteCampos'
import { opcionesViolencia } from '../../GlobalConst/violenciaCampos'
import { opcionesModalidades } from '../../GlobalConst/modalidadesCampos'
import { opcionesTiposDeArma } from '../../GlobalConst/tiposDeArmasCampos'
import { tiposDeViolenciaText, tiposModalidades } from '../../GlobalConst/modalTextos'
import { opcionesNotificado } from '../../GlobalConst/opcionesNotificadoCampos'
// Iconos
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'


// Props
interface denunciaProps {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>;
  errors: FieldErrors
  handleOpenModal: any
  setTitulo: any
  expediente?: any
  setTercero?: any
  setOpenModalTercero?: any
}

function

  CargarDenuncia({ setTitulo, handleOpenModal, register, setValue, errors, expediente, setTercero, setOpenModalTercero }: denunciaProps) {

  const [comisariaPertenece, setComisariaPertenece] = useState('')
  const [isArmas, setIsArmas] = useState(false)
  const [isDivision, setIsDivision] = useState(false)
  const [isDenunciadoPorTercero, setIsDenunciadoPorTercero] = useState(false)
  const [municipio, setMunicipio] = useState('')
  const [coordenadas, setCoordenadas] = useState('')
  const [direccion, setDireccion] = useState('')
  const [barrio, setBarrio] = useState('')


  const consultarCoordenadas = async () => {
    let buscarDir = direccion + "," + barrio + "," + municipio;

    const fetchCoords = async (query: any) => {
      try {
        const coords = await getCoords(query);
        if (coords && coords.lat && coords.lon) {
          const coordenadasObtenidas = coords.lat + " " + coords.lon;
          return coordenadasObtenidas;
        }
        return null;
      } catch (error) {
        console.error("Error al obtener coordenadas:", error);
        return null;
      }
    };

    if (buscarDir) {
      fetchCoords(buscarDir).then((response) => {
        if (response) {
          // Si se obtuvieron coordenadas con la dirección completa
          setCoordenadas(response);
          setValue('GIS', coordenadas);
        } else {
          // Si no se obtuvieron coordenadas, intentar solo con barrio y municipio
          const buscarSinDireccion = barrio + "," + municipio;
          fetchCoords(buscarSinDireccion).then((responseSinDireccion) => {
            if (responseSinDireccion) {
              setCoordenadas(responseSinDireccion);
              setValue('GIS', coordenadas);
            } else {
              console.log("No se pudieron obtener las coordenadas.");
            }
          });
        }
      });
    }
  };
  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col xl:flex-row'>
        <SelectRegister campo="Género" nombre="genero" opciones={generos} register={register} setValue={setValue} type="text" error={errors.genero} />
        <InputDate campo="Fecha" nombre="fecha" register={register} type="text" error={errors.fecha} />
      </div>
      <div className='flex flex-col my-2'>
        <SelectCargaDenuncias consultarCoordenadas={consultarCoordenadas} direccion={direccion} barrio={barrio} setBarrio={setBarrio} setDireccion={setDireccion} coordenadas={coordenadas} setCoordenadas={setCoordenadas} errors={errors} setMunicipio={setMunicipio} campo="Unidad de carga" setComisariaPertenece={setComisariaPertenece} nombre="unidad_de_carga" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} state={isDivision} />
        <InputCheckbox campo="División Violencia Familiar y de Género" nombre="isDivision" register={register} setValue={setValue} type="checkbox" setHook={setIsDivision} state={isDivision} id="division" />
        {!expediente ?
          <InputExpediente campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />
          :
          <EditExpediente expediente={expediente} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} ></EditExpediente>
        }
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <SelectCargaDenuncias campo="Organismo judicial interviniente" nombre="juzgado_interviniente" opciones={juzgadoIntervinente} register={register} setValue={setValue} type="text" error={errors.juzgado_interviniente} />
        <InputRegister campo="Número" nombre="juzgado_interviniente_numero" register={register} setValue={setValue} type="text" error={errors.juzgado_interviniente_numero} />
        <InputRegister campo="Dependencia Derivada" nombre="dependencia_derivada" register={register} setValue={setValue} type="text" error={errors.dependencia_derivada} />
      </div>
      <div className='flex flex-col md:flex-row my-2' >
        <SelectCargaDenuncias campo="Violencia" nombre="violencia" opciones={opcionesViolencia} register={register} setValue={setValue} type="text" error={errors.violencia} />
        <SelectCargaDenuncias setTitulo={setTitulo} info={tiposModalidades} campo="Modalidades" nombre="modalidades" opciones={opcionesModalidades} register={register} setValue={setValue} type="text" error={errors.modalidades} handleOpenModal={handleOpenModal} />
      </div>
      <>
        <span className='ml-4 font-medium flex flex-row my-2'> Tipo de Violencia
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4 cursor-pointer" onClick={() => (
            setTitulo("Tipos de Violencia"),
            handleOpenModal(tiposDeViolenciaText)
          )}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
        </span>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 my-2`}>
          <InputCheckbox campo="Física" nombre="fisica" register={register} setValue={setValue} type="checkbox" id="fisica" />
          <InputCheckbox campo="Psicológica" nombre="psicologica" register={register} setValue={setValue} type="checkbox" id="psicologica" />
          <InputCheckbox campo="Sexual" nombre="sexual" register={register} setValue={setValue} type="checkbox" id="sexual" />
          <InputCheckbox campo="Económica y Patrimonial" nombre="economica_y_patrimonial" register={register} setValue={setValue} type="checkbox" id="economica_patrimonial" />
          <InputCheckbox campo="Simbólica" nombre="simbolica" register={register} setValue={setValue} type="checkbox" id="simbolica" />
          <InputCheckbox campo="Política" nombre="politica" register={register} setValue={setValue} type="checkbox" id="politica" />

        </div>
      </>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Empleo de armas </span>

        <div className='flex flex-col md:flex-row my-2'>
          <InputCheckbox campo="Empleo de Armas" nombre="empleo_de_armas" register={register} setValue={setValue} type="checkbox" error={errors.hijos} setHook={setIsArmas} state={isArmas} id="empleo_de_armas" />
          {isArmas &&
            <>
              <SelectCargaDenuncias campo="Arma empleada" nombre="tipo_de_arma" opciones={opcionesTiposDeArma} register={register} setValue={setValue} type="text" error={errors.modalidad} />
            </>
          }
        </div>
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Medida Solicitada por la víctima</span>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 my-2 md:border-0 bg-white rounded-md`}>
        <InputCheckbox campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento" register={register} setValue={setValue} type="checkbox" id="prohibicion" />
        <InputCheckbox campo="Restitución de Menor" nombre="restitucion_de_menor" register={register} setValue={setValue} type="checkbox" id="restitucion" />
        <InputCheckbox campo="Exclusión Hogar" nombre="exclusion_de_hogar" register={register} setValue={setValue} type="checkbox" id="exclusion" />
        <InputCheckbox campo="Alimento Provisorio" nombre="alimento_provisorio" register={register} setValue={setValue} type="checkbox" id="alimentoProvisorio" />
        <InputCheckbox campo="Derecho Comunicación" nombre="derecho_de_comunicacion" register={register} setValue={setValue} type="checkbox" id="derechoComunicacion" />
        <InputCheckbox campo="Botón Antipánico" nombre="boton_antipanico" register={register} setValue={setValue} type="checkbox" id="botonAntipanico" />
        <div />
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Medida dispuesta por la autoridad judicial</span>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-white rounded-md`}>
        <InputCheckbox campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento_dispuesta" register={register} setValue={setValue} type="checkbox" id="prohibicion_dispuesta" />
        <InputCheckbox campo="Exclusión Hogar" nombre="exclusion_de_hogar_dispuesta" register={register} setValue={setValue} type="checkbox" id="exclusion_dispuesta" />
        <InputCheckbox campo="Botón Antipánico" nombre="boton_antipanico_dispuesta" register={register} setValue={setValue} type="checkbox" id="botonAntipanico_dispuesta" />
      </div>
      <>
        <span className='ml-4 font-medium my-2'> Notificación </span>
        <InputRadio campo="Notificación" nombre="notificacion" register={register} type="radio" opciones={opcionesNotificado} defaultValue={3} />
      </>


      <div className='flex flex-col '>
        <span className='ml-4 font-medium'> Denunciado por tercero</span>
        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Denunciado por tercero" nombre="denunciado_por_tercero" register={register} setValue={setValue} type="checkbox" error={errors.denunciado_por_tercero} setHook={setIsDenunciadoPorTercero} state={isDenunciadoPorTercero} id="denunciadoPorTercero" />
        </div>
        {isDenunciadoPorTercero &&
          <>
            <div className='flex flex-row items-center'>
              <h1 className='text-2xl my-5'>Datos del Tercero</h1>
              <MagnifyingGlassIcon className='flex items-center justify-center cursor-pointer text font-bold py-2 mx-5 rounded w-10 h-10' onClick={() => setOpenModalTercero(true)} />
            </div>
            {!setTercero ?
              <div className='flex flex-col md:flex-row'>
                <InputRegister campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} type="text" error={errors.nombre} />
                <InputRegister campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} type="text" error={errors.apellido} />
                <InputRegister campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} type="text" error={errors.DNI} />

              </div>
              :
              <div className='flex flex-col md:flex-row'>
                <InputRegister valor={setTercero.nombre} campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} type="text" error={errors.nombre} />
                <InputRegister valor={setTercero.apellido} campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} type="text" error={errors.apellido} />
                <InputRegister valor={setTercero.DNI} campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} type="text" error={errors.DNI} />
              </div>
            }
            <div className='flex flex-col'>
              <SelectRegister campo="Vínculo con la víctima" nombre="vinculo_con_la_victima" opciones={vinculo} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default CargarDenuncia