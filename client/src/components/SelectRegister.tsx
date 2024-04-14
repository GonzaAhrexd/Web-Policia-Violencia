import React from 'react'
import { useState } from 'react';

interface Opcion {
    value: string;
    nombre: string;
    subdivisiones: Opcion[];
}

interface Props {
    campo: string;
    opciones: Opcion[];
    register: any
    setValue: any
}


function SelectRegister({ campo, opciones, register, setValue }: Props) {

    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');
    const handleUnidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedUnidad(value);
        setSelectedSubunidad('');
        setSelectedSubsubunidad('');
        // Actualiza el valor en react-hook-form
        campo == "Unidad" ? setValue('selectedUnidad', value) : setValue('jerarquia', value);
      };
      
      const handleSubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubunidad(value);
        setSelectedSubsubunidad('');
        // Actualiza el valor en react-hook-form
        setValue('selectedSubunidad', value);
      };
      
      const handleSubsubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubsubunidad(value);
        // Actualiza el valor en react-hook-form
        setValue('selectedSubsubunidad', value);
      };
    return (
        <div className='flex flex-row'>
            <div className='flex flex-col w-full'>
                <span className='ml-4 font-medium'> {campo} </span>
                <select
                    className="border open-sans border-gray-300 rounded-md h-10 w-auto my-2 m-4"
                    name={campo}
                    value={selectedUnidad}
                    onChange={handleUnidadChange}
                >
                    <option value="">Seleccione la {campo.toLowerCase()}</option>
                    {opciones.map((unidad: Opcion) => (
                        <option key={unidad.value} value={unidad.value}>
                            {unidad.nombre}
                        </option>
                    ))}
                </select>

                {selectedUnidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones && (
                    <div >
                        <select
                            className="border open-sans border-gray-300 rounded-md h-10 w-auto my-2 m-4" name="subunidad"
                            value={selectedSubunidad}
                            onChange={handleSubunidadChange}
                        >
                            <option value="">Seleccione una subunidad</option>
                            {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.map((subunidad) => (
                                <option key={subunidad.value} value={subunidad.value}>
                                    {subunidad.nombre}
                                </option>
                            ))}
                        </select>

                        {selectedSubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones && (
                            <div>
                                <select
                                    className="border open-sans border-gray-300 rounded-md h-10 w-auto my-2 m-4"name="subsubunidad"
                                    value={selectedSubsubunidad}
                                    onChange={handleSubsubunidadChange}
                                >
                                    <option value="">Seleccione una subsubunidad</option>
                                    {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.map((subsubunidad) => (
                                        <option key={subsubunidad.value} value={subsubunidad.value}>
                                            {subsubunidad.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectRegister