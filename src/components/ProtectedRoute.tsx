import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // localStorage'dan da kontrol et (state güncellenmemiş olabilir)
  const token = localStorage.getItem('accessToken');
  const userData = localStorage.getItem('user');
  const hasLocalStorageAuth = token && userData && 
    userData !== 'undefined' && 
    userData !== 'null' && 
    userData.trim() !== '' &&
    userData.startsWith('{'); // JSON objesi olduğunu kontrol et

  return (isAuthenticated || hasLocalStorageAuth) ? <>{children}</> : <Navigate to="/login" />;
};