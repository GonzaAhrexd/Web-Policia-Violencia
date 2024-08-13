/*
  [/verificar-denuncias]
  Descripción: Página para verificar denuncias.
*/
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
import ReportarErrores from './ReportarErrores'
// ESTADÍSTICAS
import Estadisticas from './Estadisticas'
// Contexto
import { AuthProvider } from '../context/auth'
// CSS
import '../App.css'

const AppRoutes = () => {
  // Rutas de la aplicación
  let routes = useRoutes([
    // Global
    { path: '/', element: <Home /> },
    { path: '/mi-perfil', element: <Perfil /> },
    // Denuncias
    { path: '/cargar-denuncias', element: <CargarDenuncias /> },
    { path: '/mis-denuncias', element: <MisDenuncias /> },
    { path: '/verificar-denuncias', element: <VerificarDenuncias />},
    // Búsqueda
    { path: '/búsqueda', element: <Buscar />},
    // Estadísticas
    { path: '/estadísticas', element: <Estadisticas />},
    // Admin
    {path: '/reportar-errores', element: <ReportarErrores />},
    // Autenticación (Global)
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout /> },
    // 404
    { path: '*', element: <NotFound /> },
  ])
  return routes
}

const App = () => {
  // AuthProvider valida el login del usuario
  // BrowserRouter utiliza las rutas y por dentro se encierra con AppRoutes que es la función que tenemos arriba
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
