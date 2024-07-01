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
import { editarVictima, editarVictimario, editarDenuncia, editarTercero, crearTercero } from '../../api/crud'
// Componentes
import EditVictima from './EditVictima'
import EditVictimario from './EditVictimario'
import EditHecho from './EditHecho'
import Modal from '../Modal'
import InputTextArea from '../InputComponents/InputTextArea'
import Swal from 'sweetalert2'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'

// Props
interface EditSectionProps {
    datosVictima: any
    datosVictimario: any
    datosHecho: any
    setEditSection: any
    editSection: boolean
    datosGeograficos: any
    datosTerceros: any
}

function EditSection({ datosTerceros, datosGeograficos, datosVictima, datosVictimario, datosHecho, setEditSection, editSection }: EditSectionProps) {
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

    return (
        <div>
            {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
            <form
                onSubmit={
                    handleSubmit(async (values) => {
                        // Llamamos a editar victima del backend
                        editarVictima(values)
                        // Llamamos a editar victimario del backend
                        editarVictimario(values)
                        // Editar tercero
                        if (values.denunciado_por_tercero) {
                            if (datosTerceros.denunciado_por_tercero) {
                                editarTercero(values)
                            } else {
                                const idTercero = await crearTercero(values)
                                values.tercero_ID = idTercero
                            }
                        }
                        // Formamos el expediente
                        values.nuevoExpediente = values.PrefijoExpediente + values.numero_expediente + values.Expediente + values.SufijoExpediente
                        // Evaluamos si el expediente está completo para asignarle true o false
                        if (values.Expediente !== 'S/N') {
                            values.isExpedienteCompleto = true
                        } else {
                            values.isExpedienteCompleto = false
                        }
                        // Llamamos a editar denuncia del backend
                        editarDenuncia(values)
                        // Utilizamos Swal para mostrar un mensaje de éxito
                        Swal.fire({
                            icon: 'success',
                            title: '¡Denuncia editada con éxito!',
                            showConfirmButton: true,
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#0C4A6E',
                        }).then((result) => {
                            // Si se confirma el mensaje, recargamos la página
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        })
                    })}>

                <EditVictima hijos_con_agresor={datosHecho.hijos_victima_con_victimario} vinculo_con_agresor={datosHecho.relacion_victima_victimario} datos={datosVictima} register={register} setValue={setValue} errors={errors} />
                <EditVictimario datos={datosVictimario} register={register} setValue={setValue} errors={errors} />
                <EditHecho datosTerceros={datosTerceros} datosGeograficos={datosGeograficos} datos={datosHecho} handleOpenModal={handleOpenModal} setTitulo={setTitulo} register={register} setValue={setValue} errors={errors} />
                <>
                    <h1 className='text-2xl my-5'>Observaciones</h1>
                    <InputTextArea variante="edit" valor={datosHecho.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register} type="text" ></InputTextArea>
                </>
                <div className='flex flex-col md:flex-row items-center justify-center w-full my-2'>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setEditSection(!editSection)}>
                        <XMarkIcon className="w-7" />
                    </div>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2 ' >
                        <CheckIcon className="w-7" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditSection