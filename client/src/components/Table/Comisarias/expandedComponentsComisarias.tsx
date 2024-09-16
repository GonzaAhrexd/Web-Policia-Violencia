
// Dependencias
import DataTable from 'react-data-table-component';
import { customStyles } from '../../../GlobalConst/customStyles';
// Componentes
import { columnsUnidades } from '../columnsTablaUnidades';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import expandedComponentsComisarias from '../Comisarias/expandedComponentsComisarias';

import { useForm } from 'react-hook-form';
import InputRegister from '../../InputComponents/InputRegister';


type expandedComponentsUnidadesProps = {
    data: any
}

function expandedComponentsUnidades({ data }: expandedComponentsUnidadesProps) {

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log(data.subdivisiones)
    if (data.subdivisiones) {
        return (
            <div className='p-4'>
                <h1 className='text-4xl'>Comisarías</h1>
                <h2 className='text-2xl'>Agregar una nueva comisaría</h2>

                <form action="" className='w-full flex flex-col items-center justify-center m-4' 
                    onSubmit={handleSubmit((data) => {
                        console.log(data)
                    }
                    )}
                    >
                    <InputRegister campo="Nombre" nombre="nombre"  register={register}  type="text" error={errors.nombre}/>
                    <InputRegister campo="Valor" nombre="valor"  register={register}  type="text" error={errors.valor}/>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10 mr-2'>
                        Agregar Comisaría
                    </button>
                </form>
                    <h2 className='text-2xl'>Lista de comisarías</h2>

                <DataTable
                    columns={columnsUnidades}
                    data={data.subdivisiones}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponentsComisarias}
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