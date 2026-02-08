import { api } from "@/lib/axios";
import { Subsidiaries, SubsidiariesDto } from "@/types/Subsidiaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




// GET - Récupérer tous les utilisateurs
export function useSubsidiaries() {
    return useQuery({
        queryKey: ['subsidiaries'],
        queryFn: async () => {
            const { data } = await api.get<Subsidiaries[]>('/subsidiaries/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false, 
        refetchOnMount: false,
    });
}

export function useCreateSubsidiary() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: SubsidiariesDto) => {
            const { data } = await api.post<Subsidiaries>('/subsidiaries/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subsidiaries'] });
        },
    });
}


export function useDeleteSubsidiaries() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/subsidiaries/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subsidiaries'] });
        },
    });
}


export function useUpdateSubsidiaries() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<SubsidiariesDto> }) => {
            const { data } = await api.put<Subsidiaries>(`/subsidiaries/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['subsidiaries'] });
            queryClient.invalidateQueries({ queryKey: ['subsidiary', data.id] });
            console.log("Les données ", data)
        },
    });
}