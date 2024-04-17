
import { useAuth } from '../context/auth'
import  { useNavigate, Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
    //@ts-ignore
  const {user, isAuthenticated} = useAuth()
  if(!isAuthenticated) {
    return <Navigate to="/login" replace></Navigate>
  }
  
  return (
    <Outlet />
  )
}

export default ProtectedRoutes