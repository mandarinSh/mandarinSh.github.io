import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { login, User } from '@/api/auth';

interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async ({ 
      username, 
      password, 
      rememberMe 
    }: LoginCredentials) => {
      const { data } = await login(username, password);
      return {
        user: data as User,
        token: data.accessToken as string,
        rememberMe
      };
    },
    onSuccess: ({ user, token, rememberMe }) => {
      // Теперь все данные деструктурированы из результата mutationFn
      setAuth(user, token, rememberMe);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};
