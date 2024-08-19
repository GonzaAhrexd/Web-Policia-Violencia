import { useEffect, useState } from 'react'

import EstadisticasMedidasCautelaresTabla from './../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'

type EstadisticasMedidasCautelaresProps = {
  denunciasAMostrar: any
}

function EstadisticasMedidasCautelares({ denunciasAMostrar }: EstadisticasMedidasCautelaresProps) {

  const [estadisticas, setEstadisticas] = useState<{ [tipo: string]: number }>({});

  const tipoViolenciaMapping: { [key: string]: string } = {
    prohibicion_de_acercamiento: 'Prohibición de Acercamiento',
    exclusion_de_hogar: 'Exclusión de Hogar',
    alimento_provisorio: 'Alimento Provisorio',
    boton_antipanico: 'Botón Antipánico',
    derecho_de_comunicacion: 'Derecho de Comunicación',
    restitucion_de_menor: 'Restitución de Menor',
  };
  useEffect(() => {
    const calcularTiposDeViolencia = (denuncias: any[]) => {
      const estadisticas: { [tipo: string]: number } = { Total: 0 };

      // Necesito que me cuente todas las mediads cautelares que están cargadas en denunciasAMostrar.medida y que cuente por cada uno que esté en true 
      // y me devuelva un objeto con la cantidad de cada una de las medidas cautelares que están en true

      denuncias.forEach((denuncia) => {
        const medidas = denuncia.medida;
        const medidasActivas = [];

        for (const medida in medidas) {
          if (medidas[medida]) {
            medidasActivas.push(medida);
          }
        }

        medidasActivas.forEach((medida) => {
          if (!estadisticas[medida]) {
            estadisticas[medida] = 0;
          }
          estadisticas[medida] += 1;
        });

        estadisticas.Total += 1;
      });

      return estadisticas;
    };
    setEstadisticas(calcularTiposDeViolencia(denunciasAMostrar));
    console.log(estadisticas)
  }, [denunciasAMostrar]);

  const formatTipoViolencia = (tipo: string) => {
    return tipo.split(' + ').map(t => tipoViolenciaMapping[t] || t).join(' + ');
  }

  return (
    <>
      <h1 className="text-2xl">Medidas solicitadas en la Provincia del Chaco  {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-9/10 md:w-4/10'>
          <EstadisticasMedidasCautelaresTabla tipos_de_violencia={estadisticas} format={formatTipoViolencia} />
        </div>
      </div>
    </>
  )
}

export default EstadisticasMedidasCautelares