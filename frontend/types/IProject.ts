import { Customers } from "./Customers";


import { z } from 'zod';
import { Subsidiaries } from "./Subsidiaries";





export enum ProjectStatus {
    PLANNED = 'PLANNED',        // Projet créé, pas encore démarré
    IN_PROGRESS = 'IN_PROGRESS', // Travaux en cours
    ON_HOLD = 'ON_HOLD',        // Bloqué (logistique, client, EHS...)
    COMPLETED = 'COMPLETED',    // Travaux terminés (QC OK)
    ACCEPTED = 'ACCEPTED',      // Accepté par le client
    CLOSED = 'CLOSED',          // Projet clôturé (facturation OK)
    CANCELLED = 'CANCELLED',    // Annulé
}


export const projectSchema = z.object({
    code: z
        .string()
        .min(3, 'Code must be at least 3 characters')
        .max(50, 'Code must be at most 50 characters'),

    name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(150, 'Name must be at most 150 characters'),

    customerId: z.string(),

    subsidiaryId:z.string(),

    startDate: z
        .preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),

    endDate: z
        .preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),

    status: z
        .enum(Object.values(ProjectStatus) as [ProjectStatus, ...ProjectStatus[]])
        .optional(),
});

export type ProjectFormType = z.infer<typeof projectSchema>;


export interface IProjectDto {
    code: string;
    name: string;
    customerId: string;
    startDate?: Date;
    endDate?: Date;
    status?: ProjectStatus;
    subsidiaryId:string;
}

export interface IProjects {
    id: string;
    code: string;
    name: string;
    customer: Customers | undefined;
    startDate?: Date;
    endDate?: Date;
    status?: ProjectStatus;
    subsidiaries:Subsidiaries
}