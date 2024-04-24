import React from 'react'

interface InputDateProps {
    campo: string;
    nombre: string;
    register: any;
    type: string;
    placeholder?: string;
    error: any;
}


function InputDate({campo, nombre, register, type, placeholder, error}: InputDateProps) {
  return (

        <div className={`flex ${campo === 'Cantidad' ? "flex-row w-1/2" : "flex-col md:w-1/2"}`}>
            <span className={`font-medium ml-4 xl:text-vw`}> {campo} </span>
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-16"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="date"
                {...register(nombre, { required: true })} placeholder={placeholder} />
        </div>

  )
}

export default InputDate