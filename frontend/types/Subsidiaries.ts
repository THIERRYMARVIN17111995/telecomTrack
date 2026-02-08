import z from "zod"

export const subsidiariesSchema = z.object({
    societyId: z.string().uuid('Invalid society ID'),
    country: z.string().min(1, 'Society name is required').min(3, 'Society name must be at least 3 characters'),

})
export type SubsidiariesFormData = z.infer<typeof subsidiariesSchema>


interface User {
    userId: string;
    username: string;
    email: string;
}
interface Society {
    id: string
    nomSociete: string
    rccm?: string | null
    nui?: string | null
    user: User
}

export interface Subsidiaries {
    id: string;
    country: string;
    society: Society;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}


export interface SubsidiariesDto {
    country: string;
    societyId:string;
}
