// Enrutamiento
import { useRoutes, BrowserRouter } from 'react-router-dom'

// Páginas
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import Home from './Home'
import Logout from './Logout'
import Perfil from './Perfil'
import CargarDenuncias from './CargarDenuncias'
import MisDenuncias from './MisDenuncias'

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
    { path: '/cargar-denuncias', element: <CargarDenuncias /> },
    { path: '/mis-denuncias', element: <MisDenuncias /> },
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
