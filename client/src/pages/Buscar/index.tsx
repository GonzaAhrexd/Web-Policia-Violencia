/*
    [Búsqueda]
    Descripción: Página para buscar denuncias, víctimas, victimarios, terceros y exposiciones, mediante distintos filtros.
*/
// Autenticación
import { useAuth } from '../../context/auth';

// Hooks
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

// Componentes
import NavBar from '../../components/NavBar';
// Dependencias de la misma carpeta
import BuscarDenuncias from '../../components/Busqueda/BuscarDenuncias/BuscarDenuncias';
import BuscarVictimas from '../../components/Busqueda/BuscarVictimas/BuscarVictimas';
import BuscarVictimario from '../../components/Busqueda/BuscarVictimarios/BuscarVictimario';
import BuscarTerceros from '../../components/Busqueda/BuscarTerceros/BuscarTerceros';
import BuscarExposiciones from '../../components/Busqueda/BuscarExposiciones/BuscarExposiciones';
import BuscarDenunciasSinVerificar from '../../components/Busqueda/BuscarDenunciasSinVerificar/BuscarDenunciasSinVerificar';
import Footer from '../../components/Footer/Footer';
import LoadingScreen from '../../components/LoadingScreen';
import { useStore } from '../MisDenuncias/store';
import Modal from '../../components/Modal';
function Buscar() {
    // Autenticación
    const { user, isAuthenticated, isLoading } = useAuth();
    const { setOpenModal, openModal, title, text } = useStore()
    // Estados
    const [mostrarVictimas, setMostrarVictimas] = useState(false)
    const [mostrarVictimarios, setMostrarVictimarios] = useState(false)
    const [mostrarDenuncias, setMostrarDenuncias] = useState(true)
    const [mostrarTerceros, setMostrarTerceros] = useState(false)
    const [mostrarExposiciones, setMostrarExposiciones] = useState(false)
    const [buttonSelected, setButtonSelected] = useState('denuncias')

    // Mostrar denuncias y ocultar los demás
    const handleMostrarDenuncias = () => {
        setMostrarDenuncias(true)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
        setMostrarTerceros(false)
        setMostrarExposiciones(false)
        setButtonSelected('denuncias')
    }
    // Mostrar víctimas y ocultar los demás
    const handleMostrarVictimas = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(true)
        setMostrarTerceros(false)
        setMostrarExposiciones(false)
        setButtonSelected('victima')
    }
    // Mostrar victimarios y ocultar los demás
    const handleMostrarVictimarios = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(true)
        setMostrarVictimas(false)
        setMostrarTerceros(false)
        setMostrarExposiciones(false)
        setButtonSelected('victimario')
    }
    // Mostrar terceros y ocultar los demás
    const handleMostrarTerceros = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
        setMostrarTerceros(true)
        setMostrarExposiciones(false)

        setButtonSelected('terceros')
    }
    // Mostrar exposiciones y ocultar los demás
    const handleMostrarExposiciones = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
        setMostrarTerceros(false)
        setMostrarExposiciones(true)
        setButtonSelected('exposicion')
    }

    if (isLoading) return <LoadingScreen />
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    if (user?.rol === "sin_definir") return <Navigate to="/login" replace />
    return (
        <div className='h-full flex flex-grow flex-col'>
            <NavBar user={user} />
            <div>
                {openModal && <Modal titulo={title} texto={text} onClose={() => setOpenModal(false)} />}
            </div>
            <div className='min-h-screen flex flex-grow flex-col'>
                {((user?.rol === "admin") || (user?.rol == "carga")) &&
                    <div className='flex flex-col md:flex-row items-center justify-center m-2 md:m-0'>
                        <button className={`${buttonSelected == "victima" ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700   text-white font-bold py-2 px-4 rounded w-full md:w-2/10 lg:w-1/10 m-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={() => handleMostrarVictimas()}> Víctima </button>
                        <button className={`${buttonSelected == "victimario" ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-2/10 lg:w-1/10 m-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={() => handleMostrarVictimarios()}> Victimario </button>
                        <button className={`${buttonSelected == "terceros" ? "bg-sky-700" : "bg-sky-950"}  hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-2/10 lg:w-1/10 m-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={() => handleMostrarTerceros()}> Terceros </button>
                        <button className={`${buttonSelected == "denuncias" ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-2/10 lg:w-1/10 m-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={() => handleMostrarDenuncias()}> Denuncias</button>
                        <button className={`${buttonSelected == "exposicion" ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-2/10 lg:w-1/10 m-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={() => handleMostrarExposiciones()}> Exposiciones</button>
                    </div>
                }
                <div className='h-full p-2 sm:p-10'>
                    {((user?.rol === "admin") || (user?.rol == "carga")) &&
                        <>
                            <h1 className='text-3xl my-5'>Búsqueda</h1>
                            {mostrarVictimas && <BuscarVictimas />}
                            {mostrarVictimarios && <BuscarVictimario />}
                            {mostrarTerceros && <BuscarTerceros />}
                            {mostrarDenuncias && <BuscarDenuncias />}
                            {mostrarExposiciones && <BuscarExposiciones />}
                        </>
                    }
                    {user?.rol === "agente" &&
                        <>
                            <h1 className='text-3xl my-5'>Búsqueda</h1>
                            <BuscarDenunciasSinVerificar />
                        </>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Buscar
