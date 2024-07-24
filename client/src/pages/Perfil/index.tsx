/*
 [ /perfil ] 
  Descipción: Perfil del usuario, donde se muestra la información del usuario y sus denuncias recientes.
*/
// Hooks
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
// Componentes
import NavBar from '../../components/NavBar'
import CardDataUsuario from '../../components/Cards/CardDataUsuario';
import CardUserDenunciasRecientes from '../../components/Cards/CardUserDenunciasRecientes';
import CardEditDataUser from '../../components/Cards/CardEditDataUser';
import { editUserImg, getUserImage } from '../../api/auth';
const APIURL = import.meta.env.VITE_BASE_URL

function index() {
  // Autenticación
  const { user, isAuthenticated, isLoading } = useAuth();
  // Estados
  const [isEditing, setIsEditing] = useState(false)

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    // Aquí puedes subir la imagen al servidor o actualizar el estado
    // Por ejemplo, usando FormData y enviándolo a una API
    editUserImg(user.id, file)
    window.location.reload()
  };

  const [userImage, setUserImage] = useState('/user.png'); // URL de imagen predeterminada

  useEffect(() => {
    const fetchUserImage = async () => {
      if (user && user.id) {
        try {
          const response = await getUserImage(user.id);
          // Obtener la misma ruta a la que se está consultando en getUserImage
          const imagePath = `${APIURL}/users/${user.id}/image`;
          setUserImage(imagePath);
        } catch (error) {
          console.error("Error al cargar la imagen del usuario", error);
          // Manejar el error adecuadamente
        }
      }
    };

    fetchUserImage();
  }, [user]); // Dependencia: el objeto user




  // Validación si está logeado
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

  return (
    <>
      <NavBar user={user} />
      <div className="max-w-full h-full xl:h-screen mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-center mt-10">
      <form encType="multipart/form-data">

        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
          <img
            className="h-32 w-32 rounded-full cursor-pointer"
            src={ userImage ? userImage : '/user.png'}
            alt=""
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
      </form>
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