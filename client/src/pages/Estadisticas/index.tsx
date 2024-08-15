// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Componentes
import NavBar from '../../components/NavBar'
import InputDateRange from '../../components/InputComponents/InputDateRange';
import EstadisticasMunicipiosSeccion from '../../components/EstadisticasSecciones/EstadisticasMunicipiosSeccion';
import EstadisticasDivisionesSeccion from '../../components/EstadisticasSecciones/EstadisticasDivisionesSeccion';
// API
import { buscarDenuncias } from '../../api/crud';


function index() {

    const { user, isAuthenticated, isLoading } = useAuth();
    const { register, setValue, handleSubmit, formState: {

    } } = useForm()

    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);

    // Estado de estadísticas
    const [ showLocalidadesStats, setShowLocalidadesStats ] = useState(false);
    const [ showDivionesStats, setShowDivionesStats ] = useState(false);

    // STATS
    // RESET
    const handleReset = () => {
        setShowLocalidadesStats(false)
        setShowDivionesStats(false)
    }
    
    const handleLocalidadesStats = () => { 
        handleReset()
        setShowLocalidadesStats(true) 
    }
    const handleDivisionesStats = () => {
        handleReset()
        setShowDivionesStats(true)
    }

    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenuncias(values);
            setDenunciasAMostrar(result)
            handleLocalidadesStats()
        }
        fetchDenuncias();
        console.log(denunciasAMostrar)
    }

    if (isLoading) return <h1>Cargando...</h1>
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    if (user?.rol === "sin_definir") return <Navigate to="/login" replace />
    return (
        <>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Estadísticas</h1>
                <form className="w-full flex flex-col items-center"
                    onSubmit={
                        handleSubmit(async (values) => {
                            console.log(values.desde)
                            console.log(values.hasta)
                            handleBusqueda(values)
                        }
                        )}>
                    <InputDateRange register={register} setValue={setValue} isRequired={true} />
                    <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
                </form>
                {denunciasAMostrar?.length > 0 &&
                    <>
                        <div className='mt-5 flex flex-col md:flex-row '>
                            <button className="m-2 bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10" onClick={()=> handleLocalidadesStats()}>Localidades</button>
                            <button className="m-2 bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10" onClick={()=> handleDivisionesStats()}>Divisiones</button>
                        </div>
                       { showLocalidadesStats && <EstadisticasMunicipiosSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} /> }
                       { showDivionesStats && <EstadisticasDivisionesSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} /> }
                    </>
                }
            </div>


        </>
    )
}

export default index