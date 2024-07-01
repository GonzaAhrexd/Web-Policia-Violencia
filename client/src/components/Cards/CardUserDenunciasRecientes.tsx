// Hooks
import { useState, useEffect } from 'react';
// BACKEND 
import { misDenuncias } from '../../api/crud';

import { NavLink } from 'react-router-dom';
function CardUserDenunciasRecientes() {


    const [lastFiveDenuncias, setLastFiveDenuncias] = useState([]);
    useEffect(() => {
        const fetchDenuncias = async () => {
            let values = [{ desde: "no_ingresado" }, { hasta: "no_ingresado" }, { numero_de_expediente: "no_ingresado" }]
            const result = await misDenuncias(values);
            const lastFiveDenuncias = result.slice(Math.max(result.length - 5, 0)).reverse();
            setLastFiveDenuncias(lastFiveDenuncias);
        };

        fetchDenuncias();
    }, []);

    return (
        <div className="flex flex-col justify-around bg-white shadow-lg rounded-lg md:w-2/10 p-4">
            <h2 className="text-lg font-medium">Denuncias Recientes</h2>
            {lastFiveDenuncias.length === 0 ? (
                <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                    No tienes denuncias
                </div>
            ) : (
                lastFiveDenuncias.map((denuncia: any, index: number) => (
                    <div key={index} className='w-full text-black border rounded-lg mb-2'>
                        {denuncia.numero_de_expediente}
                    </div>
                ))
            )
            }
            <NavLink to="/mis-denuncias">
            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full flex items-center justify-center mt-2 md:mt-0' >
                Ver todo
            </div>
            </NavLink>
        </div>

    )
}

export default CardUserDenunciasRecientes