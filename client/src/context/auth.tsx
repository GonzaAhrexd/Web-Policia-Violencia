//@ts-ignore
import { createContext, ReactNode, useState, useContext } from 'react';
import { registerRequest } from '../api/auth'

type AuthContextType = {
    // Define your context properties here
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context
} 

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthContextType | null>(null)


    const signUp = async (user: any) => {
        try{
            console.log(user)
            setUser(user)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            signUp,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
};
