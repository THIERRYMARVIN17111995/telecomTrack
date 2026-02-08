import { api } from "@/lib/axios";
import { IProjectDto, IProjects } from "@/types/IProject";
import { ISiteDto, ISites } from "@/types/ISites";
import { Subsidiaries } from "@/types/Subsidiaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// GET - Récupérer tous les utilisateurs
export function useSites() {
    return useQuery({
        queryKey: ['sites'],
        queryFn: async () => {
            const { data } = await api.get<ISites[]>('/projet-sites/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}

export function useCreateSites() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: ISiteDto) => {
            const { data } = await api.post<ISites>('/sites/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sites'] });
        },
    });
}


export function useDeleteSites() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/sites/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sites'] });
        },
    });
}


export function useUpdateSites() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<ISiteDto> }) => {
            const { data } = await api.put<IProjects>(`/sites/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sites'] });
            queryClient.invalidateQueries({ queryKey: ['sites', data.id] });
            console.log("Les données ", data)
        },
    });
}

export function useSitesByProject(projectCode: string) {
  return useQuery({
    queryKey: ['sites', projectCode],
    queryFn: async () => {
      const { data } = await api.get<ISites[]>(`/projet-sites/sites/${projectCode}`);
      return data;
    },
    enabled: !!projectCode, // Ne s'exécute que si projectCode est défini
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}


export function useSitesByProjectExcluding(projectCode: string, excludedSiteId: number | string) {
  return useQuery({
    queryKey: ['sites', projectCode, 'exclude', excludedSiteId],
    queryFn: async () => {
      const { data } = await api.get<ISites[]>(`/projet-sites/sites/${projectCode}/exclude`, {
        params: { excludedSiteId },
      });
      return data;
    },
    enabled: !!projectCode && !!excludedSiteId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}