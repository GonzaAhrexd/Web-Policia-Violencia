import React from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import {useState} from 'react'
import { editarVictima, editarVictimario, editarDenuncia } from '../../api/crud'

// Componentes
import EditVictima from './EditVictima'
import EditVictimario from './EditVictimario'
import EditHecho from './EditHecho'
import Modal from '../Modal'
import InputTextArea from '../InputTextArea'
import Swal from 'sweetalert2'

// Props
interface EditSectionProps {
    datosVictima: any
    datosVictimario: any
    datosHecho: any
    setEditSection: any
    editSection: boolean
    datosGeograficos: any
}

function EditSection({datosGeograficos, datosVictima, datosVictimario, datosHecho, setEditSection, editSection }: EditSectionProps) {

    const { control, register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    const handleOpenModal = (text: string[]) => {
        setIsModalOpen(true);
        setTexto(text);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      }

    const [titulo, setTitulo] = useState('') 
    const [isModalOpen, setIsModalOpen] = useState(false) 
    const [texto, setTexto] = useState([''])

    return (
        
        
        <div>
              {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
              <form 
                    onSubmit={
                        handleSubmit(async (values) => {
                            console.log(values)
                            editarVictima(values)
                            editarVictimario(values)
                            console.log(values.numero_expediente)
                            values.nuevoExpediente = values.PrefijoExpediente + values.numero_expediente + values.Expediente + values.SufijoExpediente
                            console.log(values.nuevoExpediente)
                            
                            if (values.Expediente!== 'S/N'){
                                values.isExpedienteCompleto = true
                            }else{
                                console.log("asdas")
                                values.isExpedienteCompleto = false
                            }
                            editarDenuncia(values)
                            Swal.fire({
                                icon: 'success',
                                title: '¡Denuncia editada con éxito!',
                                showConfirmButton: true,
                                confirmButtonText: 'Aceptar',
                            }).then((result) => {
                              if (result.isConfirmed) {
                              
                               window.location.reload();
                              }
                            })
                        })}>
            <EditVictima datos={datosVictima} register={register} setValue={setValue} errors={errors} />
            <EditVictimario datos={datosVictimario} register={register} setValue={setValue} errors={errors}/>
            <EditHecho datosGeograficos={datosGeograficos} datos={datosHecho} handleOpenModal={handleOpenModal} setTitulo={setTitulo} register={register} setValue={setValue} errors={errors} />
            <>
            <h1 className='text-2xl my-5'>Observaciones o denuncia</h1>
           
            <InputTextArea variante="edit" valor={datosHecho.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register} type="text" ></InputTextArea>
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

export default EditSection