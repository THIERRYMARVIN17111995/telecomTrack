import { Subsidiaries } from "./Subsidiaries";

export const ITeamType = [
    {
        name: 'Local', value: 'Local'
    },
    {
        name: 'Foreign', value: 'Foreign'
    }
]

export const ITeamRole = [
    {
        name: 'Team Leader', value: 'Team Leader'
    },
    {
        name: 'Rigger', value: 'Rigger'
    }
];

export interface TeamFormType {
    subsidiaryId: string;
    teamName: string;
    teamType: string;
    description?: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    nationality: string;
    nationalityMember:string;
    members: {
        name: string;
        role: string;
        phone: string;
        email: string;
        address: string;
        subsidiaryId: string;
        nameTeam: string;
        type: string;
        description?: string;
        nationality: string;
        nationalityMember:string;
    }[];
}

// export interface ITeam {
//     id: string;
//     subsidiary: Subsidiaries;
//     name: string;
//     type: string;
//     description: string;
// }

export interface ITeamMembers {
    id: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    nationality: string;
    team: ITeam
}

export interface ITeamMemberDto {
    name: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    subsidiaryId: string;
    nationalityTeam: string;
    nationalityMember: string;
    nameTeam: string;
    type: string;
    description?: string;
}


export interface ITeamMember {
    id: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    nationality: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

export interface ISubsidiary {
    id: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

export interface ITeam {
    id: string;
    nationality: string;
    subsidiary: ISubsidiary;
    name: string;
    type: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    members: ITeamMember[];
}
