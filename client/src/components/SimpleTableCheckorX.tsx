import React from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface simpleTableCheckorXProps {
    campo: string;
    datos: any;
}
function SimpleTableCheckorX({ campo, datos }: simpleTableCheckorXProps) {
    return (
        <div className="table w-full m-4 border-2 border-sky-900">
            <div className='table-row'>
                <div className="flex flex-col bg-sky-900 text-white font-medium h-10 justify-center p-3">{campo}</div>
                <div className="table-cell bg-sky-900 text-white font-medium h-10" > </div>
            </div>
            {datos.map((data:any, index:number) => (
       
                <div className="table-row" key={index}>
                    <div className="table-cell pl-4 font-medium text-xl">{data.nombre}</div>
                    {typeof data.valor !== "boolean" ?
                    <div className="table-cell pl-1">
                        {data.valor}
                    </div>
                        :                    
                    <div className="table-cell">{data.valor ?
                        <CheckIcon className='w-6' />
                        : <XMarkIcon className='w-6' />}

                    </div>
                    }
                </div>
            ))}

        </div>
    )
}

export default SimpleTableCheckorX