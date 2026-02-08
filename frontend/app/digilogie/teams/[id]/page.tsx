'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useAuth';
import { useSubsidiaries } from '@/hooks/useSubsidiaries';
import { DropdownField } from '@/components/DropdownField';
import { ProjectFormType, projectSchema } from '@/types/IProject';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { ITeamMemberDto, ITeamRole, ITeamType, TeamFormType } from '@/types/ITeams';
import FormInputText from '@/components/FormInputText';
import { useCreateTeam, useSelectTeam, useUpdateTeam } from '@/hooks/useTeams';
import { useParams, useRouter } from 'next/navigation';




export default function Page() {
    const { data: user } = useCurrentUser();


    // Récupérer l'ID de l'équipe depuis l'URL
    const { id } = useParams<{ id: string }>();

    // Utiliser le hook pour récupérer les données
    const { data: teamData, isLoading, isError } = useSelectTeam(id);

    console.log(teamData)



    const { data: Subsidiaries } = useSubsidiaries();

    const router = useRouter();

    const { mutate, isPending, isSuccess, error, reset: dataReset } = useUpdateTeam();

    const {
        control,
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TeamFormType>({
        defaultValues: {
            subsidiaryId: '',
            teamName: '',
            teamType: '',
            description: '',
            address: '',
            email: '',
            name: '',
            phone: '',
            role: '',
            members: [],
            nationality: '',
            nationalityMember: ''
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'members',
    });





    const addMember = () => {

        const role = watch('role');

        append({
            name: watch('name'),
            role: watch('role'),
            phone: watch('phone'),
            email: watch('email'),
            address: watch('address'),
            nameTeam: watch('teamName'),
            type: watch('teamType'),
            description: watch('description'),
            subsidiaryId: watch('subsidiaryId'),
            nationality: watch('nationality'),
            nationalityMember: watch('nationalityMember'),
        });

    };

    const onSubmit = (data: TeamFormType) => {
        const payload: ITeamMemberDto[] = data.members.map(member => ({
            name: member.name,
            role: member.role,
            phone: member.phone,
            email: member.email,
            address: member.address,
            nameTeam: data.teamName,
            type: data.teamType,
            description: data.description,
            subsidiaryId: data.subsidiaryId,
            nationalityMember: member.nationalityMember,
            nationalityTeam: member.nationality,
        }));

        mutate(
            { id, updates: payload },
            {
                onSuccess: (res) => {
                    console.log('Team updated successfully', res);
                    router.push('/digilogie/teams');
                },
                onError: (err: any) => {
                    console.error('Error updating team', err);
                    alert('Failed to update team. Please try again.');
                },
            }
        );
    };

    useEffect(() => {
        if (!teamData) return;

        const teamLeader = teamData.members.find(
            m => m.role === 'Team Leader'
        );

        reset({
            teamName: teamData.name,
            teamType: teamData.type,
            description: teamData.description || '',
            subsidiaryId: teamData.subsidiary?.id || '',

            // Infos du Team Leader
            address: teamLeader?.address || '',
            email: teamLeader?.email || '',
            name: teamLeader?.name || '',
            phone: teamLeader?.phone || '',
            role: teamLeader?.role || '',
            nationalityMember:teamLeader?.nationality || '',
            nationality: teamData.nationality || '',
            // Tous les membres (y compris le Team Leader)
            members: teamData.members.map(m => ({
                name: m.name,
                role: m.role,
                phone: m.phone,
                email: m.email,
                address: m.address,
                nationalityMember: m.nationality || '',
                nationality: m.nationality || '',
                nameTeam: teamData.name,
                type: teamData.type,
                description: teamData.description,
                subsidiaryId: teamData.subsidiary?.id,
            })),
        });
    }, [teamData, reset]);



    // useEffect(() => {
    //     if (teamData) {
    //         const data=teamData.members.filter(m => m.role === 'Team Leader')[0];
    //         reset({
    //             teamName: teamData.name,
    //             teamType: teamData.type,
    //             description: teamData.description || '',
    //             subsidiaryId: teamData.subsidiary?.id || '',
    //             address:data?.address, // si tu as un champ address au niveau équipe
    //             email:data?.email,   // idem
    //             name: data?.name,    // idem
    //             phone:data?.phone,   // idem
    //             role:data?.role,    // idem
    //             nationality: teamData.nationality || '', // si tu as ce champ
    //             members: teamData.members.map(m => ({
    //                 name: m.name,
    //                 role: m.role,
    //                 phone: m.phone,
    //                 email: m.email,
    //                 address: m.address,
    //                 nationalityMember: m.nationality || '',
    //                 nationality: m.nationality || '',
    //                 nameTeam: teamData.name,
    //                 type: teamData.type,
    //                 description: teamData.description,
    //                 subsidiaryId: teamData.subsidiary?.id,
    //             })),
    //         });
    //     }
    // }, [teamData, reset]);
    return (
        <div className=" p-4">
            <h2 className="text-xl font-bold mb-6">Team Edition</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* LEFT SIDE – FORM */}
                    <div className="space-y-4 border rounded p-4">
                        <h3 className="font-semibold">Team Information </h3>
                        <FormInputText
                            name="teamName"
                            control={control}
                            errors={errors}
                            placeholder="Team Name *"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <DropdownField
                                name="subsidiaryId"
                                control={control}
                                options={Subsidiaries || []}
                                optionLabel="country"
                                optionValue="id"
                                placeholder="Select a subsidiary *"
                                errors={errors}
                            />

                            <DropdownField
                                name="teamType"
                                control={control}
                                options={ITeamType}
                                optionLabel="name"
                                optionValue="value"
                                placeholder="Team Type *"
                                errors={errors}
                            />
                        </div>
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormInputText
                                name="nationality"
                                control={control}
                                errors={errors}
                                placeholder="Nationality *"
                            /> 
                          
                        </div> */}




                        <textarea
                            {...register('description')}
                            placeholder="Description (optional)"
                            className="w-full border p-2 rounded"
                        />

                        <h3 className="font-semibold mt-4">Add Member</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInputText
                                name="name"
                                control={control}
                                errors={errors}
                                label=""
                                placeholder="Member name *"
                                disabled={isSubmitting}

                            />

                            <FormInputText
                                name="nationalityMember"
                                control={control}
                                errors={errors}
                                placeholder="Nationality *"
                            />

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <DropdownField
                                name="role"
                                control={control}
                                options={ITeamRole || []}
                                optionLabel="name"
                                optionValue='value'
                                placeholder="Select a team role *"
                                errors={errors}
                            />

                            <FormInputText
                                name="phone"
                                control={control}
                                errors={errors}
                                label=""
                                placeholder="Contact (Phone ) *"
                                disabled={isSubmitting}

                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInputText
                                name="email"
                                control={control}
                                errors={errors}
                                label=""
                                placeholder="Contact (Email) *"
                                disabled={isSubmitting}

                            />

                            <FormInputText
                                name="address"
                                control={control}
                                errors={errors}
                                label=""
                                placeholder="Address *"
                                disabled={isSubmitting}

                            />
                        </div>




                        <button
                            type="button"
                            onClick={addMember}
                            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                        >
                            Add Member
                        </button>
                    </div>

                    {/* RIGHT SIDE – MEMBERS LIST */}
                    <div className="border rounded p-4">
                        <h3 className="font-semibold mb-3">Team Members</h3>

                        {fields.length === 0 ? (
                            <p className="text-gray-500 text-sm">No members added yet</p>
                        ) : (
                            <ul className="space-y-2">
                                {fields.map((field, index) => (
                                    <li
                                        key={field.id}
                                        className="flex justify-between items-start border rounded p-2 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium">{field.name}</p>
                                            <p className="text-gray-600">
                                                {field.role} — {field.phone} — {field.email}
                                            </p>
                                            {field.address && <p className="text-gray-500">{field.address}</p>}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-600 text-sm ml-4"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}



                    </div>

                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded w-full mt-6"
                >
                    Save Team
                </button>
            </form>
        </div>

    );
}
