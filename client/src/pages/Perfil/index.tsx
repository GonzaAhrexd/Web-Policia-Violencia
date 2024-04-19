import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar'
import CardProfileInfo from '../../components/Cards/CardProfileInfo';
import CardProfileDataEdit from '../../components/Cards/CardProfileDataEdit';
import { useState } from 'react';
import CardsInfoProfile from '../../components/Cards/CardsInfoProfile';

function Perfil() {
    //@ts-ignore
    const { signUp, user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <h1>Cargando...</h1>

    if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

    const [isEditing, setIsEditing] = useState(false)

    return (
        <>
            <NavBar user={user} />
            <div className='h-screen p-10'>
                <h2 className='text-3xl my-5'>Mi Perfil </h2>
            
                <div className={` flex flex-col md:flex-row items-center justify-center w-full h-8/10 `}>

                    <div className={`${isEditing ? "w-full md:w-3/10" : "w-full md:w-4/10"} h-full px-2`}>
                        <CardProfileInfo user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
                    </div>

                    <div className={`${isEditing ? "md:w-1/2" : "hidden"} h-full`}>
                        {isEditing && <CardProfileDataEdit user={user} />}
                    </div>

                </div>
            </div>
        </>
    )

}

export default Perfil