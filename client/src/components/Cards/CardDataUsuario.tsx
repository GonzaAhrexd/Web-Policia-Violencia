interface CardDataUsuarioProps {
    datosUsuario: any
    setIsEditing: any
}
function CardDataUsuario({datosUsuario, setIsEditing}: CardDataUsuarioProps) {
    console.log(datosUsuario)
  return (
    <div className="bg-white shadow-lg rounded-lg md:w-6/10 p-4">
        <h2 className="text-lg font-medium">Datos</h2>
        <p className="mt-2">Jerarquía: {datosUsuario.jerarquia}</p>
        <p className="mt-2">Nombre de usuario: {datosUsuario.username}</p>
        <p className="mt-2">Teléfono: {datosUsuario.telefono}</p>
        <p className="mt-2">Credencial: {datosUsuario.credencial}</p>
        <p className="mt-2">Plaza: {datosUsuario.plaza}</p>
        <p className="mt-2">Zona: {datosUsuario.zona}</p>

        <p className="mt-2">Unidad: {datosUsuario.unidad}</p>

        <div className='bg-sky-950 hover:bg-sky-900 text-white cursor-pointer font-bold py-2 px-4 rounded w-full flex items-center justify-center mt-2 md:mt-0' onClick={() => setIsEditing(true)}>
                Editar datos
            </div>
      </div>
)
}

export default CardDataUsuario