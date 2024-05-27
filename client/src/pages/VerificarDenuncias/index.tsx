// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// APIs del BackEnd
import { mostrarDenunciasSinVerificar } from '../../api/crud';
// Componentes
import NavBar from '../../components/NavBar';
// Librerías React
import DataTable from 'react-data-table-component';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

// Dependencias de la misma carpeta
import { customStyles } from './dataTableStyles'
import { columns } from './columnsDataTable'
import expandedComponents from './expandedComponents'



function VerificarDenuncias() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    
    useEffect(() => {
        const cargarDenuncias = async () => {
          try {
            const response = await mostrarDenunciasSinVerificar();
            console.log(response)
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

    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <h1>Cargando...</h1>
    if (!isLoading && !isAuthenticated && user.rol != "carga" || user.rol != "admin") return <Navigate to="/login" replace />


    return (
        <div>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Denuncias sin verificar</h1>

                <div className="flex flex-col w-full">
                    <h2 className='text-2xl my-5'>Denuncias</h2>
                    <DataTable
                        // @ts-ignore
                        columns={columns}
                        data={denunciasAMostrar}
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
             

        </div>
    )
}

export default VerificarDenuncias