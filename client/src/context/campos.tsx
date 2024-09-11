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
    

    const obtenerJuzgados = async () => {
        try {
            const res = await obtenerCampo("juzgadosIntervinientes");
            setJuzgadoIntervinente(res);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Esto asegura que isLoading siempre se actualiza, incluso si hay un error.
        }
    };

    const obtenerOcupaciones = async () => {
        try {
            const res = await obtenerCampo("ocupaciones");
            setOcupaciones(res);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Esto asegura que isLoading siempre se actualiza, incluso si hay un error.
        }
    }

    const obtenerVinculos = async () => {
        try {
            const res = await obtenerCampo("vinculos");
            setVinculo(res);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Esto asegura que isLoading siempre se actualiza, incluso si hay un error.
        }
    }

    const obtenerTiposDeArmas = async () => {
        try {
            const res = await obtenerCampo("tiposDeArmas");
            setTiposDeArmas(res);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Esto asegura que isLoading siempre se actualiza, incluso si hay un error.
        }
    }

    const obtenerTiposDeLugar = async () => {
        try {
            const res = await obtenerCampo("tipoDeLugar");
            setTiposDeLugar(res);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Esto asegura que isLoading siempre se actualiza, incluso si hay un error.
        }
    }

    const obtenerUnidadesPoliciales = async () => {
        try {
            const res = await obtenerUnidades();
            setUnidades(res);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Esto asegura que isLoading siempre se actualiza, incluso si hay un error.
        }
    }

    useEffect(() => {
        obtenerJuzgados();
        obtenerOcupaciones();
        obtenerVinculos();
        obtenerTiposDeArmas();
        obtenerTiposDeLugar();
        obtenerUnidadesPoliciales();
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