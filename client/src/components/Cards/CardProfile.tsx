import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    title: string,
    description: string,
    usuario: any
};

export default function CardProfile({ title, description, usuario }: Props): JSX.Element {

    const diasDesde = (fecha: Date): number => {
        fecha = new Date(fecha)
        let hoy = new Date();
        //@ts-ignore
        return Math.ceil((hoy - fecha) / (1000 * 60 * 60 * 24));
    }
    return (
        <div
            className="block hover:bg-neutral-900 cursor-pointer rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <NavLink to="/mi-perfil">

            <div
                className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                {title}
            </div>
            <div className="p-6">
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {usuario?.nombre + ' ' + usuario?.apellido}
                </h5>
                <p className="text-base text-neutral-600 dark:text-neutral-200">
                    Teléfono: {usuario?.telefono}
                </p>
                <p className=" text-base text-neutral-600 dark:text-neutral-200">
                    Jerarquía: {usuario?.jerarquia}
                </p>
                <p className=" text-base text-neutral-600 dark:text-neutral-200">
                    Unidad: {usuario?.unidad}
                </p>
                <div className="flex w-full">
                </div>
            </div>
            <div
                className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                {diasDesde(usuario?.createdAt) + " días de servicio"}
            </div>
            </NavLink>
        </div>
    );
}