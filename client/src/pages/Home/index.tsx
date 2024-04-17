import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth }  from '../../context/auth';
import NavBar from '../../components/NavBar';

function Home() {

  //@ts-ignore
  const { signUp, user, isAuthenticated, isLoading } = useAuth();


  if(isLoading) return <h1>Cargando...</h1>
  
  if(!isLoading && !isAuthenticated) return <Navigate to="/login" replace/>
  
  return (
    <div className='bg-white h-screen flex flex-col align-middle items-center'>
      <NavBar rol={user.rol}/>
      <h1 className='text-7xl'>Bienvenido {user?.nombre}</h1>
     
    </div>
  );
}

export default Home;