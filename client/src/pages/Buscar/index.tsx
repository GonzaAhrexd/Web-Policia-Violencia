// Autenticación
import { useAuth } from '../../context/auth';

// Hooks
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

// APIs del BackEnd
import { misDenuncias } from '../../api/crud';

// Librerías react
import DataTable from 'react-data-table-component';

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

// Componentes
import NavBar from '../../components/NavBar';
import InputCheckbox from '../../components/InputComponents/InputCheckbox';
import InputRegister from '../../components/InputComponents/InputRegister';
import InputDate from '../../components/InputComponents/InputDate';
import BuscarDenuncias from '../../components/Busqueda/BuscarDenuncias/BuscarDenuncias';
// Dependencias de la misma carpeta

import React from 'react'
import BuscarVictimas from '../../components/Busqueda/BuscarVictimas/BuscarVictimas';
import BuscarVictimario from '../../components/Busqueda/BuscarVictimarios/BuscarVictimario'

function Buscar() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const [mostrarVictimas, setMostrarVictimas] = useState(false)
    const [mostrarVictimarios, setMostrarVictimarios] = useState(false)
    const [mostrarDenuncias, setMostrarDenuncias] = useState(true)

    const handleMostrarDenuncias = () => {
        setMostrarDenuncias(true)
        setMostrarVictimarios(false)
        setMostrarVictimas(false)
    }

    const handleMostrarVictimas = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(false)
        setMostrarVictimas(true)
    }
    const handleMostrarVictimarios = () => {
        setMostrarDenuncias(false)
        setMostrarVictimarios(true)
        setMostrarVictimas(false)
    }

    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <h1>Cargando...</h1>
    if (!isLoading && !isAuthenticated && user.rol != "carga" || user.rol != "admin") return <Navigate to="/login" replace />


    return (
        <div>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <div className='flex flex-row items-center justify-center'>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10 m-2" onClick={() => handleMostrarVictimas()}> Víctima </button>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10 m-2" onClick={() => handleMostrarVictimarios()}> Victimario </button>
                    <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10 m-2" onClick={() => handleMostrarDenuncias()}> Denuncias</button>
                </div>
                <h1 className='text-3xl my-5'>Búsqueda</h1>
                {mostrarVictimas && <BuscarVictimas/> }
                {mostrarVictimarios && <BuscarVictimario/>}
                {mostrarDenuncias && <BuscarDenuncias />}
            </div>
        </div>
    )
}

export default Buscar