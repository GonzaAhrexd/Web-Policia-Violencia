// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// Dependencias
import DataTable from 'react-data-table-component';
import { customStyles } from '../../../GlobalConst/customStyles';
// Componentes
import  columnsUnidades  from '../columnsTablaUnidades';
import ExpandedComponentsComisarias from './expandedComponentComisarias';
import ExpandedComponentsCuadriculas from './expandedComponentsCuadriculas';
import InputRegister from '../../InputComponents/InputRegister';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// Dependencias
import Swal from 'sweetalert2';

import { editarMunicipio, agregarComisaria, eliminarMunicipio, agregarCuadriculaDesdeMunicipio } from '../../../api/CRUD/unidades.crud';

type expandedComponentsUnidadesProps = {
    data: any
}

function expandedComponentsUnidades({ data }: expandedComponentsUnidadesProps) {

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showAddComisaria, setShowAddComisaria] = useState(false)
    const [showAddCuadricula, setShowAddCuadricula] = useState(false)

    const ExpandedRowComponent = ({data : row}: any) => (
        // @ts-ignore
        <ExpandedComponentsComisarias
            municipio={data.nombre}
            data={row} 
        />
    );  

    const ExpandedRowCuadricula = ({data : row}: any) => (
        // @ts-ignore
        <ExpandedComponentsCuadriculas
            municipio={data.nombre}
            data={row} 
            comisaria="comisaria"
            tipo="municipio"
        />
    );

    const handleDelete = (nombre: string) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar el municipio?',
            icon: 'warning',
            text: "Esta acción NO se puede deshacer",
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminarMunicipio(nombre)
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El municipio ha sido eliminado correctamente',
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

    if (data.subdivisiones) {
        return (
            <div className='p-4 border-solid border-4 border-gray-600'>
                  <h1 className='text-4xl'>Municipio</h1>
                { (!showAddComisaria && !showAddCuadricula) && 
                <>
                <h2 className='text-2xl'>Editar datos del municipio</h2>
                
                <form  className='w-full flex flex-col items-start md:items-center justify-start md:justify-center'
                    onSubmit={handleSubmit((values) => {
                        console.log(values)
                        Swal.fire({
                            title: '¿Estás seguro de editar el municipio?',
                            icon: 'warning',
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, editar',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                values.nombre_original = data.nombre
                                await editarMunicipio(values)
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
                    <InputRegister campo="Nombre" nombre="nombre_municipio" register={register} type="text" error={errors.nombre} valor={data.nombre} setValue={setValue}/>
                    <InputRegister campo="Valor" nombre="valor_municipio" register={register} type="text" error={errors.valor} valor={data.value} setValue={setValue}/>
                    <div className='flex items-center justify-center w-1/2'>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2'>
                        Editar Municipio
                    </button>
                    <div className='flex items-center justify-center bg-sky-950 hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2' 
                    onClick={() => { handleDelete(data.nombre) }}>
                        Eliminar municipio
                    </div>
                    </div>
                </form>
                </>
                }
                <h1 className='text-2xl'>Agregar subdivisiones</h1>
                <div className='flex flex-col justify-center items-center'>
                    { !showAddCuadricula &&
                        <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 rounded w-full md:w-3/10' onClick={() => setShowAddComisaria(!showAddComisaria)}>
                    {!showAddComisaria ? "Agregar Comisaría" : "Cancelar"}
                </button>
                    }
                { !showAddComisaria && 
                <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 rounded w-full md:w-3/10 mt-2' onClick={() => { setShowAddCuadricula(!showAddCuadricula) }}>
                        {!showAddCuadricula ? "Agregar cuadrícula " : "Cancelar"}
                </button>
                }
                    </div>
                {showAddComisaria && 
                <>
                <h1 className='text-4xl'>Comisarías</h1>
                <h2 className='text-2xl'>Agregar una nueva comisaría</h2>
                <form className='w-full flex flex-col items-center justify-center m-4'
                    onSubmit={handleSubmit((values) => {
                        Swal.fire({
                            title: '¿Estás seguro de agregar la comisaría?',
                            icon: 'warning',
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, agregar',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                values.nombre_municipio = data.nombre
                                await agregarComisaria(values)
                                Swal.fire({
                                    title: '¡Agregada!',
                                    text: 'La comisaría ha sido agregada correctamente',
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
                    <InputRegister campo="Nombre" nombre="nombre_comisaria" register={register} type="text" error={errors.nombre_comisaria} />
                    <InputRegister campo="Valor" nombre="valor_comisaria" register={register} type="text" error={errors.valor_comisaria} />
                    <InputRegister campo="Prefijo" nombre="prefijo_comisaria" register={register} type="text" error={errors.prefijo_comisaria} />
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 rounded w-full md:w-3/10'>
                        Agregar Comisaría
                    </button>
                </form>
                    </>
                }
                {showAddCuadricula &&
                <>
                <h1 className='text-4xl'>Cuadrículas</h1>
                <h2 className='text-2xl'>Agregar una nueva cuadrícula</h2>
                <form className='w-full flex flex-col items-center justify-center m-4' onSubmit={handleSubmit((values) => { 
                    Swal.fire({
                        title: '¿Estás seguro de agregar la cuadrícula?',
                        icon: 'warning',
                        confirmButtonColor: '#0C4A6E',
                        cancelButtonColor: '#FF554C',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, agregar',
                        cancelButtonText: 'Cancelar'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            values.nombre_municipio = data.nombre
                            await agregarCuadriculaDesdeMunicipio(values)
                            Swal.fire({
                                title: '¡Agregada!',
                                text: 'La cuadrícula ha sido agregada correctamente',
                                icon: 'success',
                                confirmButtonColor: '#0C4A6E',
                                cancelButtonColor: '#FF554C',
                            }
                            ).then(() => {
                                window.location.reload()
                            })
                        }
                    })

         
                    
                 
                })}
                >
                    <InputRegister campo="Nombre" nombre="nombre_cuadricula" register={register} type="text" error={errors.nombre_cuadricula} />
                    <InputRegister campo="Valor" nombre="valor_cuadricula" register={register} type="text" error={errors.valor_cuadricula} />
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 rounded w-full md:w-3/10'>
                        Agregar Cuadrícula
                    </button>
                </form>

                </>
                }

                
                {data.subdivisiones.length != 0 && 
                <>
                <h2 className='text-2xl'>Lista de comisarías</h2>
                    <DataTable
                        columns={columnsUnidades}
                        data={data.subdivisiones}
                        pagination
                        expandableRows
                        expandableRowsComponent={ExpandedRowComponent}
                        customStyles={customStyles}
                        responsive={true}
                        striped={true}
                        highlightOnHover={true}
                        noDataComponent="No hay denuncias para mostrar"
                        defaultSortFieldId={"Fecha"}
                        expandableIcon={expandableIcon}
                    />
                </>
                }
                {data.cuadriculas.length != 0 && 
                <>
                <h2 className='text-2xl'>Lista de Cuadrículas</h2>
                    <DataTable
                    columns={columnsUnidades}
                    data={data.cuadriculas}
                    pagination
                    expandableRows
                    expandableRowsComponent={ExpandedRowCuadricula}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay denuncias para mostrar"
                    defaultSortFieldId={"Fecha"}
                    expandableIcon={expandableIcon}
                        />
                    </>
                    }
                
            </div>
        )
                }

    
}

export default expandedComponentsUnidades