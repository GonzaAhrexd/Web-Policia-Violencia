import React, { useEffect } from 'react'
interface props {
    register: any
    type: string
    nombre: string
    handleChange: any
    state: any
    campo: any
    id: any
    opciones: any
    defaultValue: any
}

function InputRadio({ register, nombre, type, defaultValue, handleChange, state, campo, id, opciones }: any) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {opciones.map((opcion: any, index: number) => (
                <div className="flex justify-start items-center" key={opcion.id}>
                    <div>
                        <input
                            className="border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
                            type={type}
                            onChange={handleChange}
                            id={opcion.id}
                            {...register(nombre)}
                            value={opcion.nombre}
                            defaultChecked={index === defaultValue}
                        />
                    </div>
                    <div>
                        <label htmlFor={opcion.id} className="font-medium xl:text-sm">
                            {opcion.nombre}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InputRadio