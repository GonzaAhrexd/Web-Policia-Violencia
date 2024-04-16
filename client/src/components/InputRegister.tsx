import React from 'react'
import { useForm } from 'react-hook-form'
//@ts-ignore
function InputRegister(props) {
    const { campo, nombre, register, type, error, variante } = props
    const placeholder = props.placeholder ? props.placeholder : ''

    return (

        <div className={`flex flex-col md:w-1/2`}>
            <span className='font-medium ml-4 xl:text-vw'> {campo} {error && <span className='text-red-500'>Requerido</span>} </span> 
            <input className='border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2' type= {type}
                 {...register(nombre, { required: true })} placeholder={placeholder} />
        </div>
    )
}

export default InputRegister