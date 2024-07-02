import React from 'react'
import CardIndividualInfo from './CardIndividualInfo'
//@ts-ignore
function CardProfileInfo({ user, setIsEditing, isEditing }) {
    return (

        <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-center mt-10">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-semibold">Nombre Apellido</h1>
      </div>
      <div className="flex justify-around mt-10 p-6">
        <div className="bg-white shadow-lg rounded-lg w-1/3 p-4">
          <h2 className="text-lg font-medium">Datos</h2>
          <p className="mt-2">Aquí van los datos del usuario.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg w-1/3 p-4">
          <h2 className="text-lg font-medium">Denuncias Recientes</h2>
          <p className="mt-2">Aquí van las denuncias recientes del usuario.</p>
        </div>
      </div>
    </div>


    )
}

export default CardProfileInfo