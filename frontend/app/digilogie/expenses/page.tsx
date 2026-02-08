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
import { useCreateEquipment, useDeleteEquipment, useEquipment, useUpdateEquipment } from '@/hooks/useEquipment'
import { CreateEquipment, CreateEquipmentDto, Equipment, EQUIPMENT_CATEGORIES, EQUIPMENT_UNITS, EquipmentSchema } from '@/types/IEquipment'



export default function Home() {
    const { data: user } = useCurrentUser()
    const [visible, setVisible] = useState(false);
    const [statusForm, setStatusForm] = useState<boolean>(false);

    const [societyId, setSocietyId] = useState<string | null>(null)

    const toast = useRef<Toast | null>(null);

    const { mutate, isPending, isSuccess, error, reset } = useCreateEquipment()

    const { mutate: deleteEquipment, isPending: isPending_delete } = useDeleteEquipment();

    const { mutate: updateEquipment, isPending: isPending_update, error: errorUpdate } = useUpdateEquipment();

    const { data: equipments, isLoading, error: error_list } = useEquipment();

    const { data: Customers } = useCustomers();

    console.log(equipments)


    const { data: Subsidiaries } = useSubsidiaries();



    // React Hook Form
    const {
        control,
        handleSubmit,
        reset: resetForm,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<CreateEquipment>({
        resolver: zodResolver(EquipmentSchema) as any,
        defaultValues: {
            name: '',
            category: '',
            model: '',
            unit: '',
            vendor: ''
        },
    });



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




    // Handle form submission
    const onSubmit = (data: CreateEquipmentDto) => {

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

    const updatingEquipment = (data: CreateEquipmentDto) => {
        updateEquipment(
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
        deleteEquipment(id, {
            onSuccess: () => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'Equipment deleted successfully',
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

    const submitHandler = statusForm ? updatingEquipment : onSubmit;

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <ConfirmDialog />
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold">Equipments Management</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Total: {equipments?.length || 0} Equipments
                    </p>
                </div>
                <Button
                    label={"Add New equipment"}
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
                    value={equipments || []}
                    scrollable
                    size="small"
                    // scrollHeight="600px"
                    className="w-full"
                    stripedRows
                    showGridlines
                    emptyMessage="No Projects found. Create your first Project!"
                    scrollHeight="calc(100vh - 200px)"
                >
                    <Column
                        header="#"
                        body={(data, options) => options.rowIndex + 1}
                        style={{ width: '60px', textAlign: 'center', height: 35 }}
                        frozen
                    />

                    <Column field="name"  bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }} header="Name" sortable style={{ width: 'auto', height: 35 }} />
                    <Column field="model"  bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }} header="Model" sortable style={{ width: 'auto', height: 35 }} />
                    <Column field="vendor"  bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }} header="Vendor" sortable style={{ width: 'auto', height: 35 }} />
                    <Column field="category"  bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }} header="Category" sortable style={{ width: 'auto', height: 35 }} />
                    <Column field="unit"  bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }} header="Unit" sortable style={{ width: 'auto', height: 35 }} />



                    <Column field="createdAt"  bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }} header="createdAt" sortable style={{ width: 'auto', height: 35 }} />
                    <Column field="updatedAt"  bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }} header="updatedAt" sortable style={{ width: 'auto', height: 35 }} />

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

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>


                    <div className="flex flex-col gap-2">
                        <FormInputText
                            name="name"
                            control={control}
                            errors={errors}
                            label="Name *"
                            placeholder="Enter equipment name * "
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormInputText
                            name="model"
                            control={control}
                            errors={errors}
                            label="Model *"
                            placeholder="Enter equipment Model * "
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <FormInputText
                            name="vendor"
                            control={control}
                            errors={errors}
                            label="vendor *"
                            placeholder="Enter equipment vendor"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor={"category"} className="font-medium">
                            Catégorie *
                        </label>
                        <DropdownField
                            name="category"
                            control={control}
                            options={EQUIPMENT_CATEGORIES || []}
                            optionLabel="name"
                            optionValue='value'
                            placeholder="Select a category *"
                            errors={errors}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor={"subsidiaryId"} className="font-medium">
                            Unit *
                        </label>
                        <DropdownField
                            name="unit"
                            control={control}
                            options={EQUIPMENT_UNITS || []}
                            optionLabel="name"
                            optionValue='value'
                            placeholder="Select an unit *"
                            errors={errors}
                        />
                    </div>





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
                            label="Create equipment"
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
                            <span>Equipment created successfully!</span>
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