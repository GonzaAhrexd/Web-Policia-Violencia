import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useState } from 'react';
import CargarVictima from '../../components/CargarVictima';
import CargarVictimario from '../../components/CargarVictimario';
import CargarDenuncia from '../../components/CargarDenuncia';

function CargarDenuncias() {
  //@ts-ignore
  const { signUp, user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />


  if (user.rol === 'carga' || user.rol === 'admin') {
    return (
      <>
        <NavBar user={user} />
        <div className='h-screen sm:h-full p-2 sm:p-10'>
          <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
          <div>
            <h1 className='text-2xl my-5'>Victima</h1>
            <form action="">
              <div className='flex justify-center'>
                <CargarVictima />
              </div>
              <h1 className='text-2xl my-5'>Victimario</h1>
              <div className='flex justify-center'>
              <CargarVictimario />
              </div>
              <h1 className='text-2xl my-5'>Detalles</h1>
              <div className='flex justify-center'>
              <CargarDenuncia />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <Navigate to="/" replace />
    );
  }
}

export default CargarDenuncias