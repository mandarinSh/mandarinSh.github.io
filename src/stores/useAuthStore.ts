// stores/authStore.ts
import { User } from '@/api/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


type AuthState = {
  user: User | null;
  token: string | null;
  rememberMe: boolean;
  setAuth: (user: User, token: string, rememberMe: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => {
      // При инициализации проверяем localStorage (rememberMe) или sessionStorage
      const localAuth = localStorage.getItem('auth');
      const sessionAuth = sessionStorage.getItem('auth');
      const initialData = localAuth || sessionAuth;
      
      const initialState = initialData 
        ? (JSON.parse(initialData) as Partial<AuthState>)
        : { user: null, token: null, rememberMe: true };

      return {
        ...initialState,
        
        setAuth: (user: User, token: string, rememberMe: boolean) => {
          const newState = { user, token, rememberMe } as AuthState;
          set(newState);
          
          // localStorage для "запомнить" / sessionStorage для сессии
          if (rememberMe) {
            localStorage.setItem('auth', JSON.stringify(newState));
            sessionStorage.removeItem('auth');
          } else {
            sessionStorage.setItem('auth', JSON.stringify(newState));
            localStorage.removeItem('auth');
          }
        },
        
        clearAuth: () => {
          set({ user: null, token: null, rememberMe: true });
          localStorage.removeItem('auth');
          sessionStorage.removeItem('auth');
        },
      };
    },
    {
      name: 'auth-store',
    }
  )
);
