function Footer() {
  return (
    <footer className="flex flex-col md:flex-row bg-gray-800 text-white p-4 text-center w-full h-full items-center justify-around">  
        <figure className='w-full md:w-4/10 h-full flex flex-row items-center justify-center'>
          <img className='w-72' src="GobiernoDelChaco.png" alt="" />
        </figure>
      <div className="w-full md:w-2/10 flex flex-col justify-center items-center m-4 sm:m-0 text-sm 3xl:text-xl">
        <p>Desarrollado por <a href="https://www.linkedin.com/in/gonzalo-ebel-788452251/"> Gonzalo Nicolás Ebel </a></p>
        <p>División de Capacitación y Estadísticas</p>
        <p>© 2024 - Todos los derechos reservados</p>
      </div>
        <figure className='w-full md:w-4/10 h-full flex flex-row items-center justify-center'>
          <img className='w-72' src="PoliciaDelChacoViolencia.png" alt="" />
        </figure>
    </footer>
  )
}
export default Footer