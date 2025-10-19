import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redireciona para a página de login, mas salva a localização atual
    // para que possamos enviá-los de volta após o login.
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
