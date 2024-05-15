import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

interface InputRegisterProps {
    campo: string;
    nombre: string;
    register: any;
    type: string;
    variante?: any;
    valor?: any;
    placeholder?: string;
    setValue?: any;
}

function InputTextArea({ campo, nombre, register, type, variante, valor, placeholder, setValue }: InputRegisterProps) {
    placeholder ? placeholder : ''

    if (valor) {
        useEffect(() => {
            setValue(nombre, valor);
        }, [setValue, nombre, valor]);
    }

    return (
        <div className={`flex flex-col ${variante!="edit" ? 'md:w-6/10' : "h-56"} w-full`}>
            <span className={`font-medium ml-4 xl:text-vw`}> {nombre === "id" ? "" : campo} </span>
            <textarea className="border open-sans pl-4 py-5 resize-none text-lg border-gray-300 rounded-md w-full h-full "type={type}
                {...register(nombre, { required: true })} placeholder={placeholder} />
        </div>
    )
}

export default InputTextArea