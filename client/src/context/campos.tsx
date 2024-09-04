import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { obtenerCampo } from '../api/CRUD/campos.crud';

type CamposType = {
    juzgadoIntervinente: any;
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

    useEffect(() => {
        obtenerJuzgados();
    }, []);

    return (
        <CamposContext.Provider value={{ 
            juzgadoIntervinente, 
            isLoading 
        }}>
            {children}
        </CamposContext.Provider>
    );
};