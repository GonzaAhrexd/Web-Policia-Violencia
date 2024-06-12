import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Backend APIs
import { buscarVictima } from '../../api/crud';
// Componentes
import InputRegister from '../InputComponents/InputRegister';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

function BuscarExistenteModal({ setOpenModal, setVictimaCargar }) {
    const [victimasMostrar, setVictimasMostrar] = useState([]);
    const [mostrarAlerta, setMostrarAlerta] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchVictimas = async (values: any) => {
        const result = await buscarVictima(values);
        setVictimasMostrar(result);
        console.log(result);
    };

    const handleBusqueda = (values: any) => {
        console.log(values);
        fetchVictimas(values);
    };

    const onSubmit = (values: any) => {
        setVictimasMostrar([]);
        if (!values.nombre_victima && !values.apellido_victima && !values.dni_victima && !values.numero_de_expediente) {
            setMostrarAlerta("Rellene al menos un campo");
            return;
        }
        setMostrarAlerta("");
        handleBusqueda(values);
    };

    const handleVictimaExistente = (victima: any) => {
        setVictimaCargar(victima);
        setOpenModal(false);
    }

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="bg-white w-6/10 h-9/10 rounded p-5 relative overflow-auto">
                    <h2 className="text-2xl mb-4">Buscar Víctima Existente</h2>
                  
                        <XCircleIcon onClick={() => setOpenModal(false)} className="cursor-pointer h-10 rounded absolute top-0 right-0 m-2 text-black"/>
                   
                    <form
                        className="w-full flex flex-col items-center"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {mostrarAlerta && (
                            <span className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert">
                                {mostrarAlerta}
                            </span>
                        )}
                        <InputRegister busqueda={true} campo="Nombre" nombre="nombre_victima" register={register} require={false} type="text" error={errors.nombre} />
                        <InputRegister busqueda={true} campo="Apellido" nombre="apellido_victima" register={register} require={false} type="text" error={errors.apellido} />
                        <InputRegister busqueda={true} campo="DNI" nombre="dni_victima" register={register} require={false} type="text" error={errors.dni_victima} />
                        <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false} />
                        <button className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded w-3/10">Buscar</button>
                    </form>

                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Apellido</th>
                                <th className="px-4 py-2">DNI</th>
                                <th className="px-4 py-2">Número de expediente</th>
                                <th className="px-4 py-2">Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {victimasMostrar.map((victima: any, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                                    <td className="border px-4 py-2">{victima.nombre}</td>
                                    <td className="border px-4 py-2">{victima.apellido}</td>
                                    <td className="border px-4 py-2">{victima.DNI}</td>
                                    <td className="border px-4 py-2">{victima.numero_de_expediente}</td>
                                    <td className="border px-4 py-2 flex items-end justify-center">
                                        <CheckCircleIcon className="h-12 text-black font-bold cursor-pointer" onClick={() => handleVictimaExistente(victima)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default BuscarExistenteModal;
