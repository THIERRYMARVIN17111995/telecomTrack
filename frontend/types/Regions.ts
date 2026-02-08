import z from "zod"
import { Subsidiaries } from "./Subsidiaries";

// Validation Schema
export const regionsSchema = z.object({
  name: z.string().min(1, 'Region name is required').min(3, 'Region name must be at least 3 characters'),
  subsidiaryId: z.string(),
})

export type RegionFormData = z.infer<typeof regionsSchema>

export interface Region {
    id:string;
    name: string
    subsidiary: Subsidiaries | undefined
}