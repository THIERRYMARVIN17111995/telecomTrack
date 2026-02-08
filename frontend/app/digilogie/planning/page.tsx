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
import { ISiteDto, ISites, SiteFormType, siteSchema } from '@/types/ISites'
import { useCreateSites, useDeleteSites, useSites, useSitesByProject, useSitesByProjectExcluding, useUpdateSites } from '@/hooks/useSite'
import { ActivityType, InterventionType, Scope } from '@/types/IApplication'
import RHFCustomCalendar from '@/components/RHFCustomCalendar'
import { IPlanning, planningSchema, planningType } from '@/types/IPlanning'
import { useTeams } from '@/hooks/useTeams'
import { useCreatePlanning, useDeletePlanning, usePlannings, useUpdatePlanning } from '@/hooks/usePlanning'
import { formatDateFR } from '@/utils/formatDateFR'



export default function Home() {
    const { data: user } = useCurrentUser()
    const [visible, setVisible] = useState(false);
    const [statusForm, setStatusForm] = useState<boolean>(false);

    const [societyId, setSocietyId] = useState<string | null>(null);

    const [filteredSites, setFilteredSites] = useState<ISiteDto[]>([]);

    const toast = useRef<Toast | null>(null);

    const { data: sites } = useSites();

    const { data: Regions } = useRegion();

    const { data: teams } = useTeams();

    const { data: projects } = useProject();



    const { data: plannings, isLoading, error: error_list } = usePlannings();
    console.log(plannings)

    const { mutate, isPending, isSuccess, error, reset } = useCreatePlanning();

    const { mutate: updatePlanning, isPending: isPending_update, error: errorUpdate } = useUpdatePlanning();

    const { mutate: deletePlanning } = useDeletePlanning();




    const {
        control,
        handleSubmit,
        reset: resetForm,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<planningType>({
        resolver: zodResolver(planningSchema) as any,
        defaultValues: {
            activityType: '',
            equipeId: '',
            interventionType: '',
            plannedDate: new Date(),
            projectId: '',
            scope: '',
            siteFEId: 0,
            siteNEId: 0,

        },
    });

    const projectId = watch('projectId')
    const selectedSiteNEId = watch('siteNEId');

    const { data: allSites, isLoading: loadingSites } = useSitesByProject(projectId);

    // Hook pour les sites FE, en excluant le site NE déjà sélectionné
    const { data: filteredSitesFE, isLoading: loadingFiltered } = useSitesByProjectExcluding(
        projectId,
        selectedSiteNEId || 0
    );


    const actionButtonEdit = (data: IProjects) => {
        setStatusForm(true);
        // setValue('customerId', data?.customer?.id || "");
        // setValue('name', data?.name || "");
        // setValue('code', data?.code || "");
        // setValue('startDate', data?.startDate);
        // setValue('endDate', data?.endDate);
        setSocietyId(data?.id)
        setVisible(true);

    }





    const onSubmit = (data: IPlanning) => {
        console.log(data)
        if (!user?.userId) {
            alert('User not ready');
            return;
        }
        mutate(data, {
            onSuccess: () => {
                resetForm()
                setTimeout(() => {
                    // setVisible(false)
                    // reset()
                }, 1500)
            },
        })
    }

    const updatingSites = (data: IPlanning) => {
        updatePlanning(
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
                        // reset(); // reset React Query state
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
        // reset()
    }


    const handleAddOpenDialog = () => {
        setVisible(true);
        setStatusForm(false);
        resetForm();
    }




    const acceptDelete = (id: string) => {
        deletePlanning(id, {
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

    const submitHandler = statusForm ? updatingSites : onSubmit;




    return (
        <div className="p-4">
            <Toast ref={toast} />
            <ConfirmDialog />
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold">Planning Management</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Total: {plannings?.length || 0} Plannings
                    </p>
                </div>
                <Button
                    label={"Add New planning"}
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
                    value={plannings || []}
                    scrollable
                    size="small"
                    className="w-full custom-datatable"
                    stripedRows
                    showGridlines
                    paginator rows={20} rowsPerPageOptions={[5, 10, 25, 50]}
                    emptyMessage="No Projects found. Create your first Site!"
                    scrollHeight="calc(100vh - 200px)"

                >
                    <Column
                        header="#"
                        body={(data, options) => options.rowIndex + 1}
                        style={{ width: '60px', textAlign: 'center', }}
                        frozen
                    />

                    <Column
                        header="Project code"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ minWidth: '100px', height: 35 }}
                        body={(rowData) => rowData?.project?.code || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />

                    <Column
                        header="Scope"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ width:'auto', height: 35 }}
                        body={(rowData) => rowData?.scope || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />

                    <Column

                        header="Site NE Code"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{  width:'auto', height: 35 }}
                        body={(rowData) => rowData?.siteNE?.code || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />

                    <Column

                        header="Site Name NE "
                        sortable
                        headerStyle={{ fontSize: 10 }}
                        style={{  width:'auto', height: 35 }}
                        body={(rowData) => rowData?.siteNE?.name || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />

                    <Column

                        header="Activity Type "
                        sortable
                        headerStyle={{ fontSize: 10 }}
                        style={{  width:'auto', height: 35 }}
                        body={(rowData) => rowData?.activityType || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />

                    <Column

                        header="Intervention Type "
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ width:'auto', height: 35 }}
                        body={(rowData) => rowData?.interventionType || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />
                    <Column

                        header="Site FE Code"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{  width:'auto', height: 35 }}
                        body={(rowData) => rowData?.siteNE?.code || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />

                    <Column

                        header="Site Name FE "
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ width:'auto', height: 35 }}
                        body={(rowData) => rowData?.siteNE?.name || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />
                    <Column

                        header="Region"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ width:'auto', height: 35 }}
                        body={(rowData) => rowData?.siteNE?.region?.name || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />

                    <Column

                        header="Team"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ width:'auto', height: 35 }}
                        body={(rowData) => rowData?.team?.name || '-'}
                        bodyStyle={{ fontSize: 10 }}
                    />


                    <Column

                        header="Date"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ width:'auto', height: 35 }}
                        body={(rowData) => formatDateFR(rowData?.plannedDate || '-')}
                        bodyStyle={{ fontSize: 10 }}
                    />

                      <Column

                        header="Status"
                        
                        headerStyle={{ fontSize: 10 }}
                        style={{ width:'auto', height: 35 }}
                        body={(rowData) => rowData.status}
                        bodyStyle={{ fontSize: 10 }}
                    />


                    <Column
                        header="Actions"
                        headerStyle={{ fontSize: 10 }}
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

            <Dialog
                header={statusForm ? "Update planning info" : "Create New Planning"}
                visible={visible}
                style={{ width: '900px', maxWidth: '95vw' }}
                onHide={handleDialogHide}
                modal
                draggable={false}
                className="planning-dialog"
            >
                <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6 p-4">

                    {/* Section 1: Informations de base */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                            <i className="pi pi-info-circle"></i>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="projectId" className="font-medium text-gray-700">
                                    Project <span className="text-red-500">* {projectId}</span>
                                </label>
                                <DropdownField
                                    name="projectId"
                                    control={control}
                                    options={projects || []}
                                    optionLabel="name"
                                    optionValue="code"
                                    placeholder="Select a project"
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="scopeId" className="font-medium text-gray-700">
                                    Scope <span className="text-red-500">*</span>
                                </label>
                                <DropdownField
                                    name="scope"
                                    control={control}
                                    options={Scope || []}
                                    optionLabel="name"
                                    optionValue="code"
                                    placeholder="Select a scope"
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="activityTypeId" className="font-medium text-gray-700">
                                    Activity Type <span className="text-red-500">*</span>
                                </label>
                                <DropdownField
                                    name="activityType"
                                    control={control}
                                    options={ActivityType || []}
                                    optionLabel="name"
                                    optionValue="code"
                                    placeholder="Select activity type"
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Détails de l'intervention */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center gap-2">
                            <i className="pi pi-wrench"></i>
                            Intervention Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="interventionTypeId" className="font-medium text-gray-700">
                                    Intervention Type <span className="text-red-500">*</span>
                                </label>
                                <DropdownField
                                    name="interventionType"
                                    control={control}
                                    options={InterventionType || []}
                                    optionLabel="name"
                                    optionValue="code"
                                    placeholder="Select intervention type"
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="siteNEId" className="font-medium text-gray-700">
                                    Site NE <span className="text-red-500">*</span>
                                </label>
                                <DropdownField
                                    name="siteNEId"
                                    control={control}
                                    options={allSites || []}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Select Site NE"
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="siteFEId" className="font-medium text-gray-700">
                                    Site FE <span className="text-red-500">*</span>
                                </label>
                                <DropdownField
                                    name="siteFEId"
                                    control={control}
                                    options={filteredSitesFE || []}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Select Site FE"
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Planning */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold mb-4 text-green-700 flex items-center gap-2">
                            <i className="pi pi-calendar"></i>
                            Planning
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="equipeId" className="font-medium text-gray-700">
                                    Team <span className="text-red-500">*</span>
                                </label>
                                <DropdownField
                                    name="equipeId"
                                    control={control}
                                    options={teams || []}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Select a team"
                                    errors={errors}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="date" className="font-medium text-gray-700">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <RHFCustomCalendar
                                    name="plannedDate"
                                    control={control}
                                    label=""
                                    rules={{ required: "Planned Date is required" }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* User Warning */}
                    {!user?.userId && (
                        <div className="flex items-center gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-800">
                            <i className="pi pi-exclamation-triangle text-xl"></i>
                            <span className="font-medium">User information is loading...</span>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-2">


                        {!statusForm ? (
                            <FormSubmitButton
                                label="Create Planning"
                                icon="pi pi-check"
                                loading={isPending}
                                disabled={isPending || !user?.userId}
                                severity="success"
                            />
                        ) : (
                            <FormSubmitButton
                                label="Update Planning"
                                icon="pi pi-save"
                                loading={isPending_update}
                                disabled={isPending_update || !user?.userId}
                                severity="info"
                            />
                        )}
                    </div>

                    {/* Success Messages */}
                    {isSuccess && !statusForm && (
                        <div className="flex items-center gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-800 animate-fade-in">
                            <i className="pi pi-check-circle text-xl"></i>
                            <span className="font-medium">Planning created successfully!</span>
                        </div>
                    )}

                    {isSuccess && statusForm && (
                        <div className="flex items-center gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-800 animate-fade-in">
                            <i className="pi pi-check-circle text-xl"></i>
                            <span className="font-medium">Planning updated successfully!</span>
                        </div>
                    )}

                    {/* Error Messages */}
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-800">
                            <i className="pi pi-times-circle text-xl"></i>
                            <span className="font-medium">{error.message}</span>
                        </div>
                    )}

                    {errorUpdate && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-800">
                            <i className="pi pi-times-circle text-xl"></i>
                            <span className="font-medium">{errorUpdate.message}</span>
                        </div>
                    )}
                </form>
            </Dialog>
        </div>
    )
}