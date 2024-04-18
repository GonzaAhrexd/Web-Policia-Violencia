import { useRoutes, BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import Home from './Home'
import Logout from './Logout'
import { AuthProvider } from '../context/auth'
import '../App.css'
import {NextUIProvider} from "@nextui-org/react";

import ProtectedRoutes from './ProtectedRoutes'
const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout /> },
    { path: '*', element: <NotFound /> },
  ])

  return routes
}



const App = () => {

  return (
    <NextUIProvider> 

    <AuthProvider>

      <BrowserRouter>
        <AppRoutes />
        
      </BrowserRouter>

    </AuthProvider>

    </NextUIProvider>
  )
}

export default App
