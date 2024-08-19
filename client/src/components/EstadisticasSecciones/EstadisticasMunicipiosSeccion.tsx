import EstadisticasMunicipios from "../TablasEstadisticas/EstadisticasMunicipios"
import DenunciasMunicipios from "../Graficos/DenunciasMunicipios"
import { useEffect, useState } from "react";

type EstadisticasMunicipiosSeccionProps = {
  denunciasAMostrar: any;
}

function EstadisticasMunicipiosSeccion({ denunciasAMostrar }: EstadisticasMunicipiosSeccionProps) {

  const [estadisticaMunicipios, setEstadisticaMunicipios] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(denunciasAMostrar)
    const fetchDenuncias = async () => {
      if(denunciasAMostrar.length > 0){
    const estadistica = await calcularEstadisticasMunicipio(denunciasAMostrar)
    setEstadisticaMunicipios(estadistica)
      }
      setLoading(false);
    }
    fetchDenuncias()
  }, [denunciasAMostrar])


  const calcularEstadisticasMunicipio = (denuncias: any[]) => {
    const estadisticas: { [unidad_de_carga: string]: { [municipio: string]: number } } = {};
    console.log(denuncias)
    denuncias?.forEach(denuncia => {
      const { unidad_de_carga, municipio } = denuncia;

      if (!estadisticas[unidad_de_carga]) {
        estadisticas[unidad_de_carga] = {};
      }

      if (estadisticas[unidad_de_carga][municipio]) {
        estadisticas[unidad_de_carga][municipio]++;
      } else {
        estadisticas[unidad_de_carga][municipio] = 1;
      }
    });

    const totales: { [unidad_de_carga: string]: number } = {};

    for (const unidad in estadisticas) {
      totales[unidad] = Object.values(estadisticas[unidad]).reduce((acc, curr) => acc + curr, 0);
    }
    console.log(estadisticas)
    return { estadisticas, totales };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>

    <h1 className="text-2xl">Hechos registrados en las localidades de la Provincia del Chaco  {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
    <div className='flex flex-col md:flex-row justify-between'>
      <div className='flex flex-col w-9/10 md:w-4/10'>
        {Object?.entries(estadisticaMunicipios?.estadisticas).map(([unidad, municipios]) => (
          <div key={unidad}>
            <h3 className='text-xl'>{unidad} </h3>
            <div>
              <ul>
                <EstadisticasMunicipios estadisticasTotal={estadisticaMunicipios?.totales[unidad]} estadisticasUnidad={unidad} estadisticaMunicipios={municipios} />
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-10 w-full md:w-5/10'>
        <DenunciasMunicipios data={estadisticaMunicipios} total={ denunciasAMostrar?.length }/>
      </div>
    </div>
        </>

  )
}

export default EstadisticasMunicipiosSeccion