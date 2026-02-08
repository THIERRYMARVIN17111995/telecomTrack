import z from "zod";

export type EquipmentCategory =
    | 'RADIO'
    | 'MICROWAVE'
    | 'POWER'
    | 'CABLE'
    | 'CIVIL';


export const EQUIPMENT_CATEGORIES = [
    { name: 'RADIO', value: 'RADIO' },
    { name: 'MICROWAVE', value: 'MICROWAVE' },
    { name: 'POWER', value: 'POWER' },
    { name: 'CABLE', value: 'CABLE' },
    { name: 'CIVIL', value: 'CIVIL' },
];


export const EQUIPMENT_UNITS = [
    { name: 'PCS', value: 'PCS' },
    { name: 'SET', value: 'SET' },
    { name: 'METER', value: 'METER' },
    { name: 'KM', value: 'KM' },
    { name: 'UNIT', value: 'UNIT' },
];
export interface Equipment {
    id: string;
    name: string;
    model?: string;
    vendor: string;
    category: EquipmentCategory;
    unit: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}


export interface CreateEquipmentDto {
    name: string;
    model?: string;
    vendor: string;
    category: string;
    unit: string;
}

export const EquipmentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    model: z.string().optional(),
    vendor: z.string().min(1, 'Vendor is required'),
    category: z.string().min(1, 'Category is required'),
    unit: z.string().min(1, 'Unit is required'),
});

export type CreateEquipment = z.infer<typeof EquipmentSchema>;