import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { misDenuncias } from '../../api/crud';

type Props = {
    title: string,
};

export default function CardDenunciasRecientes({  title }: Props): JSX.Element {


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
        <div
            className="block hover:bg-neutral-900 cursor-pointer rounded-lg text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-700">
            <NavLink to="/mis-denuncias">

                <div
                    className="border-b-2 px-6 py-3 border-neutral-600 text-neutral-50">
                    {title}
                </div>
                <div className="p-6">
                    {lastFiveDenuncias.length === 0 ? (
                        <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                            No tienes denuncias
                        </div>
                    ) : ( 
                        lastFiveDenuncias.map((denuncia: any, index: number) => (
                            <div key={index} className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                            { denuncia.numero_de_expediente }
                        </div>
                             ))
                    )
                            
                            }

                    <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                        Ver todo
                    </div>

                </div>
                <div
                    className="border-t-2 px-6 py-3 border-neutral-600 text-neutral-50">

                </div>
            </NavLink>
        </div>
    );
}