import { api } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IPlanning, IPlanningData } from "@/types/IPlanning";

// GET - Get all plannings
export function usePlannings() {
  return useQuery({
    queryKey: ['plannings'],
    queryFn: async () => {
      const { data } = await api.get<IPlanningData[]>('/plannings/getAll');
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// GET - Get a single planning by id
export function usePlanning(id: string) {
  return useQuery({
    queryKey: ['plannings', id],
    queryFn: async () => {
      const { data } = await api.get<IPlanningData>(`/plannings/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

// CREATE - Create a new planning
export function useCreatePlanning() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPlanning: IPlanning) => {
      const { data } = await api.post<IPlanningData>('/plannings/create', newPlanning);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plannings'] });
    },
  });
}

// UPDATE - Update an existing planning
export function useUpdatePlanning() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<IPlanning> }) => {
      const { data } = await api.put<IPlanningData>(`/plannings/update/${id}`, updates);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['plannings'] });
      queryClient.invalidateQueries({ queryKey: ['plannings', data.id] });
    },
  });
}

// DELETE - Remove a planning
export function useDeletePlanning() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/plannings/delete/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plannings'] });
    },
  });
}

// GET - Filter plannings by project
export function usePlanningsByProject(projectId: string) {
  return useQuery({
    queryKey: ['plannings', 'project', projectId],
    queryFn: async () => {
      const { data } = await api.get<IPlanningData[]>(`/plannings/project/${projectId}`);
      return data;
    },
    enabled: !!projectId,
  });
}
