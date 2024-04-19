//@ts-ignore
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { registerRequest, logoutRequest, loginRequest, verifyToken, editUser } from '../api/auth'
import Cookies from 'js-cookie'

type AuthContextType = {
    // Define your context properties here
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorsAuth, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    //Registro
    const signUp = async (user: any) => {
        try {
            console.log(user.data)
            setUser(user.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
        }
    }
    //Login
    const signIn = async (user: any) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data);
            setIsAuthenticated(true);
            console.log(res)
        } catch (error) {
            console.log(error)
            //@ts-ignore
            setErrors(error.response.data.message);
        }
    }

    const logOut = async () => {
        try {
            await logoutRequest();
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.log(error)
        }
    }

    const editProfile = async (user: any) => {
        try { 
            const res = await editUser(user)
            setUser(res.data)
            console.log(res)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (errorsAuth) {
            const timer = setTimeout(() => {
                setErrors(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errorsAuth])

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
              setIsAuthenticated(false);
              setIsLoading(false);
              return;
            }
      
            try {
              const res = await verifyToken(cookies.token);
              console.log(res);
              if (!res.data) return setIsAuthenticated(false);
              setIsAuthenticated(true);
              setUser(res.data);
              setIsLoading(false);
            } catch (error) {
              setIsAuthenticated(false);
              setIsLoading(false);
            }
          };
          checkLogin();
        }, []);



    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            logOut,
            editProfile,
            user,
            isAuthenticated,
            errorsAuth,
            isLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
