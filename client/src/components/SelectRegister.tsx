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
}


function SelectRegister({ campo, opciones }: Props) {

    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');

    const handleUnidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUnidad(event.target.value);
        setSelectedSubunidad('');
        setSelectedSubsubunidad('');
    };

    const handleSubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubunidad(event.target.value);
        setSelectedSubsubunidad('');
    };

    const handleSubsubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubsubunidad(event.target.value);
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-col w-full'>
                <span className='ml-4 font-medium'> Unidad </span>
                <select
                    className="border open-sans border-gray-300 rounded-md h-10 w-auto my-2 m-4"
                    name="unidad"
                    value={selectedUnidad}
                    onChange={handleUnidadChange}
                >
                    <option value="">Seleccione una unidad</option>
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