import { api } from "@/lib/axios";
import { Subsidiaries } from "@/types/Subsidiaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





interface Region {
    id:string;
    name: string
    subsidiary: Subsidiaries | undefined
}

interface RegionDto {
    name: string
    subsidiaryId:String;
}


// GET - Récupérer tous les utilisateurs
export function useRegion() {
    return useQuery({
        queryKey: ['regions'],
        queryFn: async () => {
            const { data } = await api.get<Region[]>('/regions/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}

export function useCreateRegion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: RegionDto) => {
            const { data } = await api.post<Region>('/regions/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regions'] });
        },
    });
}


export function useDeleteRegion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/regions/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regions'] });
        },
    });
}


export function useUpdateRegion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<RegionDto> }) => {
            const { data } = await api.put<Region>(`/regions/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['regions'] });
            queryClient.invalidateQueries({ queryKey: ['regions', data.id] });
            console.log("Les données ", data)
        },
    });
}