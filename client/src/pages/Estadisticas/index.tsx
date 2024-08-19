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
import EstadisticasTiposDeViolencia from '../../components/EstadisticasSecciones/EstadisticasTiposDeViolencia';
import EstadisticasModalidades from '../../components/EstadisticasSecciones/EstadisticasModalidades';
import EstadisticasMedidasCautelares from '../../components/EstadisticasSecciones/EstadisticasMedidasCautelares';
import EstadisticasVictimasSeccion from '../../components/EstadisticasSecciones/EstadisticasVictimasSeccion';
import Modal from '../../components/Modal';
// API
import { buscarDenuncias } from '../../api/crud';
import EstadisticasAprehensiones from '../../components/EstadisticasSecciones/EstadisticasAprehensiones';

// Iconos
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

function index() {

    const { user, isAuthenticated, isLoading } = useAuth();
    const { register, setValue, handleSubmit, formState: {

    } } = useForm()

    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);

    // Estado para mostrar las  estadísticas
    const [showLocalidadesStats, setShowLocalidadesStats] = useState(false);
    const [showDivionesStats, setShowDivionesStats] = useState(false);
    const [showAprehensionesStats, setShowAprehensionesStats] = useState(false);
    const [showTipoDeViolencia, setShowTipoDeViolencia] = useState(false);
    const [showModalidades, setShowModalidades] = useState(false);
    const [showMedidasCautelares, setShowMedidasCautelares] = useState(false);
    const [showVictimas, setShowVictimas] = useState(false);
    const [showAll, setShowAll] = useState(false);
    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [texto, setTexto] = useState(['']);
    const [titulo, setTitulo] = useState('');
    // STATS
    // RESET
    const handleReset = () => {
        setShowLocalidadesStats(false)
        setShowDivionesStats(false)
        setShowAprehensionesStats(false)
        setShowTipoDeViolencia(false)
        setShowModalidades(false)
        setShowMedidasCautelares(false)
        setShowVictimas(false)
    }
    // Localidades
    const handleLocalidadesStats = () => {
        if(showLocalidadesStats) return setShowAll(true)
        handleReset()
        setShowLocalidadesStats(true)
        setShowAll(false)
    }
    // Divisiones
    const handleDivisionesStats = () => {
        if(showDivionesStats) return setShowAll(true)
        handleReset()
        setShowDivionesStats(true)
        setShowAll(false)
    }
    // Aprehensiones
    const handleAprehensiones = () => {
        if(showAprehensionesStats) return setShowAll(true)
        handleReset()
        setShowAprehensionesStats(true)
        setShowAll(false)
    }
    // Tipo de violencia
    const handleTipoDeViolencia = () => {
        if(showTipoDeViolencia) return setShowAll(true)
        handleReset()
        setShowTipoDeViolencia(true)
        setShowAll(false)
    }

    // Modalidades
    const handleModalidades = () => {
        if(showModalidades) return setShowAll(true)
        handleReset()
        setShowModalidades(true)
        setShowAll(false)
    }

    const handleMedidasCautelares = () => {
        if(showMedidasCautelares) return setShowAll(true)
        handleReset()
        setShowMedidasCautelares(true)
        setShowAll(false)
    }
    const handleVictimas = () => {
        if(showVictimas) return setShowAll(true)
        handleReset()
        setShowVictimas(true)
        setShowAll(false)
    }


    // Búsqueda
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenuncias(values);
            setDenunciasAMostrar(result)
            handleLocalidadesStats()
        }
        fetchDenuncias();
        console.log(denunciasAMostrar)
    }

    // Cerrar modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    // Abrir modal
    const handleOpenModal = (text: string[]) => {
        setIsModalOpen(true);
        setTexto(text);
    };




    if (isLoading) return <h1>Cargando...</h1>
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    if (user?.rol === "sin_definir") return <Navigate to="/login" replace />
    return (
        <>
            {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
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
                        <div className='mt-5 flex flex-col items-center justify-center '>
                            <div className={`flex flex-col  ${showAll && 'border-blue-800 border-2 rounded-lg bg-blue-50 '} p-5 w-full items-center justify-center  max-w-xs`}>
                                <div className={`w-full flex flex-col ${!showAll && 'md:flex-row'} justify-center items-center`}>
                                   {(showAll || showLocalidadesStats) && <button className={`my-2 ${showLocalidadesStats ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleLocalidadesStats()}>Localidades</button> }
                                   {(showAll || showDivionesStats) && <button className={`my-2 ${showDivionesStats ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleDivisionesStats()}>Divisiones</button> }
                                   {(showAll || showAprehensionesStats) && <button className={`my-2 ${showAprehensionesStats ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleAprehensiones()}>Aprehensiones</button> }
                                   {(showAll || showTipoDeViolencia) && <button className={`my-2 ${showTipoDeViolencia ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleTipoDeViolencia()}>Tipo de Violencia</button> }
                                   {(showAll || showModalidades) && <button className={`my-2 ${showModalidades ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleModalidades()}>Modalidades</button> }
                                   {(showAll || showMedidasCautelares) && <button className={`my-2 ${showMedidasCautelares ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleMedidasCautelares()}>Medidas Cautelares</button> }
                                   {(showAll || showVictimas) && <button className={`my-2 ${showVictimas ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleVictimas()}>Victimas</button> }
                                   {!showAll && <Cog6ToothIcon className='w-10 h-10 cursor-pointer' onClick={() => setShowAll(true)}/> }
                                </div>
                            </div>
                        </div>
                        {showLocalidadesStats && <EstadisticasMunicipiosSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {showDivionesStats && <EstadisticasDivisionesSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {showAprehensionesStats && <EstadisticasAprehensiones denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {showTipoDeViolencia && <EstadisticasTiposDeViolencia handleOpenModal={handleOpenModal} setTitulo={setTitulo} denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {showModalidades && <EstadisticasModalidades handleOpenModal={handleOpenModal} setTitulo={setTitulo} denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {showMedidasCautelares && <EstadisticasMedidasCautelares denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {showVictimas && <EstadisticasVictimasSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                    </>
                }
            </div>


        </>
    )
}

export default index