import { IProjects } from "./IProject";
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



export const siteSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  siteOwner: z.string().min(1, 'Code is required'),
  cluster: z.string().min(1, 'Name is required'),
  regionId: z.string(),
  projectId: z.coerce.string(),
  address: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),

});

export type SiteFormType = z.infer<typeof siteSchema>;
