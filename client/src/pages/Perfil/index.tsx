import React from 'react'
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar'
function Perfil() {
    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <h1>Cargando...</h1>

    if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

    return (
        <>
            <NavBar user={user} />
            <div className='h-screen p-10'>
            <h2 className='text-3xl my-5'>Mi Perfil</h2>
            <div className='flex flex-column items-center justify-center w-full h-8/10'>
                <div className='border border-red-200 w-3/10 h-full'>
                    AA
                </div>
                <div className='border border-teal-500 w-5/10 h-full'>
                    AA
                </div>
            </div>
            </div>
        </>
    )
}

export default Perfil