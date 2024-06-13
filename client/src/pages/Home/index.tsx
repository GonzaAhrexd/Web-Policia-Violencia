// Hooks
import { useState  } from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth }  from '../../context/auth';
// Componentes
import NavBar from '../../components/NavBar';
import CardActions from '../../components/Cards/CardsActions';
import CardProfile from '../../components/Cards/CardProfile';
import CardDenunciasRecientes from '../../components/Cards/CardDenunciasRecientes';
import CardDenunciasPendientesValidacion from '../../components/Cards/CardDenunciasPendientesValidacion';

// Iconos
import { ListBulletIcon, PencilSquareIcon, ChartPieIcon, InboxStackIcon, DocumentTextIcon, DocumentArrowDownIcon, UserPlusIcon, PresentationChartBarIcon, TableCellsIcon, ArrowUpTrayIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'

function Home() {
  const [showAdminSection, setShowAdminSection] = useState<boolean>(false);
  
  //@ts-ignore
  const { signUp, user, isAuthenticated, isLoading } = useAuth();

  if(isLoading) return <h1>Cargando...</h1>
  
  if(!isLoading && !isAuthenticated) return <Navigate to="/login" replace/>
  

  const seccionesAgente = [
  { mostrar: "Búsqueda", url: "/búsqueda", svg: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"},  
   ]

  const seccionesCarga = [
    { mostrar: "Mis denuncias", url: "/mis-denuncias", svg: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" },
    { mostrar: "Cargar denuncias", url: "/cargar-denuncias", svg: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"}, 
    { mostrar: "Verificar denuncias", url: "/verificar-denuncias", svg: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"},
    { mostrar: "Informes", url: "/informes", svg: "m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"},
      ]
  const seccionesAdmin = [
    { mostrar: "Denuncias internas", url: "/denuncias-internas", svg: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"},
    { mostrar: "Denuncias externas", url: "/denuncias-externas", svg: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"},
    { mostrar: "Administrar usuarios SCUDAM", url: "/administrar-usuarios-scudam", svg: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"},
    { mostrar: "Registro de Actividad", url: "/registro-de-actividad", svg: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"},
    { mostrar: "Selectores de carga", url: "/selectores-de-carga", svg: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"},
    { mostrar: "Resumen", url: "/resumen", svg: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"},
  ]
  
  const isAdmin:boolean = user?.rol === 'admin';
  const isCarga:boolean = user?.rol === 'carga' || user?.rol === 'admin';
  const isAgente:boolean = user?.rol === 'agente' || user?.rol === 'admin' || user?.rol === 'carga'; 
  
  const saludosDependiendoLaHora = () => {
    const fecha:Date = new Date();
    const hora:number = fecha.getHours();
    if(hora >= 0 && hora < 12) {
      return 'Buenos días';
    } else if(hora >= 12 && hora <= 19) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }
  return (
    <>
    <NavBar user={user}/>
      <div className='h-screen p-10'>
      <h1 className='text-4xl sm:text-7xl'>¡{saludosDependiendoLaHora()}, {user?.nombre}!</h1>
      {user?.rol === 'sin_asignar' && (
      <p>Aún se te está asignando el rol, regresa pronto.</p>
      )}
      <div>
        <h2 className='text-3xl my-5'>Accesos directos</h2>
        <div className='grid gap-1 grid-cols-1 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 w-full '> 
        <CardActions mostrar={"Mi perfil"} url={"/mi-perfil"} svg={"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"}/>
        {isAgente && seccionesAgente.map((seccion, index) => (
          <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} svg={seccion.svg}/>
        ))}
          {isCarga && seccionesCarga.map((seccion, index) => (
            <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} svg={seccion.svg}/>
          ))}
         
         {isAdmin && 
        <CardActions mostrar={"Mostrar sección admin"} showAdminSection={showAdminSection} setShowAdminSection={setShowAdminSection} url={""}  svg={"M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"}/>
         }
        {(isAdmin && showAdminSection) && seccionesAdmin.map((seccion, index) => (
          <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} svg={seccion.svg}/>
        ))}
    </div>
      </div>

      {user?.rol === 'admin' && (
        <div>
          <h2 className='text-3xl my-5 '>Resumen</h2>
          <div className='grid gap-1 grid-cols-1 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 w-full'> 
        <CardProfile title="Mi cuenta" description= "Mis datos" usuario={user} />
        <CardDenunciasRecientes title="Denuncias recientes"/>
        <CardDenunciasPendientesValidacion/>
        </div> 
        </div> 
      )}
      </div>
    
    </>
  );
}

export default Home;