import { useRoutes, BrowserRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
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
   <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
   

  )
}

export default App
