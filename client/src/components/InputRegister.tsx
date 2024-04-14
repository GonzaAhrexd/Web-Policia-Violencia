import React from 'react'
import { useForm } from 'react-hook-form'
//@ts-ignore
function InputRegister(props) {
    const { campo, nombre, register } = props
    const placeholder = props.placeholder ? props.placeholder : ''

    console.log(campo, nombre, placeholder)
 
    return (
        <div className='flex flex-col md:w-1/2'>
            <span className='font-medium ml-4'>
                {campo}
            </span>
            <input className='border open-sans border-gray-300 rounded-md h-10 my-2 m-4' type='text'
                {...register(nombre, { required: true })} placeholder={placeholder} />
        </div>
        
    )
}

export default InputRegister