/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /MisDenuncias 
    Recibe los datos de la víctima, victimario y hecho para mostrarlos en una tabla
    y en un mapa. Además, se puede editar la denuncia y eliminarla.
_____________________________________________________________________________________________
*/
// Hooks
import { useState, useEffect } from 'react';
// APIs del BackEnd
import {  eliminarDenunciaSinVerificar } from '../../api/crud';
// Librerías react
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' // Librería para mostrar mapas
import Swal from 'sweetalert2' // Librería para mostrar popups
// Iconos
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
// Componentes
import SimpleTableCheckorX from '../../components/ShowData/SimpleTableCheckorX';
import EditSection from '../../components/EditMode/EditSection';
import ShowTextArea from '../../components/ShowData/ShowTextArea';
interface expandedComponentsProps {
    data: any
}
function expandedComponents({ data }: expandedComponentsProps) {

    const [editGlobal, setEditGlobal] = useState(false)

    const denuncianteDatos = [
        { nombre: "Nombre", valor: data.nombre_victima },
        { nombre: "Apellido", valor: data.apellido_victima },
        { nombre: "DNI", valor: data.DNI_victima },
        { nombre: "Nacionalidad", valor: data.nacionalidad_victima },
        { nombre: "Dirección", valor: data.direccion_victima },
        { nombre: "Teléfono", valor: data.telefono_victima },
        { nombre: "¿Sabe leer y Escribir?", valor: data.sabe_leer_y_escribir_victima },
    ]

    const preguntas = [
        { nombre: "¿Desea ser asistida?", valor: data.preguntas.desea_ser_asistida },
        { nombre: "¿Desea ser examinada por un médico?", valor: data.preguntas.desea_ser_examinada_por_medico},
        { nombre: "¿Desea accionar penalmente?", valor: data.preguntas.desea_accionar_penalmente},
        { nombre: "Desea agregar quitar o enmendar algo?", valor: data.preguntas.desea_agregar_quitar_o_enmendar},
    ]



    // Función para abrir Google Maps con el mapa de y las coordenadas
    const handleClick = (GIS: string) => {
        // Separar las coordenadas
        const coordenadasSeparadas = GIS.split(' ')
        // URL de Google Maps
        const url = `https://www.google.com/maps/d/viewer?mid=1n-ERiPIZT9Q0WlRQoWI_NmvI9jJffohO&g_ep=CAESCjExLjEyNC4xMDIYACDdYio_LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDQ3MDg3MTEyLDQ3MDg0MzkzQgJBUg%3D%3D&shorturl=1&ll=${coordenadasSeparadas[0]}%2C${coordenadasSeparadas[1]}&z=20`
        // Abrir en una nueva pestaña
        window.open(url, '_blank');
    }



    // Controlar cuando se da a eliminar
    const handleDelete = async (data: any) => {
        // Popup de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Llamada a la API
                    // A IMPLEMENTAR 
                    eliminarDenunciaSinVerificar(data._id)
                    // Mensaje de éxito
                    Swal.fire({
                        title: 'Borrado',
                        text: 'La denuncia ha sido borrada con éxito',
                        icon: 'success',
                        confirmButtonColor: '#0C4A6E',
                    }).then(() => {
                        window.location.reload()
                    })

                } catch (error) {
                    // Si hay un error
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al borrar la denuncia',
                        icon: 'error',
                        confirmButtonColor: '#0C4A6E',
                    }
                    )
                }
            }
        })
    }

    return <div className="flex flex-col p-2 sm:p-10 max-w-prose sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <h2 className='text-2xl my-5'>Datos de la denuncia</h2>
        <h1 className='text-3xl my-5 font-sans	'>Datos del denunciante</h1>
        <div className='flex flex-col'>
            <SimpleTableCheckorX campo="" datos={denuncianteDatos} />
        </div>
        <h1 className='text-3xl my-5 font-sans	'>Datos del hecho</h1>
        <ShowTextArea campo="Hecho" dato={data.observaciones} />
        <div className='flex flex-col'>
            <SimpleTableCheckorX campo="" datos={preguntas} />
        </div>
        {data.preguntas.desea_agregar_quitar_o_enmendar && 
        <>
        <h1 className='text-3xl my-5 font-sans	'>Adjunto</h1>
        <ShowTextArea campo="Hecho" dato={data.agrega} />
        </>
        }

<div className='my-5 flex flex-col md:flex-row items-center justify-center w-full '>
                    <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                        <PencilSquareIcon className="w-7" />
                    </div>
                    <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(data)}>
                        <TrashIcon className="w-7" />
                    </div>
                </div>

    </div>

}

export default expandedComponents