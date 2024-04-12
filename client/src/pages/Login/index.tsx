import { useForm } from 'react-hook-form'

function Login() {
  const { register } = useForm()

  return (
    <div className='gradient h-screen flex flex-col items-center align-middle justify-center'>
      <div className='bg-white h-screen w-screen md:h-2/3 md:w-1/3 flex align-middle justify-center rounded-md'>
        <div className='w-screen flex flex-col items-center align-middle justify-center'>
          <h1 className='open-sans text-3xl font-semibold'>¡Bienvenido!</h1>
         <figure className='flex flex-col'>
            <img className='w-28 sm:w-20' src="/Escudo_Policia_Chaco_Transparente.png" alt="" />
          </figure>
          <h1 className='open-sans text-xl'>Dpto. Violencia Familiar y de Género</h1>
          <form className='flex flex-col items-center align-middle justify-center w-4/5 sm:w-3/5' action="">
            <input className='border open-sans border-gray-300 w-full rounded-md h-10 my-2 m-4' type='text' placeholder="Usuario"
            {...register('username', {required: true } )} />
            <input className='border open-sans border-gray-300 rounded-md w-full h-10 my-2' type='password' placeholder='Contraseña' 
            {...register('password', {required: true } )} />
            <span>¿Has olvidado la contraseña? </span> <a href='/recover' className='text-sky-900'>Recuperar</a>
            <button className='bg-sky-900 hover:bg-sky-700 text-white w-full h-10 rounded-md my-2'>Iniciar Sesión</button>
            <span className='text-sm'>¿No tienes cuenta? <a href='/register' className='text-sky-900'>Regístrate</a></span>
          </form> 
        </div>
      </div>
    </div>
  )
}

export default Login
