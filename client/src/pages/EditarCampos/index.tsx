
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useState, useContext } from 'react';
import TablaCampos from '../../components/Table/TablaCampos';
import { useAuth } from '../../context/auth';
import { CamposContext } from '../../context/campos';

function EditarCampos() {
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const [showJuzgadoIntervinente, setShowJuzgadoIntervinentes] = useState<boolean>(false);

    const { juzgadoIntervinente, isLoading: isCamposLoading } = useContext(CamposContext);

    const handleReset = () => {
        setShowJuzgadoIntervinentes(false);
    }

    const handleShowJuzgadoIntervinentes = () => {
        handleReset();
        setShowJuzgadoIntervinentes(true);
    }

    // Si está cargando la autenticación o los campos, muestra "Cargando..."
    if (isAuthLoading || isCamposLoading) return <h1>Cargando...</h1>;

    // Si la autenticación no está cargando pero no está autenticado, redirige a /login
    if (!isAuthLoading && !isAuthenticated) return <Navigate to="/login" replace />;

    // Si el usuario no es admin, redirige a /
    if (user?.rol !== 'admin') return <Navigate to="/" replace />;

    return (
        <>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Editar campos</h1>
                <div className='mt-5 flex flex-col items-center justify-center '>
                    <div className={`flex flex-col p-5 w-full items-center justify-center md:w-3/10 `}>
                        <div className={`w-full flex justify-center items-center `}>
                            <button className={`my-2 ${showJuzgadoIntervinente ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={handleShowJuzgadoIntervinentes}>Juzgado Intervinentes</button>
                        </div>
                    </div>
                    {showJuzgadoIntervinente && (
                        <TablaCampos campos={juzgadoIntervinente} tipo="juzgadoInterviniente" />
                    )}
                </div>
            </div>
        </>
    );
}

export default EditarCampos;