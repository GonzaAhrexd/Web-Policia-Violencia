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

function Buscar() {
    // Autenticación
    const {  user, isAuthenticated, isLoading } = useAuth();

    // Estados
    const [mostrarVictimas, setMostrarVictimas] = useState(false)
    const [mostrarVictimarios, setMostrarVictimarios] = useState(false)
    const [mostrarDenuncias, setMostrarDenuncias] = useState(true)
    const [mostrarTerceros, setMostrarTerceros] = useState(false)

    // Mostrar u ocultar los componentes
    // Mostrar denuncias y ocultar los demás
    const handleMostrarDenuncias = () => {
        setMostrarDenuncias(true)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
        setMostrarTerceros(false)
    }
    // Mostrar víctimas y ocultar los demás
    const handleMostrarVictimas = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(true)
        setMostrarTerceros(false)
    }
    // Mostrar victimarios y ocultar los demás
    const handleMostrarVictimarios = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(true)
        setMostrarVictimas(false)
        setMostrarTerceros(false)
    }
    // Mostrar terceros y ocultar los demás
    const handleMostrarTerceros = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
        setMostrarTerceros(true)
    }

    
    if (isLoading) return <h1>Cargando...</h1>
    if (!isLoading && !isAuthenticated && user?.rol != "carga" || user?.rol != "admin") return <Navigate to="/login" replace />
    return (
        <div>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <div className='flex flex-col md:flex-row items-center justify-center'>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-full md:w-3/10 m-2" onClick={() => handleMostrarVictimas()}> Víctima </button>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-full md:w-3/10 m-2" onClick={() => handleMostrarVictimarios()}> Victimario </button>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-full md:w-3/10 m-2" onClick={() => handleMostrarTerceros()}> Terceros </button>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-full md:w-3/10 m-2" onClick={() => handleMostrarDenuncias()}> Denuncias</button>
                </div>
                <h1 className='text-3xl my-5'>Búsqueda</h1>
                {mostrarVictimas && <BuscarVictimas/> }
                {mostrarVictimarios && <BuscarVictimario/>}
                {mostrarDenuncias && <BuscarDenuncias />}
                {mostrarTerceros && <BuscarTerceros/>}
            </div>
        </div>
    )
}

export default Buscar