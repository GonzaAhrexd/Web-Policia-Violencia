import React from 'react'

function Login() {
  return (
    <div className='bg-sky-900 h-screen flex flex-col items-center align-middle justify-center'>
      <div className='bg-white h-2/3 w-1/3 flex align-middle justify-center rounded-xl'>
        
        <div className='flex flex-col items-center align-middle justify-center'>

          <h1 className='text-3xl font-semibold'>¡Bienvenido de Regreso!</h1>
          <form className='flex flex-col items-center align-middle justify-center'>
            <input className='border border-gray-300 rounded-md w-3/3 h-10 my-2' type='text' placeholder='Usuario' />
            <input className='border border-gray-300 rounded-md w-3/3 h-10 my-2' type='password' placeholder='Contraseña' />
            <button className='bg-sky-900 text-white w-2/3 h-10 rounded-md my-2'>Inciar Sesión</button>
            <span className='text-sm'>¿No tienes cuenta? <a href='/register' className='text-sky-900'>Regístrate</a></span>
          </form>
        </div>
      </div>
      </div>
  )
}

export default Login