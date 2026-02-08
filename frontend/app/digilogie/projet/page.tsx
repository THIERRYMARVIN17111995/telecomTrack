'use client'

import { useCurrentUser } from '@/hooks/useAuth'
import { Society, useCreateSociety, useDeleteSociety, useSociety, useUpdateSociety } from '@/hooks/useSociety'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { watch } from 'fs'
import FormInputText from '@/components/FormInputText'
import FormSubmitButton from '@/components/FormSubmitButton'
import { Region, RegionFormData, regionsSchema } from '@/types/Regions'
import { useCreateRegion, useDeleteRegion, useRegion, useUpdateRegion } from '@/hooks/useRegions'
import { useSubsidiaries } from '@/hooks/useSubsidiaries'
import { DropdownField } from '@/components/DropdownField'
import { useCustomers } from '@/hooks/useCustomers'
import FormCalendar from '@/components/FormCalendar'
import { IProjectDto, IProjects, ProjectFormType, projectSchema } from '@/types/IProject'
import { useCreateProject, useDeleteProject, useProject, useUpdateProject } from '@/hooks/useProject'



export default function Home() {
    const { data: user } = useCurrentUser()
    const [visible, setVisible] = useState(false);
    const [statusForm, setStatusForm] = useState<boolean>(false);

    const [societyId, setSocietyId] = useState<string | null>(null)

    const toast = useRef<Toast | null>(null);

    const { mutate, isPending, isSuccess, error, reset } = useCreateProject()

    const { mutate: deleteRegion, isPending: isPending_delete } = useDeleteProject();

    const { mutate: updateRegion, isPending: isPending_update, error: errorUpdate } = useUpdateProject();

    const { data: projects, isLoading, error: error_list } = useProject();

    const { data: Customers } = useCustomers();

    console.log(projects)


    const { data: Subsidiaries } = useSubsidiaries();



    // React Hook Form
    const {
        control,
        handleSubmit,
        reset: resetForm,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormType>({
        resolver: zodResolver(projectSchema) as any,
        defaultValues: {
            name: '',
            code: '',
            customerId: '',
            subsidiaryId: '',
            startDate: undefined,
            endDate: undefined,
            status: undefined,
        },
    });



    const actionButtonEdit = (data: IProjects) => {
        setStatusForm(true);
        setValue('customerId', data?.customer?.id || "");
        setValue('name', data?.name || "");
        setValue('code', data?.code || "");
        setValue('startDate', data?.startDate);
        setValue('endDate', data?.endDate);
        setSocietyId(data?.id)
        setVisible(true);

    }




    // Handle form submission
    const onSubmit = (data: IProjectDto) => {

        if (!user?.userId) {
            alert('User not ready');
            return;
        }
        mutate(data, {
            onSuccess: () => {
                resetForm()
                setTimeout(() => {
                    setVisible(false)
                    reset()
                }, 1500)
            },
        })
    }

    const updatingProject = (data: IProjectDto) => {
        updateRegion(
            { id: societyId || "", updates: data },
            {
                onSuccess: () => {
                    resetForm();

                    toast.current?.show({
                        severity: 'success',
                        summary: 'Updated',
                        detail: 'Society updated successfully',
                        life: 3000
                    });

                    setTimeout(() => {
                        setVisible(false);
                        reset(); // reset React Query state
                    }, 1500);
                },
                onError: () => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Update failed',
                        life: 3000
                    });
                }
            }
        );
    };


    // Handle dialog close
    const handleDialogHide = () => {
        setVisible(false)
        setStatusForm(false)
        resetForm()
        reset()
    }


    const handleAddOpenDialog = () => {
        setVisible(true);
        setStatusForm(false);
        resetForm();
    }




    const acceptDelete = (id: string) => {
        deleteRegion(id, {
            onSuccess: () => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'Society deleted successfully',
                    life: 3000
                });
            },
            onError: () => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Delete failed',
                    life: 3000
                });
            }
        });
    };

    const rejectDelete = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Deletion cancelled',
            life: 2000
        });
    };


    const confirmDelete = (id: string) => {
        confirmDialog({
            message: 'Are you sure you want to delete this society?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            accept: () => acceptDelete(id),
            reject: rejectDelete
        });
    };

    const submitHandler = statusForm ? updatingProject : onSubmit;

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <ConfirmDialog />
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold">Projects Management</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Total: {projects?.length || 0} Projects
                    </p>
                </div>
                <Button
                    label={"Add New project"}
                    icon="pi pi-plus"
                    severity="success"
                    onClick={handleAddOpenDialog}
                    className="h-10"
                    disabled={!user?.userId}
                />
            </div>



            {/* Error State */}
            {error_list && (
                <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 mb-4">
                    Error loading regions: {error_list.message}
                </div>
            )}

            {isLoading && (
                <div className="flex justify-center items-center h-96">
                    <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
                </div>
            )}
            {/* DataTable */}
            {!isLoading && (
                <DataTable
                    value={projects || []}
                    scrollable
                    size="small"
                    // scrollHeight="600px"
                    className="w-full"
                    stripedRows
                    showGridlines
                    emptyMessage="No Projects found. Create your first Project!"
                    scrollHeight="calc(100vh - 250px)"
                >
                    <Column
                        header="#"
                        body={(data, options) => options.rowIndex + 1}
                        style={{ width: '60px', textAlign: 'center', height: 35 }}
                        frozen
                    />

                    <Column field="code" header="Project Code" sortable style={{ minWidth: '200px', height: 35 }} />
                    <Column field="name" header="Project Name" sortable style={{ minWidth: '200px', height: 35 }} />
                    <Column

                        header="Customer"
                        sortable
                        style={{ minWidth: '150px', height: 35 }}
                        body={(rowData) => rowData?.customer?.name || '-'}
                    />
                      <Column

                        header="Country"
                        sortable
                        style={{ minWidth: '150px', height: 35 }}
                        body={(rowData) => rowData?.subsidiary?.country || '-'}
                    />
                    <Column field="startDate" header="Start date" sortable style={{ width: 'auto', height: 35 }} />
                    <Column field="endDate" header="End date" sortable style={{ width: 'auto', height: 35 }} />

                    <Column
                        header="Actions"
                        body={(rowData) => (
                            <div className="flex gap-2">
                                <Button icon="pi pi-pencil" onClick={() => actionButtonEdit(rowData)} rounded text severity="info" tooltip="Edit" />
                                <Button icon="pi pi-trash" onClick={() => confirmDelete(rowData?.id)} rounded text severity="danger" tooltip="Delete" />
                            </div>
                        )}
                        style={{ width: '120px', textAlign: 'center', height: 35 }}
                    />
                </DataTable>
            )}

            {/* Dialog Form with React Hook Form */}
            <Dialog
                header={statusForm ? "Update Project info" : "Create New Project"}
                visible={visible}
                style={{ width: '450px' }}
                onHide={handleDialogHide}
                modal

                draggable={false}
            >

                <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label htmlFor={"customerId"} className="font-medium">
                            Customer *
                        </label>
                        <DropdownField
                            name="customerId"
                            control={control}
                            options={Customers || []}
                            optionLabel="name"
                            optionValue='id'
                            placeholder="Select a customer *"
                            errors={errors}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor={"subsidiaryId"} className="font-medium">
                            Country *
                        </label>
                        <DropdownField
                            name="subsidiaryId"
                            control={control}
                            options={Subsidiaries || []}
                            optionLabel="country"
                            optionValue='id'
                            placeholder="Select a country *"
                            errors={errors}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormInputText
                            name="code"
                            control={control}
                            errors={errors}
                            label="Project code *"
                            placeholder="Enter project code"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormInputText
                            name="name"
                            control={control}
                            errors={errors}
                            label="Project name *"
                            placeholder="Enter project name"
                            disabled={isSubmitting}
                        />
                    </div>

                    <FormCalendar
                        name="startDate"
                        control={control}
                        errors={errors}
                        label="Start Date"
                        placeholder="Select a start date"
                    />

                    <FormCalendar
                        name="endDate"
                        control={control}
                        errors={errors}
                        label="End Date"
                        placeholder="Select an end date"
                    />


                    {/* User Warning */}
                    {!user?.userId && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
                            <i className="pi pi-exclamation-triangle mr-2"></i>
                            User information is loading...
                        </div>
                    )}

                    {/* Submit Button */}
                    {!statusForm &&
                        <FormSubmitButton
                            label="Create Society"
                            loading={isPending}
                            disabled={isPending || !user?.userId}
                            severity='success'
                        />

                    }

                    {statusForm && <FormSubmitButton
                        label="Update Society"
                        loading={isPending_update}
                        disabled={isPending_update || !user?.userId}
                        severity='info'
                    />

                    }

                    {/* Success Message */}
                    {isSuccess && !statusForm && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded text-green-700">
                            <i className="pi pi-check-circle"></i>
                            <span>Society created successfully!</span>
                        </div>
                    )}


                    {isSuccess && statusForm && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded text-green-700">
                            <i className="pi pi-check-circle"></i>
                            <span>Society updated successfully!</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded text-red-700">
                            <i className="pi pi-times-circle"></i>
                            <span>{error.message}</span>
                        </div>
                    )}


                    {/* Error Message */}
                    {errorUpdate && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded text-red-700">
                            <i className="pi pi-times-circle"></i>
                            <span>{errorUpdate.message}</span>
                        </div>
                    )}
                </form>
            </Dialog>
        </div>
    )
}