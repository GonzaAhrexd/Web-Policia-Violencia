import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useState } from 'react';
function CargarDenuncias() {
  //@ts-ignore
  const { signUp, user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>Cargando...</h1>
  console.log(user.rol)
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

  const [isEditing, setIsEditing] = useState(false)

  if (user.rol === 'carga' || user.rol === 'admin' ) {
    return (
      <>
        <NavBar user={user} />
        <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
        <div>
        <h1>Victima</h1>
        <h1>Victimario</h1>
        <h1>Detalles</h1>
        </div>
        </div>
      </>
    );
  } else {
    return (
      <Navigate to="/" replace />
    );
  }
}

export default CargarDenuncias