// Autenticación
import { useAuth } from '../../context/auth';

// Hooks
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form'

// Componentes
import NavBar from '../../components/NavBar';
// Dependencias de la misma carpeta
import BuscarDenuncias from '../../components/Busqueda/BuscarDenuncias/BuscarDenuncias';
import BuscarVictimas from '../../components/Busqueda/BuscarVictimas/BuscarVictimas';
import BuscarVictimario from '../../components/Busqueda/BuscarVictimarios/BuscarVictimario';
import BuscarTerceros from '../../components/Busqueda/BuscarTerceros/BuscarTerceros';

function Buscar() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const [mostrarVictimas, setMostrarVictimas] = useState(false)
    const [mostrarVictimarios, setMostrarVictimarios] = useState(false)
    const [mostrarDenuncias, setMostrarDenuncias] = useState(true)
    const [mostrarTerceros, setMostrarTerceros] = useState(false)
    const handleMostrarDenuncias = () => {
        setMostrarDenuncias(true)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
        setMostrarTerceros(false)
    }

    const handleMostrarVictimas = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(true)
        setMostrarTerceros(false)
    }
    const handleMostrarVictimarios = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(true)
        setMostrarVictimas(false)
        setMostrarTerceros(false)
    }
    const handleMostrarTerceros = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
        setMostrarTerceros(true)
    }

    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();
    
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