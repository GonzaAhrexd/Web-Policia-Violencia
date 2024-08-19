import { useState, useEffect } from 'react';

// Texto modal
import { tiposModalidades } from '../../GlobalConst/modalTextos'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Componentes
import EstadisticasTiposDeViolenciaTabla from '../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla';
import TiposDeViolenciaTorta from '../Graficos/TiposDeViolenciaTorta'; 
type EstadisticasModalidadesProps = {
    // TODO
    handleOpenModal: any,
    setTitulo: any,
    denunciasAMostrar: any,
}


function EstadisticasModalidades({ handleOpenModal, setTitulo, denunciasAMostrar }: EstadisticasModalidadesProps) {
    const [estadisticas, setEstadisticas] = useState<{ [tipo: string]: number }>({});

    useEffect(() => {
        const calcularModalidadesDeViolencia = (denuncias: any[]) => {
            const estadisticas: { [modalidad: string]: number } = { Total: 0 };
          
            denuncias.forEach((denuncia) => {
              const modalidad = denuncia.modalidades;
              
              if (modalidad) {
                if (!estadisticas[modalidad]) {
                  estadisticas[modalidad] = 0;
                }
                estadisticas[modalidad] += 1;
                estadisticas.Total += 1;
              }
            });
          
            return estadisticas;
          };
        setEstadisticas(calcularModalidadesDeViolencia(denunciasAMostrar));
        console.log(estadisticas)
    }, [denunciasAMostrar]);

    const formatTipoViolencia = (tipo: string) => {
        return tipo;
    }
    
    return (
        <>
            <h1 className="text-2xl">Modalidades de violencia registradas en la Provincia del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
            <h2 className='flex flex-row text-xl'>Ley 26.485
                <QuestionMarkCircleIcon className="w-6 cursor-pointer" onClick={() => (
                    setTitulo("Modalidades"),
                    handleOpenModal(tiposModalidades)
                )} />
            </h2>

            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                    <EstadisticasTiposDeViolenciaTabla tipos_de_violencia={estadisticas} format={formatTipoViolencia} />
                </div>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                    <TiposDeViolenciaTorta tipos_de_violencia={estadisticas} />
                </div>
            </div>

        </>
    )
}

export default EstadisticasModalidades