import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { obtenerCampo } from '../api/CRUD/campos.crud';
import { obtenerUnidades } from '../api/CRUD/unidades.crud';
type CamposType = {
    juzgadoIntervinente: any;
    ocupaciones: any;
    vinculo: any;
    tiposDeArmas: any;
    tiposDeLugar: any;
    isLoading: boolean;
    unidades: any;
};

export const CamposContext = createContext<CamposType | undefined>(undefined);

type CamposProviderProps = {
    children: ReactNode;
};

export const useCampos = () => {
    const context = useContext(CamposContext);
    if (!context) {
        throw new Error('useCampos tiene que ser utilizado con un CamposProvider');
    }
    return context;
}

export const CamposProvider = ({ children }: CamposProviderProps) => {
    const [juzgadoIntervinente, setJuzgadoIntervinente] = useState<any>([]);
    const [ocupaciones, setOcupaciones] = useState<any>([]);
    const [vinculo, setVinculo] = useState<any>([]);
    const [tiposDeArmas, setTiposDeArmas] = useState<any>([]);
    const [tiposDeLugar, setTiposDeLugar] = useState<any>([]);
    const [unidades, setUnidades] = useState<any>([]); // Initialize with an empty array or appropriate type
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const obtenerDatos = async () => {
        setIsLoading(true);  // Activa el estado de carga al iniciar las llamadas.
        try {
            // Ejecuta todas las llamadas al mismo tiempo
            const [
                juzgadosRes,
                ocupacionesRes,
                vinculosRes,
                tiposDeArmasRes,
                tiposDeLugarRes,
                unidadesRes
            ] = await Promise.all([
                obtenerCampo("juzgadosIntervinientes"),
                obtenerCampo("ocupaciones"),
                obtenerCampo("vinculos"),
                obtenerCampo("tiposDeArmas"),
                obtenerCampo("tipoDeLugar"),
                obtenerUnidades()
            ]);
    
            // Asigna los resultados a sus respectivos estados
            setJuzgadoIntervinente(juzgadosRes);
            setOcupaciones(ocupacionesRes);
            setVinculo(vinculosRes);
            setTiposDeArmas(tiposDeArmasRes);
            setTiposDeLugar(tiposDeLugarRes);
            setUnidades(unidadesRes);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Asegura que isLoading se actualice incluso si ocurre un error.
        }
    };
    
    useEffect(() => {
        obtenerDatos();  // Ejecuta todas las llamadas cuando se monta el componente
    }, []);
    

    return (
        <CamposContext.Provider value={{ 
            juzgadoIntervinente, 
            ocupaciones,
            vinculo,
            tiposDeArmas,
            tiposDeLugar,
            unidades,
            isLoading 
        }}>
            {children}
        </CamposContext.Provider>
    );
};