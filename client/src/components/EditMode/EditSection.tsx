import React from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import {useState} from 'react'
import { editarVictima, editarVictimario } from '../../api/crud'

// Componentes
import EditVictima from './EditVictima'
import EditVictimario from './EditVictimario'
import EditHecho from './EditHecho'
import Modal from '../Modal'

// Props
interface EditSectionProps {
    datosVictima: any
    datosVictimario: any
    datosHecho: any
    setEditSection: any
    editSection: boolean
}

function EditSection({ datosVictima, datosVictimario, datosHecho, setEditSection, editSection }: EditSectionProps) {

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
                        })}>
                            

            <EditVictima datos={datosVictima} register={register} setValue={setValue} errors={errors} />
            <EditVictimario datos={datosVictimario} register={register} setValue={setValue} errors={errors}/>
            <EditHecho datos={datosHecho} handleOpenModal={handleOpenModal} setTitulo={setTitulo} register={register} setValue={setValue} errors={errors} />
            <div className='flex flex-col md:flex-row items-center justify-center w-full '>
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