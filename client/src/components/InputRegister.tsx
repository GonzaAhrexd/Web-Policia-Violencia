import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

interface InputRegisterProps {
    campo: string;
    nombre: string;
    register: any;
    type: string;
    error: any;
    variante?: any;
    valor?: any;
    placeholder?: string;
    setValue?: any;
    require?: boolean;
}

function InputRegister({ campo, nombre, register, type, error, variante, require, valor, placeholder, setValue }: InputRegisterProps) {
    placeholder ? placeholder : ''
    if (valor) {
        useEffect(() => {
            setValue(nombre, valor);
        }, [setValue, nombre, valor]);
    }
    return (
        <div className={`flex ${campo=='Barrio' && "flex-col w-full xl:w-1/2"} ${nombre=='numero_de_expediente' && "flex-col w-1/2"} ${((campo!== 'Barrio' && nombre!=='numero_de_expediente' ) && "flex-col md:w-1/2 ")}`}>
            <span className={`font-medium ml-4 xl:text-vw`}> {nombre === "id" ? "" : campo} {error && <span className='text-red-500'>Requerido</span>} </span>
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-12"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                {...register(nombre, { required: !require ? require : true })} placeholder={placeholder} min={0} max={(nombre=="edad_victima") || (nombre=="edad_victimario") ? "130" : "null"}/>
        </div>
    )
}

export default InputRegister