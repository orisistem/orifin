import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Em um cenário real, o valor inicial viria de um token no localStorage/sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(() => {
    // Lógica de login: definir token, etc.
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    // Lógica de logout: limpar token, etc.
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
