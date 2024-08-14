// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Componentes
import NavBar from '../../components/NavBar'
import InputDateRange from '../../components/InputComponents/InputDateRange';
import EstadisticasMunicipiosSeccion from '../../components/EstadisticasSecciones/EstadisticasMunicipiosSeccion';
// API
import { buscarDenuncias } from '../../api/crud';


function index() {

    const { user, isAuthenticated, isLoading } = useAuth();
    const { register, setValue, handleSubmit, formState: {

    } } = useForm()

    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const [estadisticaMunicipios, setEstadisticaMunicipios] = useState<any>({});
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenuncias(values);
            setDenunciasAMostrar(result)
            const nuevasEstadisticas = calcularEstadisticasMunicipio(result);
            setEstadisticaMunicipios(nuevasEstadisticas);
        }
        fetchDenuncias();
        console.log(denunciasAMostrar)
    }

    const calcularEstadisticasMunicipio = (denuncias: any[]) => {
        const estadisticas: { [unidad_de_carga: string]: { [municipio: string]: number } } = {};

        denuncias.forEach(denuncia => {
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
        return { estadisticas, totales };
    };




    if (isLoading) return <h1>Cargando...</h1>
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    if (user?.rol === "sin_definir") return <Navigate to="/login" replace />
    return (
        <>
            <NavBar user={user} />
            <div className='h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Estadísticas</h1>
                <form className="w-full flex flex-col items-center"
                    onSubmit={
                        handleSubmit(async (values) => {
                            console.log(values.desde)
                            console.log(values.hasta)
                            handleBusqueda(values)
                        }
                        )}>
                    <InputDateRange register={register} setValue={setValue} isRequired={true} />
                    <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
                </form>

                {denunciasAMostrar.length > 0 &&
                    <EstadisticasMunicipiosSeccion denunciasAMostrar={denunciasAMostrar} estadisticaMunicipios={estadisticaMunicipios} />
                }

            </div>


        </>
    )
}

export default index