
import { IProjects } from "./IProject";
import { ITeam } from "./ITeams";
import { Region } from "./Regions";
import { Subsidiaries } from "./Subsidiaries";
import { z } from 'zod';


export interface ISiteDto {
    code: string;
    name: string;
    regionId: string;
    projectId: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    siteOwner: string;
    cluster: string;
}

export interface ISites {
    id: string;
    code: string;
    name: string;
    region: Region;
    project: IProjects;
    address?: string;
    latitude?: number;
    longitude?: number;
    siteOwner: string;
    cluster: string;
}



export const planningSchema = z.object({
    projectId: z.string().min(1, 'Code is required'),
    scope: z.string().min(1, 'scope is required'),
    activityType: z.string().min(1, 'activityType is required'),
    interventionType: z.string().min(1, 'InterventionType is required'),
    siteNEId: z.coerce.number().min(1, 'Site NE is required'),
    siteFEId: z.coerce.number().optional(),
    equipeId: z.string().optional(),
    plannedDate: z.coerce.date().optional(),

});

export type planningType = z.infer<typeof planningSchema>;


export interface IPlanning {
    id?: string;
    projectId: string;
    scope: string;
    activityType: string;
    interventionType: string;
    siteNEId: string;     // ID du site NE
    siteFEId?: string;     // ID du site FE
    equipeId?: string;    // Optionnel
    plannedDate?: string; // Optionnel, format ISO ou string
}

export interface IPlanningData {
    id: string;
    projectId: IProjects;
    scope: string;
    activityType: string;
    interventionType: string;
    siteNEId: ISites;     // ID du site NE
    siteFEId?: ISites;     // ID du site FE
    equipeId?: ITeam;    // Optionnel
    plannedDate?: string; // Optionnel, format ISO ou string
}