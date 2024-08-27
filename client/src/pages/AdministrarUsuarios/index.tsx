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
import InputRegister from '../../components/InputComponents/InputRegister';
import SelectRegisterSingle from '../../components/Select/SelectRegisterSingle';

// Backend
import { buscarUsuario } from '../../api/CRUD/usuarios.crud';

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

// Dependencias de la misma carpeta
import { columns } from './columnsDataTable'
import expandedComponents from './expandedComponents'
import { customStyles } from '../../GlobalConst/customStyles'

function index() {
    const { user, isAuthenticated, isLoading } = useAuth();
    // Formulario
    const { register, setValue, handleSubmit, formState: {
        errors
    } } = useForm()

    const [listaDeUsuarios, setListaDeUsuarios] = useState([])

    const opcionesRoles = [
        { value: "admin", nombre: "Admin" },
        { value: "agente", nombre: "Agente" },
        { value: "carga", nombre: "Carga" },
        { value: "sin_definir", nombre: "Sin definir" }
    ]

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    if (isLoading) return <h1>Cargando...</h1>
    // Si no esta autenticado, redirige a login
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    // Si el usuario no tiene rol, redirige a login
    if (user?.rol !== "admin") return <Navigate to="/login" replace />

    return (
        <>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Administrar usuarios</h1>
                <form className="w-full flex flex-col items-center"
                    onSubmit={
                        handleSubmit(async (values) => {
                            console.log(values)
                            const usuarios = await buscarUsuario(values)
                            setListaDeUsuarios(usuarios)
                        }
                        )}>

                    <InputRegister busqueda require={false} nombre="nombre_de_usuario" type="text" campo="Nombre de usuario" error={errors.nombre_de_usuario} register={register} setValue={setValue} />
                    <InputRegister busqueda require={false} nombre="nombre" type="text" campo="Nombre" error={errors.nombre} register={register} setValue={setValue} />
                    <InputRegister busqueda require={false} nombre="apellido" type="text" campo="Apellido" error={errors.apellido} register={register} setValue={setValue} />
                    {/* <SelectRegister isRequired={false} nombre="rol" campo="Rol" error={errors.rol} register={register} setValue={setValue} opciones={opcionesRoles} type="text" /> */}
                    <SelectRegisterSingle isRequired={false} nombre="rol" campo="Rol" opciones={opcionesRoles} setValue={setValue} error={errors.rol} />
                    <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
                </form>
                {listaDeUsuarios?.length > 0 &&
                    <div className="flex flex-col w-full">
                        <h2 className='text-2xl my-5'>Usuarios</h2>
                        <DataTable
                            columns={columns}
                            data={ listaDeUsuarios }
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
                    </div>}
            </div>

        </>

    )
}

export default index