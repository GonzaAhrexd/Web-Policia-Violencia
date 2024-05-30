// Enrutamiento
import { useRoutes, BrowserRouter } from 'react-router-dom'

// Páginas
// LOGIN E INICIO
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import Perfil from './Perfil'
// 404
import NotFound from './NotFound'
// DENUNCIAS
import CargarDenuncias from './CargarDenuncias'
import MisDenuncias from './MisDenuncias'
import VerificarDenuncias from './VerificarDenuncias'
// BÚSQUEDA
import Buscar from './Buscar'
// ADMIN
// Contexto
import { AuthProvider } from '../context/auth'

// CSS
import '../App.css'

// Librerías React
import {NextUIProvider} from "@nextui-org/react";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/mi-perfil', element: <Perfil /> },
    // Denuncias
    { path: '/cargar-denuncias', element: <CargarDenuncias /> },
    { path: '/mis-denuncias', element: <MisDenuncias /> },
    { path: '/verificar-denuncias', element: <VerificarDenuncias />},
    // Búsqueda
    { path: '/búsqueda', element: <Buscar />},
    // Admin
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout /> },
    { path: '*', element: <NotFound /> },
  ])

  return routes
}

const App = () => {

  return (
    <AuthProvider>
      <NextUIProvider> 
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </NextUIProvider>
    </AuthProvider>

  )
}

export default App
