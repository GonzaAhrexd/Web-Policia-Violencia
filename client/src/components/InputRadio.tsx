import React from 'react'
interface props {
    register: any
    type: string
    handleChange: any
    state: any
    campo: any
    id: any
    opciones: any

}

function InputRadio({ register, type, handleChange, state, campo, id, opciones }: any) {
    return (
        <div className="flex flex-row justify-start">
            {opciones.map((opcion: any) => (
                <>
                    <div>
                        <input
                            className="border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
                            type={type}
                            onChange={handleChange}
                            checked={state}
                            id={opcion.id}
                            {...register("radioOption")}
                        />
                    </div>
                    <div>
                        <label htmlFor={opcion.id} className="font-medium xl:text-sm">
                            {opcion.nombre}
                        </label>
                    </div>
                </>
            ))}
        </div>
    )
}

export default InputRadio