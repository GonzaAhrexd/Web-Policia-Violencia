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
import { buscarDenunciasPorId } from '../../../api/crud';
// Librerías react
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2' // Librería para mostrar popups
// Iconos
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';

import { columns } from '../BuscarDenuncias/columnsDataTable'
import { customStyles } from '../BuscarDenuncias/dataTableStyles'
// Importa expandedComponents con otro nombre

import  expandedDenuncia from '../BuscarDenuncias/expandedComponents'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
interface expandedComponentsProps {
    data: any
}
function expandedComponents({ data }: expandedComponentsProps) {

    // State para guardar los datos de la víctima
    const [editGlobal, setEditGlobal] = useState(false)
    const [victimaDatos, setVictimaDatos] = useState<any>()
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);

    // Datos de la víctima
    const victimaDatosMostrar = [
        { nombre: "Nombre", valor: data.nombre },
        { nombre: "Apellido", valor: data.apellido },
        { nombre: "Edad", valor: data.edad },
        { nombre: "DNI", valor: data.DNI },
        { nombre: "Estado Civil", valor: data.estado_civil },
        { nombre: "Ocupación", valor: data.ocupacion },
        { nombre: "Vínculo con agresor", valor: data.vinculo_con_agresor },
        { nombre: "Condición de vulnerabilidad", valor: data.condicion_de_vulnerabilidad },
        { nombre: "Denuncias previas", valor: data.cantidad_de_denuncias_previas },
        { nombre: "Tiene hijos", valor: data?.hijos?.tiene_hijos ? "Sí" : "No" }
    ]
    // Mostrar datos de los hijos
    const hijosVictima = [
        { nombre: "Dependencia económica", valor: data?.hijos?.dependencia_economica },
        { nombre: "Mayores de edad", valor: data?.hijos?.mayores_de_edad },
        { nombre: "Menores de edad", valor: data?.hijos?.menores_de_edad },
        { nombre: "Menores discapacitados", valor: data?.hijos?.menores_discapacitados },
        { nombre: "Hijos con el agresor", valor: data?.hijos?.hijos_con_el_agresor }
    ]
    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    useEffect(() => {
        const fetchDenuncias = async (denunciaId:any) => {
            const result = await buscarDenunciasPorId(denunciaId);
            console.log(result);
            return result;
        }
    
        const fetchAllDenuncias = async () => {
            const denuncias = await Promise.all(data?.denuncias_realizadas?.map(fetchDenuncias) || []);
            // @ts-ignore
            setDenunciasAMostrar(denuncias);
        }
    
        fetchAllDenuncias();
    }, [])


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
                 //   eliminarDenuncia(data._id)
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
        {!editGlobal &&
            <>
                <h1 className='text-3xl my-5 font-sans	'>Datos de la víctima</h1>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={victimaDatosMostrar} />
                    {victimaDatos?.hijos?.tiene_hijos && <SimpleTableCheckorX campo="Datos de sus hijos" datos={hijosVictima} />}
                </div>
                <h1 className='text-3xl my-5 font-sans	'>Denuncias realizadas</h1>
                <div className='flex flex-col'>
                <DataTable
                        columns={columns}
                        data={denunciasAMostrar}
                        pagination
                        customStyles={customStyles}
                        responsive={true}
                        striped={true}
                        highlightOnHover={true}
                        noDataComponent="No hay denuncias para mostrar"
                        defaultSortFieldId={"Fecha"}
                        expandableIcon={expandableIcon}
                        expandableRows
                        expandableRowsComponent={expandedDenuncia}
                />
                </div>

                <div className='my-5 flex flex-col md:flex-row items-center justify-center w-full '>
                    <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                        <PencilSquareIcon className="w-7" />
                    </div>
                </div>
            </>
        }

    </div>

}

export default expandedComponents