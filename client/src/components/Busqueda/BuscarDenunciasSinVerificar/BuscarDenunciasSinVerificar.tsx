// Componentes
import InputRegister from '../../InputComponents/InputRegister';
import SelectDivisionMunicipios from '../../Select/SelectDivisionMunicipios';
import InputDateRange from '../../InputComponents/InputDateRange';

// Backend APIs
import { buscarDenunciasSinVerificar } from '../../../api/CRUD/denunciasSinVerificar.crud';
// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';
import expandedComponents from '../../../pages/MisDenunciasAgente/expandedComponents';
import { customStyles } from '../../../GlobalConst/customStyles'
import { useAuth } from '../../../context/auth';

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

// Campos
import { useCampos } from '../../../context/campos';
import { columnsDataTableVerificar} from './columnsDataTableVerificar'

function BuscarDenunciasSinVerificar() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const { register, handleSubmit, setValue, watch, formState: {
        errors
    } } = useForm()
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenunciasSinVerificar(values);
            setDenunciasAMostrar(result)
        }
        fetchDenuncias();

    }
    // Obtén el valor actual del número de expediente del formulario
    const expedienteValue = watch('numero_de_expediente');
    const idValue = watch("id_denuncia");
    // Comprueba si el número de expediente está vacío o no
    const isDateRangeRequired = !expedienteValue && !idValue;
    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    const { unidades: unidadCampos  } = useCampos();
    const { user } = useAuth()


    return (
        <>
            <form className="w-full flex flex-col items-center"
                onSubmit={
                    handleSubmit(async (values) => {
                        // Separa la unidad en division, municipio y comisaria siempre que tenga una , para separar, sino no
                        if (values.unidad && user.rol != "agente") {
                            values.unidad = values.unidad.split(',')
                            values.municipio = values.unidad[1]
                            values.comisaria = values.unidad[2]
                        }else if (user.rol == "agente") {
                            values.division = user.unidad
                        }
                        handleBusqueda(values)
                    }
                    )}>
                <InputDateRange register={register} setValue={setValue} isRequired={isDateRangeRequired} />
                <InputRegister busqueda={true} campo="ID" nombre="id_denuncia" register={register} type="text" error={errors.id_denuncia} require={false} />
                <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                {user.rol != "agente" &&
                <div className='flex flex-col xl:flex-row w-full items-center justify-center'>
                    <SelectDivisionMunicipios isRequired={false} campo="División, Municipio y Comisaría" nombre="division" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.division} />
                </div>
                }
                <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
            </form>
            <div className="flex flex-col w-full">
                <h2 className='text-2xl my-5'>Denuncias</h2>
                <div className="overflow-x-auto">
                <DataTable
                    columns={columnsDataTableVerificar}
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
                    defaultSortAsc={false}
                    expandableIcon={expandableIcon}
                    />
                    </div>
            </div>
        </>
    )
}

export default BuscarDenunciasSinVerificar