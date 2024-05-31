// Hooks
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
    notMid?: boolean;
    notMidMD?: boolean;
    busqueda?: boolean;
}

function InputRegister({busqueda, notMidMD, notMid, campo, nombre, register, type, error, require, valor, placeholder, setValue }: InputRegisterProps) {
    placeholder ? placeholder : ''
    if (valor) {
        useEffect(() => {
            setValue(nombre, valor);
        }, [setValue, nombre, valor]);
    }
    // @ts-ignore
    function getClassName(campo, nombre, notMid, notMidMD) {
        if (campo === 'Barrio' || nombre === 'numero_de_expediente') {
            return "flex flex-col w-full xl:w-1/2";
        } else if (notMid) {
            return "flex flex-col w-full md:w-full";
        } else if (notMidMD) {
            return "flex flex-row md:w-full xl:w-1/2";
        } else if (busqueda) {
            return "flex flex-col w-full xl:w-1/2";
        } else {
            return "flex flex-col md:w-1/2";
        }
    }

    return (
        <div className={getClassName(campo, nombre, notMid, notMidMD)}>
            <span className={`font-medium ml-4 xl:text-vw`}> {nombre === "id" ? "" : campo} {error && <span className='text-red-500'>Requerido</span>} </span>
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-12"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                {...register(nombre, { required: require === false ? false : true })} placeholder={placeholder} min={0} max={(nombre=="edad_victima") || (nombre=="edad_victimario") ? "130" : "null"}/>
        </div>
    )
}

export default InputRegister