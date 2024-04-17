import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function NavBar({rol}:any) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenuAdmin, setShowSubMenuAdmin] = useState(false);

  return (
    <div className='bg-sky-900 text-white w-full h-1/10 lg:mt-1 lg:w-4/10 lg:rounded-lg flex flex-row align-middle justify-center '>
      <ul className='w-full flex flex-row items-center justify-around '>
        {(rol === 'admin' || rol === 'carga') && 
    
        <li className='text-xl ' onMouseMove={() =>setShowSubMenu(true)} >
          <NavLink to="/nueva-denuncia">Denuncias</NavLink>
          {showSubMenu && (
            <ul className='absolute bg-white text-black rounded-lg mt-2 border-2 border-sky-600' onMouseLeave={() => setShowSubMenu(false)} >
            <li className='p-2'>
              <NavLink to="/mis-denuncias">Mis Denuncias</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/nueva-denuncia">Nueva Denuncia</NavLink>
            </li>
          </ul>
        )}
        </li>
        
        }
        <li>
        <NavLink to='/'>
          <figure className='bg-sky-600 border-4 border-sky-700	 w-20 h-20 hover:h-24 hover:w-24 rounded-2xl flex flex-row items-center justify-center'>
            <img className='w-20 sm:w-14' src="/Escudo_Policia_Chaco_Transparente.png" alt="" /> 
          </figure>
        </NavLink>
        
        </li>
       {(rol === 'admin' || rol === 'carga') && 
        <li className='text-xl ' onMouseMove={() =>setShowSubMenuAdmin(true)} >
          <NavLink to="/admin">Admin</NavLink>
          {showSubMenuAdmin && (
            <ul className='absolute bg-white text-black rounded-lg mt-2 border-2 border-sky-600' onMouseLeave={() => setShowSubMenuAdmin(false)} >
            <li className='p-2'>
              <NavLink to="/cargar">Cargar</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/buscar">Buscar</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/denuncias-internas">Denuncias Internas</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/denuncias-enviadas-por-unidades-externas">Denuncias Enviadas por Unidades Externas</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/resumen-general-diario">Resumen General Diario</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/administrar-usuarios">Administrar Usuarios</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/registro-de-actividad">Registro de Actividad</NavLink>
            </li>
            <li className='p-2'>
              <NavLink to="/informes">Informes</NavLink>
            </li>
            <li className='p-2'>
              <NavLink  to="/generar-excel">        
                Generar Excel</NavLink>
            </li>
            
            <li className='p-2'>
              <NavLink to="/selector-de-cargas">Selectores de Cargas</NavLink>
            </li>
            
            <li className='p-2'>
              <NavLink to="/resumen">Resumen</NavLink>
            </li>
          </ul>
        )}
        </li>
        }
      </ul>
    </div>
  )
}

export default NavBar