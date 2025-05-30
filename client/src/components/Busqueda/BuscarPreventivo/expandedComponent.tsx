// Hooks
import { useState } from "react";
// Librerías React
import Swal from "sweetalert2";
// Iconos
import { TrashIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { PrinterIcon } from "@heroicons/react/24/outline";
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import EditPrevencion from "../../EditMode/EditPrevencion";
// Context
import { useAuth } from "../../../context/auth"
// BackEnd
import { deletePreventivo } from "../../../api/CRUD/preventivo.crud";
import { pdf } from "@react-pdf/renderer";
import PDF from "../../Cargar/CargarPreventivo/PDF";

type expandedComponentProps = {
    data: any
}
// Expanded component PREVENTIVO
function expandedComponent({ data }: expandedComponentProps) {

    const [editGlobal, setEditGlobal] = useState(false)
    const [ampliarPreventivo, setAmpliarPreventivo] = useState(false)
    const { user } = useAuth();

    const handlePrint = async () => {

        let blob

  
        if (data.tipo_preventivo === "Ampliación de preventivo") {

            blob = await pdf(<PDF datos={data} user={user} ampliacion={true} />).toBlob();
        } else {
            blob = await pdf(<PDF datos={data} user={user} />).toBlob();
        }

        // Crea una URL de objeto a partir del blob
        const url = URL.createObjectURL(blob);
        // Abre la URL en una nueva pestaña
        window.open(url);

    }

    // Datos del preventivo
    const datosPreventivo = [
        { nombre: "Número de nota", valor: data.numero_nota ? data.numero_nota : "No ingresado" },
        { nombre: "ID preventivo", valor: data._id ? data._id : "No ingresado" },
        { nombre: "Fecha", valor: data.fecha ? data.fecha : "No ingresado" },
        { nombre: "Objeto", valor: data.objeto ? data.objeto : "No ingresado" },

    ]
    // Datos de la víctima
    const victimaDatosMostrar = [
        { nombre: "Nombre de la víctima", valor: data.nombre_victima ? data.nombre_victima : "No ingresado" },
        { nombre: "Apellido de la víctima", valor: data.apellido_victima ? data.apellido_victima : "No ingresado" },
        { nombre: "Edad víctima", valor: data.edad_victima ? data.edad_victima : "No ingresado" },
        { nombre: "DNI víctima", valor: data.DNI_victima ? data.DNI_victima : "No ingresado" },
        { nombre: "Estado civil víctima", valor: data.estado_civil_victima ? data.estado_civil_victima : "No ingresado" },
        { nombre: "Ocupación víctima", valor: data.ocupacion_victima ? data.ocupacion_victima : "No ingresado" },
        { nombre: "Nacionalidad de la víctima", valor: data.nacionalidad_victima ? data.nacionalidad_victima : "No ingresado" },
        { nombre: "Género de la víctima", valor: data.genero_victima ? data.genero_victima : "No ingresado" },
        { nombre: "Domicilio de la víctima", valor: data.direccion_victima ? data.direccion_victima : "No ingresado" },
        { nombre: "Teléfono víctima", valor: data.telefono_victima ? data.telefono_victima : "No ingresado" },
    ]
    // Datos del secretario
    const secretarioDatosMostrar = [
        { nombre: "Nombre del secretario", valor: data.secretario?.nombre_completo_secretario ? data.secretario.nombre_completo_secretario : "No ingresado" },
        { nombre: "Jerarquía secretario", valor: data.secretario?.jerarquia_secretario ? data.secretario.jerarquia_secretario : "No ingresado" },
        { nombre: "Plaza secretario", valor: data.secretario?.plaza_secretario ? data.secretario.plaza_secretario : "No ingresado" },
    ]
    // Datos del instructor
    const instructorDatosMostrar = [
        { nombre: "Nombre del instructor", valor: data.instructor?.nombre_completo_instructor ? data.instructor.nombre_completo_instructor : "No ingresado" },
        { nombre: "Jerarquía instructor", valor: data.instructor?.jerarquia_instructor ? data.instructor.jerarquia_instructor : "No ingresado" },
    ]

    const handleDelete = async (data: any) => {
        const result = await Swal.fire({
            title: '¿Está seguro de que desea eliminar el preventivo?',
            text: "No podrá revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, eliminar'
        })

        if (result.isConfirmed) {
            await deletePreventivo(data._id)
        }
    }

    if (ampliarPreventivo) {
        return (
            <EditPrevencion modoExpandir={true} data={data} />
        )
    }

    else if (editGlobal) {
        return (
            <EditPrevencion modoExpandir={false} data={data} />
        )
    }
    else {
        return (

            <div>
                <button
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full "
                    onClick={() => setAmpliarPreventivo(true)}
                >
                    Ampliar preventivo
                </button>

                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos preventivo</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={datosPreventivo} />
                </div>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos de la víctima</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={victimaDatosMostrar} />
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Autoridades</h1>
                    <ul className="flex flex-col">
                        <li>{data.autoridades}</li>
                    </ul>
                </div>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos del secretario</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={secretarioDatosMostrar} />
                </div>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos del instructor</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={instructorDatosMostrar} />
                </div>

                <div className='flex flex-col md:flex-row items-center justify-center m-2 md:m-0'>
                    <div className="bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0" onClick={() => handlePrint()}>
                        <PrinterIcon className="w-7" />
                    </div>
                    {((user.rol === "admin") || (user.rol === "carga")) &&
                        <>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                                <PencilSquareIcon className="w-7" />
                            </div>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(data)}>
                                <TrashIcon className="w-7" />
                            </div>
                        </>
                    }
                </div>


            </div>


        )
    }
}


export default expandedComponent