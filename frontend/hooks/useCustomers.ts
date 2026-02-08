import { api } from "@/lib/axios";
import { CustomerDto, Customers } from "@/types/Customers";
import { Subsidiaries, SubsidiariesDto } from "@/types/Subsidiaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




// GET - Récupérer tous les utilisateurs
export function useCustomers() {
    return useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const { data } = await api.get<Customers[]>('/customers/list');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false, 
        refetchOnMount: false,
    });
}

export function useCreateCustomers() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: CustomerDto) => {
            const { data } = await api.post<Customers>('/customers/create', newUser);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
}


export function useDeleteCustomers() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/customers/delete/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
}


export function useUpdateCustomers() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<CustomerDto> }) => {
            const { data } = await api.put<Customers>(`/customers/update/${id}`, updates);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            queryClient.invalidateQueries({ queryKey: ['customer', data.id] });
            console.log("Les données ", data)
        },
    });
}