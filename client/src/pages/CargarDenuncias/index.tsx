
// Hooks
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Conexión con BackEnd
import { crearDenuncia, agregarVictima, agregarVictimario } from '../../api/crud';

// Librerías React
import Swal from 'sweetalert2'

// Componentes
import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';
import CargarVictima from '../../components/Cargar/CargarVictima';
import CargarVictimario from '../../components/Cargar/CargarVictimario';
import CargarDenuncia from '../../components/Cargar/CargarDenuncia';
import CargarObservaciones from '../../components/Cargar/CargarObservaciones';
import CargarDenunciasRolCarga from './CargarDenunciasRolCarga';
import CargarDenunciasRolAgente from './CargarDenunciasRolAgente';

function CargarDenuncias() {
  const {  register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()

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

        {(user.rol === 'carga' || user.rol === 'admin' ) && <CargarDenunciasRolCarga user={user} />}
        {(user.rol === 'agente') && <CargarDenunciasRolAgente user={user} />}

      </>
    );
  } 


export default CargarDenuncias