function BotonBusqueda({ label, isSelected, onClick }) {
  return (
    <button
      className={`${
        isSelected ? 'bg-sky-700' : 'bg-sky-950'
      } hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-2/10 lg:w-1/10 m-2 transform transition-transform duration-300 ease-in-out hover:scale-105`}
      onClick={onClick}
    >
      {label}
    </button>   
  )
}

export default BotonBusqueda