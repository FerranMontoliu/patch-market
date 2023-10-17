import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setLogin: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLogin = (value: boolean) => {
    setIsLoggedIn(value);
  };

  useEffect(() => {
    // This code will run every time isLoggedIn is updated
  }, [isLoggedIn]);


  return (
    <AuthContext.Provider value={{ isLoggedIn, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
}
