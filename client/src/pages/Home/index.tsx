/*
  [/]
  Descripción: Este componente es la página de inicio de la aplicación,
  aquí se muestran los accesos directos a las diferentes 
  secciones de la aplicación.
*/

// Hooks
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
// Componentes
import NavBar from '../../components/NavBar';
import CardActions from '../../components/Cards/CardsActions';
import CardProfile from '../../components/Cards/CardProfile';
import CardDenunciasRecientes from '../../components/Cards/CardDenunciasRecientes';
import CardDenunciasPendientesValidacion from '../../components/Cards/CardDenunciasPendientesValidacion';
// Iconos
import { ExclamationTriangleIcon, UserIcon, MagnifyingGlassIcon, ListBulletIcon, PencilSquareIcon, ClipboardDocumentCheckIcon, ChartPieIcon, DocumentTextIcon, DocumentArrowDownIcon, UserPlusIcon, PresentationChartBarIcon, ArrowUpTrayIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'

function Home() {
  // Obtiene los datos del usuario y verifica si está autenticado desde el contexto
  const { user, isAuthenticated, isLoading } = useAuth();
  // Estados
  const [showAdminSection, setShowAdminSection] = useState<boolean>(false);

  // Validación de cargando y si está logeado
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />


  const seccionesAgente = [
    { mostrar: "Búsqueda", url: "/búsqueda", svg: MagnifyingGlassIcon },
    { mostrar: "Mis denuncias", url: "/mis-denuncias", svg: ListBulletIcon },
    { mostrar: "Cargar denuncias", url: "/cargar-denuncias", svg: PencilSquareIcon },
  ]

  const seccionesCarga = [
    { mostrar: "Verificar denuncias", url: "/verificar-denuncias", svg: ClipboardDocumentCheckIcon },
    { mostrar: "Estadísticas", url: "/estadisticas", svg: ChartPieIcon },
  ]
  const seccionesAdmin = [
    { mostrar: "Denuncias internas", url: "/denuncias-internas", svg: DocumentTextIcon },
    { mostrar: "Denuncias externas", url: "/denuncias-externas", svg: DocumentArrowDownIcon },
    { mostrar: "Administrar usuarios", url: "/administrar-usuarios", svg: UserPlusIcon },
    { mostrar: "Registro de Actividad", url: "/registro-de-actividad", svg: PresentationChartBarIcon },
    { mostrar: "Selectores de carga", url: "/selectores-de-carga", svg: ArrowUpTrayIcon },
    { mostrar: "Resumen", url: "/resumen", svg: ClipboardDocumentIcon },
  ]

  const isAdmin: boolean = user?.rol === 'admin';
  const isCarga: boolean = user?.rol === 'carga' || user?.rol === 'admin';
  const isAgente: boolean = user?.rol === 'agente' || user?.rol === 'admin' || user?.rol === 'carga';

  const saludosDependiendoLaHora = () => {
    const fecha: Date = new Date();
    const hora: number = fecha.getHours();
    if (hora >= 6 && hora < 12) {
      return 'Buenos días';
    } else if (hora >= 12 && hora <= 19) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }


  return (
    <>
      <NavBar user={user} />
      <div className='h-screen p-10'>
        <h1 className='text-4xl sm:text-7xl'>¡{saludosDependiendoLaHora()}, {user?.nombre}!</h1>

        {user?.rol === 'sin_definir' && (
          <div className='flex mt-10 text-xl'>
            <p>Aún se te está asignando el rol, regresa pronto.</p>
          </div>
        )}
        <div>
          <h2 className='text-3xl my-5'>Accesos directos</h2>
          <div className='grid gap-1 grid-cols-1 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 w-full '>
            <CardActions mostrar={"Mi perfil"} url={"/mi-perfil"} SVGIcon={UserIcon}/>
            <CardActions mostrar={"Sugerencia o error"} url={"/reportar-errores"} SVGIcon={ExclamationTriangleIcon} />
           
            {isAgente && seccionesAgente.map((seccion, index) => (
              <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} SVGIcon={seccion.svg} />
            ))}
            {isCarga && seccionesCarga.map((seccion, index) => (
              <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} SVGIcon={seccion.svg} />
            ))}

            {isAdmin &&
              <CardActions mostrar={"Mostrar sección admin"} showAdminSection={showAdminSection} setShowAdminSection={setShowAdminSection} url={""} svg={"M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"} />
            }
            {(isAdmin && showAdminSection) && seccionesAdmin.map((seccion, index) => (
              <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} SVGIcon={seccion.svg} />
            ))}
          </div>
        </div>

        {(user?.rol === 'admin' || user?.rol === 'carga') && (
          <div>
            <h2 className='text-3xl my-5 '>Resumen</h2>
            <div className='grid gap-1 grid-cols-1 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 w-full'>
              <CardProfile title="Mi cuenta" description="Mis datos" usuario={user} />
              <CardDenunciasRecientes title="Denuncias recientes" />
              <CardDenunciasPendientesValidacion />
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default Home;