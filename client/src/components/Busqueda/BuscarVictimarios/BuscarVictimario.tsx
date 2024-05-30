import React from 'react'
// Componentes
import InputDate from '../../InputComponents/InputDate';
import InputRegister from '../../InputComponents/InputRegister';
import InputCheckbox from '../../InputComponents/InputCheckbox';
import SelectRegister from '../../Select/SelectRegister';
import SelectDivisionMunicipios from '../../Select/SelectDivisionMunicipios';
// Backend APIs
import { buscarDenuncias } from '../../../api/crud';
// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';

import { columns } from './columnsDataTable'
import expandedComponents from './expandedComponents'
import { customStyles } from './dataTableStyles'

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

// Campos
import { unidadCampos } from '../../../GlobalConst/unidadCampos';
import { getRandomValues } from 'crypto';
function BuscarVictimario() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenuncias(values);
            setDenunciasAMostrar(result)
            console.log(result)
        }
        fetchDenuncias();
    }

    
    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    

    return (
        <>
            <form className="w-full flex flex-col items-center"
                onSubmit={
                    handleSubmit(async (values) => {

                        handleBusqueda(values)
                    }

                    )}>
           
                 <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10"> Buscar</button>        
            </form>
            
            <div className="flex flex-col w-full">
                    <h2 className='text-2xl my-5'>Víctima</h2>
                    <DataTable
                        columns={columns}
                        data={denunciasAMostrar}
                        pagination
                        expandableRows
                        expandableRowsComponent={expandedComponents}
                        customStyles={customStyles}
                        responsive={true}
                        striped={true}
                        highlightOnHover={true}
                        noDataComponent="No hay denuncias para mostrar"
                        defaultSortFieldId={"Fecha"}
                        expandableIcon={expandableIcon}
                    />
                </div>
            

        </>
    )
}

export default BuscarVictimario