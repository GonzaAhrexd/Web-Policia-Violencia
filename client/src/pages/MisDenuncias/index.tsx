/*

   [ /mis-denuncias ] 
   Descripción: Página de mis denuncias para que el usuario pueda ver las denuncias que ha realizado
*/

// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
// APIs del BackEnd
import { misDenuncias } from '../../api/crud';
// Librerías react
import DataTable from 'react-data-table-component';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// Componentes
import NavBar from '../../components/NavBar';
import InputCheckbox from '../../components/InputComponents/InputCheckbox';
import InputRegister from '../../components/InputComponents/InputRegister';
import InputDateRange from '../../components/InputComponents/InputDateRange';
// Dependencias de la misma carpeta
import { columnsDenuncia } from '../../components/Busqueda/BuscarDenuncias/columnsDataTableDenuncias'
import expandedComponents from '../../components/Busqueda/BuscarDenuncias/expandedComponents' // Busca de otro lado para mantener consistencia
import { customStyles } from '../../components/Busqueda/BuscarDenuncias/dataTableStyles'
// Página alternativa para el rol agente
import MisDenunciasAgente from '../MisDenunciasAgente'

function MisDenuncias() {
    // Estados
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);

    // Se realiza la búsqueda de las denuncias con los datos ingresados
    const handleBusqueda = async (values: any) => {
        // Se obtienen las denuncias con una función asíncrona
        const fetchDenuncias = async () => {
            const result = await misDenuncias(values);
            setDenunciasAMostrar(result)
        }
        // Se ejecuta la función asíncrona
        fetchDenuncias();
    }

    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }
    // Se obtiene el usuario y se verifica si está autenticado
    const { user, isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <h1>Cargando...</h1>
    if (!isLoading && !isAuthenticated && user.rol == "sin_definir") return <Navigate to="/login" replace />
    
    return (
        <div>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Mis denuncias</h1>
                <h2 className='text-2xl my-5'>Buscar</h2>
                {user.rol === 'agente' ? <MisDenunciasAgente /> :
                    <>
                        <form className="w-full flex flex-col items-center"
                            onSubmit={
                                handleSubmit(async (values) => {
                                    handleBusqueda(values)
                                })}>
                            <InputDateRange register={register} setValue={setValue} isRequired={false} />
                            <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                            <InputCheckbox campo="Falta rellenar el expediente" nombre="is_expediente_completo" register={register} error={errors.is_expediente_completo} id="is_expediente_completo" type="checkbox" setValue={setValue}></InputCheckbox>
                            <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-3/10"> Buscar</button>
                        </form>
                        <div className="flex flex-col w-full">
                            <h2 className='text-2xl my-5'>Denuncias</h2>
                            <DataTable
                                columns={columnsDenuncia}
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
                }
            </div>
        </div>
    )
}

export default MisDenuncias