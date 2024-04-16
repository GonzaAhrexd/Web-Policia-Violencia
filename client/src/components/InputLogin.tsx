import React from 'react'

//@ts-ignore
function InputLogin(props) {
    const { campo, register, type,error } = props
    const placeholder = props.placeholder ? props.placeholder : ''

    return (
        <>
            <input className='border open-sans border-gray-300 rounded-md w-full h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2' type={type} 
               {...register(campo, { required: true })} placeholder={placeholder} 
               /> 
              <span className='font-medium ml-4 xl:text-vw'> {error && <span className='text-red-500'>Campo requerido</span>} </span> 
            
        </>


    )
}

export default InputLogin