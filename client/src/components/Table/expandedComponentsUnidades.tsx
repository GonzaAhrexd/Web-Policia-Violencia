
// Dependencias
import DataTable from 'react-data-table-component';
import { customStyles } from '../../GlobalConst/customStyles';
// Componentes
import { columnsUnidades } from './columnsTablaUnidades';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import expandedComponentsCuadriculas from './expandedComponentsCuadriculas';


type expandedComponentsUnidadesProps = {
    data: any
}

function expandedComponentsUnidades({ data }: expandedComponentsUnidadesProps) {

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    // Función para detectar si el inicio de la cadena dice Comisaría
    /*const isComisaria = () => {

        return false
    } */


    console.log(data.subdivisiones)
    if (data.subdivisiones) {
        return (
            <div className='p-4'>
                <h1 className='text-4xl'>Municipios</h1>
                <DataTable
                    columns={columnsUnidades}
                    data={data.subdivisiones}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponentsUnidades}
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
    }else if(data.cuadriculas){
        return (
            <div className='p-4'>
                <h1 className='text-4xl'>Cuadriculas</h1>
                <DataTable
                    columns={columnsUnidades}
                    data={data.cuadriculas}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponentsCuadriculas}
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