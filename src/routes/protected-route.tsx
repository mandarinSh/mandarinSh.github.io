import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

export const ProtectedRoute = () => {
  const { user, token } = useAuthStore();
  

  // Проверяем наличие и user и token
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
