
// Dependencias
import DataTable from 'react-data-table-component';
import { customStyles } from '../../GlobalConst/customStyles';
import Swal from 'sweetalert2';
// Componentes
import columnsUnidades  from './columnsTablaUnidades';
import InputRegister from '../InputComponents/InputRegister';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import expandedComponentsMunicipios from './Comisarias/expandedComponentMunicipios';
// Hooks
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// Backend 
import { editarUnidad } from '../../api/CRUD/unidades.crud';


type expandedComponentsUnidadesProps = {
    data: any;
}

function expandedComponentsUnidades({ data }: expandedComponentsUnidadesProps) {

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        console.log(data)
    }, [data])

    if (data.subdivisiones.length > 0) {
        return (
            <div className='p-4'>
                <h1 className='text-4xl'>Unidad</h1>
                <h2 className='text-2xl'>Editar datos de la unidad</h2>
                <form  className='w-full flex flex-col items-start md:items-center justify-start md:justify-center m-4'
                    onSubmit={handleSubmit((values) => {
                        console.log(values)
                        Swal.fire({
                            title: '¿Estás seguro de editar la unidad?',
                            icon: 'warning',
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, editar',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                values.id = data._id
                                await editarUnidad(values)
                                Swal.fire({
                                    title: '¡Editado!',
                                    text: 'La unidad ha sido editada correctamente',
                                    icon: 'success',
                                    confirmButtonColor: '#0C4A6E',
                                    cancelButtonColor: '#FF554C',
                                }
                                ).then(() => {
                                    window.location.reload()
                                })
                            }
                        })


                    }
                    )}
                >
                    <InputRegister campo="Nombre" nombre="nombre_unidad" register={register} type="text" error={errors.nombre} valor={data.nombre} setValue={setValue}/>
                    <InputRegister campo="Valor" nombre="valor_unidad" register={register} type="text" error={errors.valor} valor={data.value} setValue={setValue}/>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2'>
                        Editar Unidad
                    </button>
                </form>

                <h1 className='text-4xl'>Municipios</h1>
                <h2 className='text-2xl'>Agregar un nuevo municipio</h2>

                {/* <form className='w-full flex flex-col items-start md:items-center justify-start md:justify-center m-4'
                    onSubmit={handleSubmit((data) => {
                        console.log(data)
                    }
                    )}
                >
                    <InputRegister campo="Nombre" nombre="nombre_municipio" register={register} type="text" error={errors.nombre} />
                    <InputRegister campo="Valor" nombre="valor_municipio" register={register} type="text" error={errors.valor} />
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2'>
                        Agregar Municipio
                    </button>
                </form> */}
                <h2 className='text-2xl'>Lista de municipios</h2>
                <DataTable
                    columns={columnsUnidades}
                    data={data.subdivisiones}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponentsMunicipios}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay denuncias para mostrar"
                    defaultSortFieldId={"Fecha"}
                    expandableIcon={expandableIcon}
                />
            </div>
        )
    }
}

export default expandedComponentsUnidades