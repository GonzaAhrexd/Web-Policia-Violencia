/*
  [ VerificarDenuncias ] Sección de la página de inicio que muestra las denuncias sin verificar, cargado
   por los agentes que aún faltan rellenar datos estadísticos.
*/
// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// APIs del BackEnd
import { mostrarDenunciasSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';
// Componentes
import NavBar from '../../components/NavBar';
// Librerías React
import DataTable from 'react-data-table-component';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// Dependencias
import { customStyles } from '../../GlobalConst/customStyles'
import { columnsDataTableVerificar } from './columnsDataTableVerificar'
import expandedComponents from './expandedComponents'

import LoadingScreen from '../../components/LoadingScreen';
import Footer from '../../components/Footer/Footer';


function VerificarDenuncias() {

  // Autenticación
  const { user, isAuthenticated, isLoading } = useAuth();
  // Estados
  const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
  useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        const response = await mostrarDenunciasSinVerificar();
        setDenunciasAMostrar(response);
      } catch (error) {
        console.error('Hubo un error al cargar las denuncias: ', error);
      }
    };
    cargarDenuncias();
  }, []);



  const expandableIcon = {
    collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
    expanded: <ArrowUpCircleIcon className='h-6 w-6' />
  }

  if (isLoading) return <LoadingScreen />
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

  if ((user.rol !== "carga") && (user.rol !== "admin")) return <Navigate to="/login" replace />

  return (
    <div className='h-full flex flex-grow flex-col'>
      <NavBar user={user} />
      <div className='min-h-screen sm:h-full p-2 sm:p-10'>
        <h1 className='text-3xl my-5'>Denuncias sin verificar</h1>
        <div className="flex flex-col w-full">
          <h2 className='text-2xl my-5'>Denuncias</h2>
          <DataTable
            columns={columnsDataTableVerificar}
            data={denunciasAMostrar}
            className='scale-up-ver-top'
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
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default VerificarDenuncias