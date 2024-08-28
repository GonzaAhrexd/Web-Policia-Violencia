// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Contexto
import { useAuth } from '../../context/auth';
// Librerías React
import { Navigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
// Componentes
import NavBar from '../../components/NavBar'
import SelectRegister from '../../components/Select/SelectRegisterSingle';
import InputDateRange from '../../components/InputComponents/InputDateRange';
// Backend
import { listarActividadesRecientes } from '../../api/CRUD/actividadReciente.crud';

// Dependencias de la misma carpeta
import { customStyles } from '../../GlobalConst/customStyles'
import { columns } from './columnsDataTable'

function index() {
    const { user, isAuthenticated, isLoading } = useAuth();
    // Formulario
    const { register, setValue, handleSubmit, formState: {
        errors
    } } = useForm()

    const [listaDeActividad, setListaDeActividad] = useState([])

    const listaDeSecciones = [
        { nombre: "Denuncias", value: "Denuncia" },
        { nombre: "Víctimas", value: "Víctima" },
        { nombre: "Victimario", value: "Victimario" },
        { nombre: "Exposiciones", value: "Exposición" },
        { nombre: "Inicio de sesión", value: "Inicios"},
        { nombre: "Registro de usuarios", value: "Registros" },
    ]   



    if (isLoading) return <h1>Cargando...</h1>
    // Si no esta autenticado, redirige a login
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    // Si el usuario no tiene rol, redirige a login
    if (user?.rol !== "admin") return <Navigate to="/login" replace />

    return (
        <>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Registro de actividad</h1>
                <form className="w-full flex flex-col items-center"
                    onSubmit={
                        handleSubmit(async (values) => {
                            console.log(values)
                            const usuarios = await listarActividadesRecientes(values)
                            setListaDeActividad(usuarios)
                        }
                        )}>
                    <InputDateRange  register={register} setValue={setValue} isRequired={true} />
                    <SelectRegister isRequired={false}  campo={"Sección"} nombre={"seccion"} opciones={listaDeSecciones} setValue={setValue} error={errors.seccion} />
                    <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
                </form>
                {listaDeActividad?.length > 0 &&
                    <div className="flex flex-col w-full">
                        <h2 className='text-2xl my-5'>Registro de Actividad</h2>
                        <DataTable
                            columns={columns}
                            data={ listaDeActividad }
                            pagination
                            customStyles={customStyles}
                            responsive={true}
                            striped={true}
                            highlightOnHover={true}
                            noDataComponent="No hay denuncias para mostrar"
                            defaultSortFieldId={"Fecha"}
                        />
                    </div>
                    }
            </div>

        </>

    )
}

export default index