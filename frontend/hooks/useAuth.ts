// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface LoginDto {
  username: string;
  password: string;
}

interface AuthResult {
  accessToken: string;
  username: string;
  userId: number;
}

interface User {
  userId: string;
  username: string;
  email: string;
}

// Login
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginDto) => {
      console.log(credentials)
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.accessToken);
      }
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

// Logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.clear(); // Nettoie tout le cache
    },
  });
}

// Get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const { data } = await api.get<User>('/auth/me');
      return data;
    },
    retry: false,
  });
}