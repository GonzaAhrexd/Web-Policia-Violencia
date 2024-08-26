/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /MisDenuncias 
    Recibe los datos de la víctima, victimario y hecho para mostrarlos en una tabla
    y en un mapa. Además, se puede editar la denuncia y eliminarla.
_____________________________________________________________________________________________
*/
// Componentes
import SimpleTableCheckorX from '../../components/ShowData/SimpleTableCheckorX';
import SelectRegisterSingle from '../../components/Select/SelectRegisterSingle';
// React hook form
import { useForm } from 'react-hook-form'

// Backend
import { cambiarRol } from '../../api/CRUD/usuarios.crud'

// Swal
import Swal from 'sweetalert2'

// Autenticación
import { useAuth } from '../../context/auth'


interface expandedComponentsProps {
    data: any
}
function expandedComponents({ data }: expandedComponentsProps) {

    const { user } = useAuth();


    const { setValue, handleSubmit, formState: {
        errors
    } } = useForm()

    // Mostrar datos de los hijos
    const usuarioDatosMostrar = [
        { nombre: "Nombre", valor: data?.nombre ? data.nombre : "No especificado" },
        { nombre: "Apellido", valor: data?.apellido ? data.apellido : "No especificado" },
        { nombre: "Nombre de usuario", valor: data?.nombre_de_usuario ? data.nombre_de_usuario : "No especificado" },
        { nombre: "Teléfono", valor: data?.telefono ? data.telefono : "No especificado" },
        { nombre: "Credencial", valor: data?.credencial ? data.credencial : "No especificado" },
        { nombre: "Unidad", valor: data?.unidad ? data.unidad : "No especificado" },
        { nombre: "Jerarquía", valor: data?.jerarquia ? data.jerarquia : "No especificado" },
        { nombre: "Plaza ", valor: data?.plaza ? data.plaza : "No especificado" },
        { nombre: "Zona ", valor: data?.zona ? data.zona : "No especificado" },
        { nombre: "Rol", valor: data?.rol ? data.rol : "No especificado" },
    ]

    const opcionesRoles = [
        { value: "admin", nombre: "Admin" },
        { value: "agente", nombre: "Agente" },
        { value: "carga", nombre: "Carga" },
        { value: "sin_definir", nombre: "Sin definir" }
    ]

    return <div className="flex flex-col p-2 sm:p-10 max-w-prose sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <h1 className='text-5xl my-5 font-sans'> Usuario {data.nombre_de_usuario} </h1>
        <h1 className='text-3xl my-5 font-sans'>Datos del usuario</h1>
        <div className='flex flex-col'>
            <SimpleTableCheckorX campo="" datos={usuarioDatosMostrar} />
        </div>
        <h1 className='text-3xl my-5 font-sans'>Asignar rol</h1>
        {user.id === data._id ? <h1 className='text-2xl my-5 font-sans'>No puedes cambiar tu propio rol</h1> :
            <>
                <form className='w-full flex flex-col justify-center items-center' action=""
                    onSubmit={handleSubmit(async (values) => {

                        Swal.fire({
                            title: '¿Está seguro de cambiar el rol?',
                            text: "Podrás volver a editarlo luego",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, cambiar rol',
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#d33',
                        }).then((result) => {
                            try {
                                if (result.isConfirmed) {
                                    values._id = data._id;
                                    cambiarRol(values);
                                    Swal.fire({
                                        title: '¡Denuncia enviada!',
                                        text: 'La denuncia ha sido cargada con éxito',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                        confirmButtonColor: '#0C4A6E',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            // Si se confirma, recargar la página
                                            window.location.reload();
                                        }
                                    });
                                }
                            } catch (error) {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Hubo un error al subir la denuncia',
                                    icon: 'error',
                                    confirmButtonColor: '#0C4A6E',
                                });
                            }
                        });
                    })}
                >
                    <div className='flex flex-col items-center justify-center w-full md:w-5/10'>
                        <SelectRegisterSingle nombre="rol" campo="Rol" opciones={opcionesRoles} setValue={setValue} error={errors.roles} />
                        <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>Cambiar rol</button>
                    </div>
                </form>
            </>

        }
    </div >

}

export default expandedComponents