
// Hook
import { useEffect, useState } from 'react'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';


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
    state: any;
    setState: any;
}

function InputDireccion ({state, setState, campo, nombre, register, type, error, require, valor, placeholder, setValue }: InputRegisterProps) {
    const [avisoRequerido, setAvisoRequerido] = useState(false)
    placeholder ? placeholder : ''

    require ? require : true

    if (valor) {
        useEffect(() => {
            setValue(nombre, valor);
        }, [setValue, nombre, valor]);
    }

    return (
        <div className={`flex flex-col xl:w-1/2`}>
            <span className={`flex font-medium ml-4 `}> {nombre === "id" ? "" : campo} {error && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-12"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                {...register(nombre, {  required: require === false ? false : true })} placeholder={placeholder} onChange={(e) => setState(e.target.value)} value={state && state}/>
        </div>
    )
}

export default InputDireccion