// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

interface User {
    userId: number;
    username: string;
    email: string;
}

interface CreateUserDto {
    email: string;
    username: string;
    password: string;
}

// GET - Récupérer tous les utilisateurs
export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await api.get<User[]>('/users');
            return data;
        },
    });
}

// GET - Récupérer un utilisateur par ID
export function useUser(id: number) {
    return useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const { data } = await api.get<User>(`/users/${id}`);
            return data;
        },
        enabled: !!id, // Ne lance la requête que si id existe
    });
}

// POST - Créer un utilisateur
export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: CreateUserDto) => {
            const { data } = await api.post<User>('/users/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

// PUT - Mettre à jour un utilisateur
export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: number; updates: Partial<User> }) => {
            const { data } = await api.put<User>(`/users/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['users', data.userId] });
        },
    });
}

// DELETE - Supprimer un utilisateur
export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/users/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}