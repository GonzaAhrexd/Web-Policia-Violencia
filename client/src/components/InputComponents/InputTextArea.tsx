// Hooks
import { useEffect } from 'react'

// Props
interface InputRegisterProps {
    campo: string;
    nombre: string;
    register?: any;
    type: string;
    variante?: any;
    valor?: any;
    placeholder?: string;
    setValue?: any;
}

function InputTextArea({ campo, nombre, register, type, variante, valor, placeholder, setValue }: InputRegisterProps) {
    // Si no se recibe un placeholder, se setea como string vacío
    placeholder ? placeholder : ''
    // Si se recibe un valor, se setea en el formulario directamente con setValue
    if (valor) {
        useEffect(() => {
            setValue(nombre, valor);
        }, [setValue, nombre, valor]);
    }
    return (
        <div className={`flex flex-col ${variante!="edit" ? 'w-full md:w-6/10' : "w-full h-56"} `}>
            <span className={`font-medium ml-4 `}> {campo} </span>
            <textarea className="border open-sans pl-4 py-5 resize-none text-lg border-gray-300 rounded-md w-full h-56 "type={type}
                {...register(nombre, { required: true })} placeholder={placeholder} />
        </div>
    )
}
export default InputTextArea