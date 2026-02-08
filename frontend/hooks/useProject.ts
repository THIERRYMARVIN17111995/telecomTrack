import { api } from "@/lib/axios";
import { IProjectDto, IProjects } from "@/types/IProject";
import { Subsidiaries } from "@/types/Subsidiaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// GET - Récupérer tous les utilisateurs
export function useProject() {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await api.get<IProjects[]>('/projects/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: IProjectDto) => {
            const { data } = await api.post<IProjects>('/projects/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
}


export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/projects/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
}


export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<IProjectDto> }) => {
            const { data } = await api.put<IProjects>(`/projects/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', data.id] });
            console.log("Les données ", data)
        },
    });
}