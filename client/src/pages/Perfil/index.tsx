import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar'
import CardProfileInfo from '../../components/Cards/CardProfileInfo';
import CardProfileDataEdit from '../../components/Cards/CardProfileDataEdit';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function Perfil() {
    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();
    const [isEditing, setIsEditing] = useState(false)

    if (isLoading) return <h1>Cargando...</h1>

    if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />


    return (
        <>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h2 className='text-3xl my-5'>Mi Perfil </h2>
                <div className={`flex flex-col lg:flex-row items-center sm:justify-center w-full sm:w-full h-full sm:h-full `}>
                    <div className={`${isEditing ? "w-full md:w-7/10 lg:w-5/10 xl:w-4/10" : "w-full md:w-7/10 lg:w-4/10"} sm:px-2`}>
                        <CardProfileInfo user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
                    </div>
                    <div className={`${isEditing ? "w-full md:w-7/10 lg:w-5/10 xl:w-4/10 h-full" : "hidden"}`}>
                    <CSSTransition in={isEditing} timeout={300} classNames="fade" unmountOnExit>
                        <CardProfileDataEdit user={user} />
                    </CSSTransition>
                    </div>

                </div>

            </div>
        </>
    )

}

export default Perfil