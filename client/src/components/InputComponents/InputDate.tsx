
interface InputDateProps {
    campo: string;
    nombre: string;
    register: any;
    type: string;
    placeholder?: string;
    error: any;
    require?: boolean;
    valor?: string;
}

function InputDate({valor, campo, nombre, register, type, placeholder, error, require}: InputDateProps) {
  return (
        <div className={`flex flex-col w-full xl:w-1/2`}>
            <span className={`font-medium ml-4 xl:text-vw`}> {campo} {error && <span className="text-red-500"> Requerido </span>} </span>
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-16"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="date"
                {...register(nombre, { required: !require ? require : true })} defaultValue={valor} placeholder={placeholder}  />
        </div>
  )
}

export default InputDate