import { api } from "@/lib/axios";
import { IProjectDto, IProjects } from "@/types/IProject";
import { ITeam, ITeamMemberDto, ITeamMembers } from "@/types/ITeams";
import { Subsidiaries } from "@/types/Subsidiaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// GET - Récupérer tous les utilisateurs
export function useTeams() {
    return useQuery({
        queryKey: ['team_member'],
        queryFn: async () => {
            const { data } = await api.get<ITeam[]>('/team-member/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}


export function useSelectTeam(id: string) {
  return useQuery({
    queryKey: ['team_member', id],
    queryFn: async () => {
      const { data } = await api.get<ITeam>(`/team-member/selectById/${id}`); // ITeam et non ITeam[]
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}



export function useCreateTeam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: ITeamMemberDto[]) => {
            const { data } = await api.post<ITeam>('/team-member/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team_member'] });
        },
    });
}


export function useDeleteTeam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/team-member/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team_member'] });
        },
    });
}


export function useUpdateTeam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<ITeamMemberDto[]> }) => {
            const { data } = await api.put<ITeam>(`/team-member/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['team_member'] });
            queryClient.invalidateQueries({ queryKey: ['team_member', data.id] });
            console.log("Les données ", data)
        },
    });
}