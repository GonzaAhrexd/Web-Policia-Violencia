//@ts-ignore
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest } from '../api/auth'

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
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorsAuth, setErrors] = useState(null)
    //Registro
    const signUp = async (user: any) => {
        try{
            console.log(user.data)
            setUser(user.data)
            setIsAuthenticated(true)
        }catch(error){
            console.log(error)
        }
    }
    //Login
    const signIn = async (user: any) => {
        try{
            const res = await loginRequest(user)
            setUser(res.data);
            setIsAuthenticated(true);
            console.log(res)
        }catch(error){
            console.log(error)
            //@ts-ignore
       setErrors(error.response.data.message);
        }
    }
    
    useEffect(() =>{
        if(errorsAuth){
            const timer = setTimeout(() => {
                setErrors(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    },[errorsAuth])



    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            errorsAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};
