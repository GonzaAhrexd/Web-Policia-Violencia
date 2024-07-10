/*
 [ /perfil ] 
  Descipción: Perfil del usuario, donde se muestra la información del usuario y sus denuncias recientes.
*/
// Hooks
import { useState } from 'react';
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
// Componentes
import NavBar from '../../components/NavBar'
import CardDataUsuario from '../../components/Cards/CardDataUsuario';
import CardUserDenunciasRecientes from '../../components/Cards/CardUserDenunciasRecientes';
import CardEditDataUser from '../../components/Cards/CardEditDataUser';
function index() {

  const { user, isAuthenticated, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false)
  // Validación si está logeado
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

  return (
    <>
      <NavBar user={user} />
      <div className="max-w-full h-full xl:h-screen mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-center mt-10">
          <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
            <img className="h-32 w-32 rounded-full"
              src={user.imagen ? user.imagen : "/user.png"} alt="" />
          </div>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-4xl font-semibold">{user.nombre} {user.apellido}</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly mt-10 p-14">
          {!isEditing ?
            <>
              {user.rol != 'sin_definir' ?
                <>
                  <CardDataUsuario datosUsuario={user} setIsEditing={setIsEditing} />
                  <CardUserDenunciasRecientes user={user} />
                </>
                :
                <CardDataUsuario datosUsuario={user} setIsEditing={setIsEditing} />
              }
            </>
            :
            <CardEditDataUser user={user} setIsEditing={setIsEditing} />
          }
        </div>
      </div>
    </>

  )
}

export default index