import { useRoutes, BrowserRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import { AuthProvider } from '../context/auth'
import '../App.css'
const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Login /> },
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
