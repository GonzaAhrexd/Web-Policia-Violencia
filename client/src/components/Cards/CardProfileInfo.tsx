import React from 'react'
import CardIndividualInfo from './CardIndividualInfo'
//@ts-ignore
function CardProfileInfo({ user, setIsEditing, isEditing }) {
    return (

        <div className="h-full sm:h-full w-full bg-sky-950 pt-12 rounded-xl">
            <div className="w-8/10 mx-auto bg-sky-900 rounded-lg overflow-hidden shadow-lg h-95/100">
                <div className=" px-4 pb-6">
                    <div className="text-center my-4">
                        <img className="h-32 w-32 rounded-full border-4 border-gray-800 mx-auto my-4"
                            src={user.imagen ? user.imagen : "/user.png"} alt="" />
                        <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{user.nombre + ' ' + user.apellido}</h3>
                            <CardIndividualInfo tipoFill="none" tipoStroke="currentColor" campo={user.jerarquia}
                                svg={"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"} />
                            <CardIndividualInfo tipoFill="currentColor" tipoStroke="" campo={user.username} svg={"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"}></CardIndividualInfo>
                            <CardIndividualInfo tipoFill="currentColor" tipoStroke="" campo={user.telefono} svg={"M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"} />
                            <CardIndividualInfo tipoFill="currentColor" tipoStroke="" campo={user.credencial} svg={"M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"} />
                            <CardIndividualInfo tipoFill="none" tipoStroke={"currentColor"} campo={user.plaza} svg={"M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"}></CardIndividualInfo>
                            <CardIndividualInfo tipoFill="currentColor" tipoStroke="" campo={user.unidad} svg={"M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}></CardIndividualInfo>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="" />
                            </svg>


                        </div>
                    </div>
                    <div className="flex gap-2 px-2">
                        <button
                            className="flex-1 rounded-full text-white antialiased font-bold bg-sky-950 hover:bg-sky-700 px-4 py-2" onClick={() => setIsEditing(!isEditing)}>
                            {!isEditing ? "Modificar Datos" : "Cancelar"}
                        </button>

                    </div>
                </div>


            </div>

        </div>


    )
}

export default CardProfileInfo