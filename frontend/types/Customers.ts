import * as z from 'zod';

export const customerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    country: z.string().min(1, 'Country is required'),
    rccm: z.string().optional(),
    nui: z.string().optional(),
    siren: z.string().optional(),
    ein: z.string().optional(),
    taxId: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
});

export type CustomerFormType = z.infer<typeof customerSchema>;



export interface Customers {
    id: string;
    name: string;
    country: string;
    rccm?: string;
    nui?: string;
    siren?: string;
    ein?: string;
    taxId?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export interface CustomerDto {
    name: string;
    country: string;
    rccm?: string;
    nui?: string;
    siren?: string;
    ein?: string;
    taxId?: string;
    address?: string;
    phone?: string;
    email?: string;
}
