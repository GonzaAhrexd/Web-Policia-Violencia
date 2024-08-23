// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Contexto
import { useAuth } from '../../context/auth';
// Dependencias
import { Navigate } from 'react-router-dom';
// Componentes
import NavBar from '../../components/NavBar'
import InputRegister from '../../components/InputComponents/InputRegister';
import SelectRegister from '../../components/Select/SelectRegister';

// Backend
import { buscarUsuario } from '../../api/crud';
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
                            const usuarios = await buscarUsuario(values)
                            setListaDeUsuarios(usuarios)
                        }
                        )}>

                    <InputRegister nombre="nombre_de_usuario" type="text" campo="Nombre de usuario" error={errors.nombre_de_usuario} register={register} setValue={setValue}  />
                    <InputRegister nombre="nombre" type="text" campo="Nombre" error={errors.nombre} register={register} setValue={setValue}  />
                    <InputRegister nombre="apellido" type="text" campo="Apellido" error={errors.apellido} register={register} setValue={setValue}  />
                    <SelectRegister nombre="rol" campo="Rol" error={errors.rol} register={register} setValue={setValue} opciones={opcionesRoles} type="text" />
                    <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
                </form>
                        {listaDeUsuarios.length > 0 && <div className="w-full md:w-3/4 mx-auto mt-5">Encontrado</div>}
            </div>

        </>

    )
}

export default index