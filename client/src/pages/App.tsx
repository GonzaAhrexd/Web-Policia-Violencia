import { useRoutes, BrowserRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import Home from './Home'
import { AuthProvider } from '../context/auth'
import '../App.css'
const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> },
  ])
  return routes
}


const App = () => {

  return (
    <AuthProvider>

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

    </AuthProvider>

  )
}

export default App
