
import { useEffect, useState } from "react";
// Componentes
import EstadisticasDivision from "../TablasEstadisticas/EstadisticasDivision"
import DenunciasDivisionesComisariasTorta from "../Graficos/DenunciasDivisionesComisariasTorta";
import DenunciasDivisiones from "../Graficos/DenunciasDivisiones"
type EstadisticasMunicipiosSeccionProps = {
    denunciasAMostrar: any;
}

function EstadisticasMunicipiosSeccion({ denunciasAMostrar }: EstadisticasMunicipiosSeccionProps) {

    const [estadisticasDivisiones, setEstadisticasDivisiones] = useState<any>({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // console.log(denunciasAMostrar)
        const fetchDenuncias = async () => {
            if (denunciasAMostrar.length > 0) {
                const estadistica = await calcularEstadisticasDivision(denunciasAMostrar)
                setEstadisticasDivisiones(estadistica)
            }
            console.log(estadisticasDivisiones)
            setLoading(false);
        }
        fetchDenuncias()
    }, [denunciasAMostrar])


    const calcularEstadisticasDivision = (denuncias: any[]) => {

        const estadisticas: { [key: string]: { valor: number; isDivision: number } } = {};
        denuncias.forEach((denuncia) => {

            const division = denuncia.unidad_de_carga;
            if (!estadisticas[division]) {
                estadisticas[division] = { valor: 0, isDivision: 0 };
            }
            estadisticas[division].valor += 1;
            if (denuncia.isDivision) {
                estadisticas[division].isDivision += 1;
            }
        });

        return estadisticas;

    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>

            <h1 className="text-2xl">Hechos registrados en direcciones y divisiones del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                  <div>
                    <EstadisticasDivision estadisticasDivisiones={estadisticasDivisiones} />
                  </div>
                  <div className="text-2xl">
                    {/* @ts-ignore */}
                    De un total de { denunciasAMostrar?.length } denuncias, { Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0)  } fueron recepcionadas en las distintas divisiones de la provincia.
                  </div>
                   {/* @ts-ignore */}
                  <DenunciasDivisionesComisariasTorta comisarias={(denunciasAMostrar?.length) -  Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0) } division={Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0) }/>
                </div>
                <div className='mt-10 w-full md:w-5/10'>
                    <DenunciasDivisiones data={estadisticasDivisiones} total={ denunciasAMostrar?.length }/>
                </div>

            </div>
        </>

    )
}

export default EstadisticasMunicipiosSeccion