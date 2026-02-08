import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
    userId: string;
    username: string;
    email: string;
}

export interface Society {
    id: string
    nomSociete: string
    rccm?: string | null
    nui?: string | null
    user: User
}

interface SocietyDto {
    nomSociete: string
    rccm?: string | undefined
    nui?: string | undefined
    user: User | undefined
}


// GET - Récupérer tous les utilisateurs
export function useSociety() {
    return useQuery({
        queryKey: ['society'],
        queryFn: async () => {
            const { data } = await api.get<Society[]>('/society/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false, 
        refetchOnMount: false,
    });
}

export function useCreateSociety() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: SocietyDto) => {
            const { data } = await api.post<User>('/society/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['society'] });
        },
    });
}


export function useDeleteSociety() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/society/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['society'] });
        },
    });
}


export function useUpdateSociety() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<SocietyDto> }) => {
            const { data } = await api.put<Society>(`/society/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['society'] });
            queryClient.invalidateQueries({ queryKey: ['society', data.id] });
            console.log("Les données ", data)
        },
    });
}