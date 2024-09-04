import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import Swal from "sweetalert2"
import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import InputRegister from "../InputComponents/InputRegister"
import { agregarCampo } from "../../api/CRUD/campos.crud"



type TablaCamposProps = {
    campos: any;
    tipo: any
}

function TablaCampos({ campos, tipo }: TablaCamposProps) {
    const [showAddNew, setShowAddNew] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    'El campo ha sido eliminado.',
                    'success'
                )
            }
        })
    }

    const handleAdd = () => {
        setShowAddNew(!showAddNew);
    }
    return (
        <div className="table w-full h-full md:w-5/10 m-4 border-2 border-sky-800">
            <div className='table-row'>
                <div className="flex items-center justify-between bg-sky-900 text-white font-medium h-10" >
                    <div className="w-4/10 ml-4">Nombre</div>
                    <div className="w-4/10">Valor</div>
                    <div className="w-2/10">Acciones</div>
                </div>
            </div>
            {campos?.map((campo: any, index: number) => (
                <div key={index} className='table-row'>
                    <div className="flex items-center justify-between h-10 m-1">
                        <div className="w-4/10 ml-4">{campo.nombre}</div>
                        <div className="w-4/10">{campo.value}</div>
                        <div className="w-2/10">
                            <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded"><PencilSquareIcon className="w-6 h-6" /></button>
                            <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={() => handleDelete()}><TrashIcon className="w-6 h-6" /></button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="h-full">

                {showAddNew && (
                    <form className="flex flex-col items-center justify-between w-full m-1"
                        onSubmit={handleSubmit((data) => {
                            Swal.fire({
                                icon: 'warning',
                                title: "¿Estás seguro?",
                                text: "Podrás editarlo más tarde",
                                showCancelButton: true,
                                confirmButtonColor: '#0C4A6E',
                                cancelButtonColor: '#FF554C',
                                confirmButtonText: 'Sí, agregar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    data.tipo = tipo
                                    agregarCampo(data)
                                    setShowAddNew(false)
                                }
                            }
                            )
                        })}>
                        <div className="flex flex-col w-full md:w-3/4">
                            <InputRegister
                                notMid
                                campo="Campo"
                                nombre="campo"
                                register={register}
                                type="text"
                                error={errors.campo}
                            />
                            <InputRegister
                                notMid
                                campo="Valor"
                                nombre="value"
                                register={register}
                                type="text"
                                error={errors.value}
                            />
                        </div>
                        <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded w-full md:w-3/4">
                            Guardar
                        </button>
                    </form>

                )}
                <div className="flex items-center justify-center">
                    {!showAddNew && <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={() => handleAdd()}>Agregar</button>}
                </div>

            </div>
        </div>
    )
}

export default TablaCampos