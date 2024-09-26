// Hooks
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
// Componentes
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer/Footer';
import CardDataUsuario from '../../components/Cards/CardDataUsuario';
import CardUserDenunciasRecientes from '../../components/Cards/CardUserDenunciasRecientes';
import CardEditDataUser from '../../components/Cards/CardEditDataUser';
// Datatable
import DataTable from 'react-data-table-component';
// Iconos
import { PencilIcon } from '@heroicons/react/24/outline' // Asegúrate de tener instalado Heroicons
// Backend
import { editUserImg } from '../../api/auth';
// Configuraciones
import { customStyles } from '../../GlobalConst/customStyles'
import { columns } from './columnsDataTable'
// Backend 
import { obtenerMiActividad } from '../../api/CRUD/actividadReciente.crud';

const APIURL = import.meta.env.VITE_BASE_URL;

function Index() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [userImage, setUserImage] = useState('/user.png');
  const [listaActividad, setListaActividad] = useState([]);

  const handleImageClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    editUserImg(user.id, file);
    window.location.reload();
  };

  useEffect(() => {
    const fetchUserImage = async () => {
      if (user && user.id) {
        try {
          const imagePath = `${APIURL}/users/${user.id}/image`
          setUserImage(imagePath);
        } catch (error) {
          console.error("Error al cargar la imagen del usuario", error);
        }
      }
    };
    const fetchActividad = async () => {
      const actividades = await obtenerMiActividad(user?.id);
      setListaActividad(actividades);
    }
    fetchActividad();
    fetchUserImage();
  }, [user]);

  if (isLoading) return <h1>Cargando...</h1>;
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <NavBar user={user} />
      <div className="max-w-full h-full mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-center mt-10">
          <form encType="multipart/form-data">
            <div
              className="relative w-32 h-32 bg-gray-300 rounded-full overflow-hidden cursor-pointer group"
              onClick={handleImageClick}
            >
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={user.imagen != "sin_definir" ? userImage : "/user.png"}
                alt="Imagen de perfil"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PencilIcon className="h-10 w-10 text-white" />
              </div>
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
              {user.rol !== 'sin_definir' ?
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
        <div className='w-full'>
          <div className='h-screen sm:h-full p-2 sm:p-10'>
            <h2 className='text-2xl my-5'>Mi Actividad reciente</h2>
            {listaActividad?.length > 0 &&
              <DataTable
                columns={columns}
                data={listaActividad}
                pagination
                customStyles={customStyles}
                responsive={true}
                striped={true}
                highlightOnHover={true}
                noDataComponent="No hay denuncias para mostrar"
                defaultSortFieldId={"fecha"}
                defaultSortAsc={false}
              />
            }
          </div>
        </div>

      <Footer/>
      </div>
    </>
  );
}

export default Index;
