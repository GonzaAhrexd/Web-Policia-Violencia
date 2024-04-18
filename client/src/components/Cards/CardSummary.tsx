import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    title: string,
    description: string,
    usuario: any
};

export default function CardSummary({ title, description }: Props): JSX.Element {

    return (
        <div
            className="block hover:bg-neutral-900 cursor-pointer rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <NavLink to="/mis-denuncias">

            <div
                className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                {title}
            </div>
            <div className="p-6">

                <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                    Denuncia #2000
                </div>
                <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                    Denuncia #2000
                </div>
                <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                    Denuncia #2000
                </div>
                <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                    Denuncia #2000
                </div>
                <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                    Denuncia #2000
                </div>
                <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                    Ver todo
                </div>
                
            </div>
            <div
                className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                
                </div>
            </NavLink>
        </div>
    );
}