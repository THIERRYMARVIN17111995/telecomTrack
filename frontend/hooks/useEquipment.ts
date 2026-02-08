import { api } from "@/lib/axios";
import { CreateEquipmentDto, Equipment } from "@/types/IEquipment";
import { IProjectDto, IProjects } from "@/types/IProject";
import { ISiteDto, ISites } from "@/types/ISites";
import { Subsidiaries } from "@/types/Subsidiaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// GET - Récupérer tous les utilisateurs
export function useEquipment() {
    return useQuery({
        queryKey: ['equipments'],
        queryFn: async () => {
            const { data } = await api.get<Equipment[]>('/equipments/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}

export function useCreateEquipment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: CreateEquipmentDto) => {
            const { data } = await api.post<Equipment>('/equipments/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipments'] });
        },
    });
}


export function useDeleteEquipment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/equipments/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipments'] });
        },
    });
}


export function useUpdateEquipment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<CreateEquipmentDto> }) => {
            const { data } = await api.put<IProjects>(`/equipments/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['equipments'] });
            queryClient.invalidateQueries({ queryKey: ['equipments', data.id] });
            console.log("Les données ", data)
        },
    });
}