/*
  [/logout] 
  Descripción: Página de cierre de sesión, solo muestra un mensaje de cerrando sesión
*/
// Hooks
import { useAuth } from '../../context/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function index() {
    const { logOut, isAuthenticated } = useAuth()
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated){
            logOut()
            setTimeout(() => {
            navigate('/login')
            }, 2000)
        }
      }, [isAuthenticated])
    return (
    <div>Cerrando sesión...</div>
  )
}

export default index