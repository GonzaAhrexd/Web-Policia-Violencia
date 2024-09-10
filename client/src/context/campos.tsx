import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { obtenerCampo } from '../api/CRUD/campos.crud';

type CamposType = {
    juzgadoIntervinente: any;
    ocupaciones: any;
    vinculo: any;
    isLoading: boolean;
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

    useEffect(() => {
        obtenerJuzgados();
        obtenerOcupaciones();
        obtenerVinculos();
    }, []);

    return (
        <CamposContext.Provider value={{ 
            juzgadoIntervinente, 
            ocupaciones,
            vinculo,
            isLoading 
        }}>
            {children}
        </CamposContext.Provider>
    );
};