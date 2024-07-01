/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /BuscarVictimas. 
    Recibe los datos de la víctima y sus denuncias, y muestra los datos de la víctima y las denuncias en una tabla.
_____________________________________________________________________________________________
*/
// Hooks
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
// APIs del BackEnd
import { buscarDenunciasPorId } from '../../../api/crud';
// Librerías react
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2' // Librería para mostrar popups
// Iconos
import { PencilSquareIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import { columnsDenuncia } from '../BuscarDenuncias/columnsDataTableDenuncias'
import { customStyles } from '../BuscarDenuncias/dataTableStyles'
import EditVictima from '../../../components/EditMode/EditVictima';
import { editarVictima } from '../../../api/crud';
// Importa expandedComponents con otro nombre
import expandedDenuncia from '../BuscarDenuncias/expandedComponents'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../../context/auth';
import ModoImprimir from './ModoImprimir';
interface expandedComponentsProps {
    data: any
}
function expandedComponents({ data }: expandedComponentsProps) {

    // State para guardar los datos de la víctima
    const [editGlobal, setEditGlobal] = useState(false)
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const [modoImprimir, setModoImprimir] = useState(false);

    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()
    // Datos de la víctima
    const victimaDatosMostrar = [
        { nombre: "Nombre", valor: data.nombre ? data.nombre : "No especificado"},
        { nombre: "Apellido", valor: data.apellido ? data.apellido : "No especificado"  },
        { nombre: "Dirección", valor: data.direccion ? data.direccion : "No especificado"  },
        { nombre: "Edad", valor: data.edad ? data.edad : "No especificado"  },
        { nombre: "DNI", valor: data.DNI ? data.DNI : "No especificado"  },
        { nombre: "Estado Civil", valor: data.estado_civil ? data.estado_civil : "No especificado"  },
        { nombre: "Ocupación", valor: data.ocupacion ? data.ocupacion : "No especificado"  },
        { nombre: "Vínculo con agresor", valor: data.vinculo_con_agresor ? data.vinculo_con_agresor : "No especificado"  },
        { nombre: "Condición de vulnerabilidad", valor: data.condicion_de_vulnerabilidad ? data.condicion_de_vulnerabilidad : "No especificado"  },
        { nombre: "Denuncias previas", valor: data.cantidad_de_denuncias_previas ? data.cantidad_de_denuncias_previas : "No especificado"},
        { nombre: "Tiene hijos", valor: data?.hijos?.tiene_hijos ? "Sí" : "No" }
    ]
    // Mostrar datos de los hijos
    const hijosVictima = [
        { nombre: "Dependencia económica", valor: data?.hijos?.dependencia_economica },
        { nombre: "Mayores de edad", valor: data?.hijos?.mayores_de_edad },
        { nombre: "Menores de edad", valor: data?.hijos?.menores_de_edad },
        { nombre: "Menores discapacitados", valor: data?.hijos?.menores_discapacitados },
    ]
    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }
 //@ts-ignore
 const { signUp, user, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        const fetchDenuncias = async (denunciaId: any) => {
            const result = await buscarDenunciasPorId(denunciaId);
            return result;
        }

        const fetchAllDenuncias = async () => {
            const denuncias = await Promise.all(data?.denuncias_realizadas?.map(fetchDenuncias) || []);
            // @ts-ignore
            setDenunciasAMostrar(denuncias);
        }

        fetchAllDenuncias();
    }, [])

    return <div className="flex flex-col p-2 sm:p-10 max-w-prose sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        {!editGlobal &&
            <>
                <h1 className='text-3xl my-5 font-sans	'>Datos de la víctima</h1>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={victimaDatosMostrar} />
                    {data?.hijos?.tiene_hijos && <SimpleTableCheckorX campo="Datos de sus hijos" datos={hijosVictima} />}
                </div>
                <h1 className='text-3xl my-5 font-sans	'>Denuncias realizadas</h1>
                <div className='flex flex-col'>
                    <DataTable
                        columns={columnsDenuncia}
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
                <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setModoImprimir(!modoImprimir)}>
                        <PrinterIcon className="w-7"/>
                    </div>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                        <PencilSquareIcon className="w-7" />
                    </div>
                </div>
            </>
        }
            {modoImprimir && 
            <div>
                <ModoImprimir modoImprimir={modoImprimir} setModoImprimir={setModoImprimir} denunciasAMostrar={denunciasAMostrar} user={user} data={data} />
            </div>
        }

        {editGlobal &&
            <div>
                <form
                    onSubmit={
                        handleSubmit(async (values) => {
                            // Llamamos a editar victima del backend
                            editarVictima(values)
                            // Llamamos a editar victimario del backend
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
                    <EditVictima datos={data} register={register} setValue={setValue} errors={errors} />

                    <div className='flex flex-col md:flex-row items-center justify-center w-full my-2'>
                        <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setEditGlobal(!editGlobal)}>
                            <XMarkIcon className="w-7" />
                        </div>
                        <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2 ' >
                            <CheckIcon className="w-7" />
                        </button>
                    </div>
                </form>
            </div>
        }

    </div>

}

export default expandedComponents