/*
_______________________________________________________________________________________________________
Uso del componente:
    EditSection recibe los datos de la victima, victimario, hecho y datos geograficos para pasarlos 
    a los componentes hijos EditVictima, EditVictimario y EditHecho y así poder ser mostrados para que estos
    sean editados y guardados en la base de datos.
_______________________________________________________________________________________________________
*/
// Hooks
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// APIs y BackEnd
import { crearDenuncia, agregarVictima, agregarVictimario, aprobarDenuncia } from '../../api/crud'
// Componentes
import VerificarDenunciante from '../VerificarDenuncias/VerificarDenunciante'
import CargarVictimario from '../Cargar/CargarVictimario'
import CargarDenuncia from '../Cargar/CargarDenuncia'
import Modal from '../Modal'
import InputTextArea from '../InputComponents/InputTextArea'
import Swal from 'sweetalert2'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'

import { useAuth } from '../../context/auth';
// Props
interface EditSectionProps {
    datos: any
    setEditSection?: any
    editSection?: boolean
    datosGeograficos?: any
}

function EditSectionSinVerificar({ datos, setEditSection, editSection }: EditSectionProps) {
    // @ts-ignore
    const {  user } = useAuth();
    // Utilizamos useForm para manejar los datos del formulario
    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    // Estados
    const [titulo, setTitulo] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [texto, setTexto] = useState([''])
    // Función para abrir el modal
    const handleOpenModal = (text: string[]) => {
        setIsModalOpen(true);
        setTexto(text);
    }

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const datosVictima = {
        nombre: datos.nombre_victima,
        apellido: datos.apellido_victima,
        DNI: datos.DNI_victima,
        edad: datos.edad_victima,
        estado_civil: datos.estado_civil_victima,
        ocupacion: datos.ocupacion_victima,
        telefono: datos.telefono_victima,
    }
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
  const [expedienteDividido] = useState(dividirExpediente(datos.numero_de_expediente))

    return (
        <div>
            {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
            <form
                onSubmit={
                    handleSubmit(async (values) => {

                        values.estado_civil_victima ? values.estado_civil_victima  = values.estado_civil_victima : values.estado_civil_victima = datosVictima.estado_civil
                        values.ocupacion_victima ? values.ocupacion_victima = values.ocupacion_victima : values.ocupacion_victima = datosVictima.ocupacion
                        const idVictima = await agregarVictima(values).then((id) => {
                            return id
                          })
                          values.dni_victimario = values.dni_victimario ? values.dni_victimario : 'S/N'
                          const idVictimario = await agregarVictimario(values).then((id) => {
                            return id
                          })
                          values.victima_ID = idVictima
                          values.victimario_ID = idVictimario
                          if (!values.Expediente) {
                            values.Expediente = 'S/N'
                            values.is_expediente_completo = false
                          } else {
                            values.is_expediente_completo = true
                          }


                          values.user_id = user.id
                          values.numero_de_expediente = values.PrefijoExpediente + values.numero_expediente + values.Expediente + values.SufijoExpediente
                            try{
                              crearDenuncia(values)
                              aprobarDenuncia(datos._id)

                              Swal.fire({
                                title: '¡Denuncia enviada!',
                                text: 'La denuncia ha sido cargada con éxito',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: '#0C4A6E',    
                              }).then((result) => {
                                if (result.isConfirmed) {
                                 window.location.reload();
                                }
                              })
                            }catch(error){
                              console.log(error)
                            }
                    })}>
                <h1 className='text-2xl my-5'>Víctima</h1>
                <div className='flex justify-center'>
                    <VerificarDenunciante datos={datosVictima} register={register} setValue={setValue} errors={errors} />
                </div>
                <h1 className='text-2xl my-5'>Victimario</h1>
                <div className='flex justify-center'>
                    <CargarVictimario register={register} setValue={setValue} errors={errors} />
                </div>
                <h1 className='text-2xl my-5'>Hecho</h1>
              <div className='flex justify-center'>
                <CargarDenuncia expediente={expedienteDividido} setTitulo={setTitulo} register={register} setValue={setValue} errors={errors} handleOpenModal={handleOpenModal} />
              </div>
                <>
                    <h1 className='text-2xl my-5'>Observaciones o denuncia</h1>
                    <InputTextArea variante="edit" valor={datos.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register} type="text" ></InputTextArea>
                </>
                <div className='flex flex-col md:flex-row items-center justify-center w-full my-2'>
                    <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setEditSection(!editSection)}>
                        <XMarkIcon className="w-7" />
                    </div>
                    <button className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2 ' >
                        <CheckIcon className="w-7" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditSectionSinVerificar