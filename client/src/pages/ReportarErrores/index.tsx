/*
 Exclusivo para toda la fase de pruebas
*/
// Hooks
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
// Componentes
import NavBar from '../../components/NavBar';
import InputTextArea from '../../components/InputComponents/InputTextArea';
import Swal from 'sweetalert2';

import { useForm } from 'react-hook-form';
import SelectRegister from '../../components/Select/SelectRegister';

import { reportarErrores } from '../../api/crud';

function CargarDenuncias() {

    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    const apartado = [
        { nombre: "Register", valor: "Register" },
        { nombre: "Login", valor: "Login" },
        { nombre: "Home", valor: "Home" },
        { nombre: "Buscar", valor: "Buscar" },
        { nombre: "Cargar Denuncias", valor: "Cargar Denuncias" },
        { nombre: "Verificar Denuncias", valor: "Verificar Denuncias" },
        { nombre: "Perfil", valor: "Perfil" },
        { nombre: "Mis denuncias", valor: "Mis denuncias"}
    ]
   // Obtener datos del usuario
  const { user, isAuthenticated, isLoading } = useAuth();
  // Si está cargando, mostrar "Cargando..."
  if (isLoading) return <h1>Cargando...</h1>
  // Si no está autenticado, redirigir a la página de login
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />


  
  return (
    <>
      <NavBar user={user} />
      <div>
      </div>
      <div className='h-screen sm:h-full p-2 sm:p-10'>
      <h2 className='text-3xl my-5'>Reportar errores o dar recomendaciones</h2>
        <div className='flex flex-col w-100'>
            <ul>
                <li className='text-2xl'>Específicar el apartado de la página donde ocurrió el error o que se quiere realizar una recomendación</li>
                <li className='text-2xl'>Describir el error o la recomendación</li>
                <li className='text-2xl'>Si se trata de un error, ser lo más detallado posible de cómo ocurrió</li>
            </ul>

        </div>
        <div className='flex justify-center'>
            <div className='w-full sm:w-1/2'>
            <form onSubmit={
          handleSubmit(async (values) => {
            // Mostrar una alerta de confirmación antes de cargar la denuncia
            Swal.fire({
              title: '¿Estás seguro?',
              text: "Trata de dar tantos detalles como sean posibles.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0C4A6E',
              cancelButtonColor: '#FF554C',
              confirmButtonText: 'Sí, enviar',
              cancelButtonText: 'Cancelar'
            }).then(async (result) => {
              // Si se confirma la carga de la denuncia, comienza la carga al backend
              if (result.isConfirmed) {
                // Crear la víctima y retornar el id
                try {
                  // Crear la denuncia
                    await reportarErrores(values);
                  Swal.fire({
                    title: 'Reporte enviado!',
                    text: 'El reporte ha sido enviado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0C4A6E',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Si se confirma, recargar la página
                      window.location.reload();
                    }
                  });
                } catch (error) {
                  Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al subir la denuncia',
                    icon: 'error',
                    confirmButtonColor: '#0C4A6E',
                  });
                }
              }
            });
          })
        }>
            <SelectRegister campo="Apartado" nombre="apartado" opciones={apartado} register={register} setValue={setValue} type="text" error={errors.apartado}/>
            <InputTextArea variante="edit" register={register} campo="Descripción" nombre="descripcion" type="textarea"/>
            <div className="flex justify-center my-3">
            <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-6/10' type="submit">Enviar</button>
          </div>
           </form>
            </div>

        </div>

</div>
    </>
  );
}


export default CargarDenuncias