
// Hooks
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// Componentes
import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';
import CargarDenunciasRolCarga from './CargarDenunciasRolCarga';
import CargarDenunciasRolAgente from './CargarDenunciasRolAgente';

function CargarDenuncias() {
  const {  register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()
  const [modoAvanzado, setModoAvanzado] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [texto, setTexto] = useState(['']);
  const [titulo, setTitulo] = useState('');

  const handleOpenModal = (text: string[]) => {
    setIsModalOpen(true);
    setTexto(text);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModoAvanzado = () => {
    setModoAvanzado(!modoAvanzado);
  }
  //@ts-ignore
  const { signUp, user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />
  
 
    return (
      <>
        <NavBar user={user} />
        <div>
          {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
        </div>
        
        {(user.rol === 'carga' || user.rol === 'admin' ) && 
        <div className='w-full flex flex-col justify-center items-center'>
        <h2 className='text-3xl my-5'>Modo</h2>
        <div className='flex items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => handleModoAvanzado()} >{modoAvanzado ? "Modo Avanzado" : "Modo Simple"}</div>
      
      </div>
      }
        
        {((user.rol === 'carga' || user.rol === 'admin') && modoAvanzado ) && <CargarDenunciasRolCarga setTitulo={setTitulo} handleOpenModal={handleOpenModal} user={user} />}
        {(user.rol === "agente" || !modoAvanzado) && <CargarDenunciasRolAgente user={user} />}

      </>
    );
  } 


export default CargarDenuncias