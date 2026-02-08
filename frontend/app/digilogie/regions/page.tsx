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



export default function Home() {
  const { data: user } = useCurrentUser()
  const [visible, setVisible] = useState(false);
  const [statusForm, setStatusForm] = useState<boolean>(false);

  const [societyId, setSocietyId] = useState<string | null>(null)

  const toast = useRef<Toast | null>(null);

  const { mutate, isPending, isSuccess, error, reset } = useCreateRegion()

  const { mutate: deleteRegion, isPending: isPending_delete } = useDeleteRegion();

  const { mutate: updateRegion, isPending: isPending_update, error: errorUpdate } = useUpdateRegion();

  const { data: regions, isLoading, error: error_list } = useRegion();

  console.log(regions)


  const { data: Subsidiaries } = useSubsidiaries();



  // React Hook Form
  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegionFormData>({
    resolver: zodResolver(regionsSchema),
    defaultValues: {
      name: '',
      subsidiaryId: '',
    },
  });



  const actionButtonEdit = (data: Region) => {
    setStatusForm(true);
    setValue('name', data?.name || "");
    setValue('subsidiaryId', data?.subsidiary?.id || "");
    setSocietyId(data?.id)
    setVisible(true);

  }




  // Handle form submission
  const onSubmit = (data: RegionFormData) => {

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

  const updatingSociety = (data: RegionFormData) => {
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

  const submitHandler = statusForm ? updatingSociety : onSubmit;

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Regions Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Total: {regions?.length || 0} regions
          </p>
        </div>
        <Button
          label={"Add New region"}
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
          value={regions || []}
          scrollable
          size="small"
          // scrollHeight="600px"
          className="w-full"
          stripedRows
          showGridlines
          emptyMessage="No societies found. Create your first society!"
          scrollHeight="calc(100vh - 128px)"
        >
          <Column
            header="#"
            bodyStyle={{fontSize:10}}  headerStyle={{fontSize:10}}
            body={(data, options) => options.rowIndex + 1}
            style={{ width: '60px', textAlign: 'center', height: 35 }}
            frozen
          />
          <Column

            header="Filiale"
            sortable
            style={{ minWidth: '150px', height: 35 }}
            body={(rowData) => rowData?.subsidiary?.country || '-'}
            bodyStyle={{fontSize:10}}  headerStyle={{fontSize:10}}
          />
          <Column field="name" header="Region Name" sortable bodyStyle={{fontSize:10}}  headerStyle={{fontSize:10}} style={{ minWidth: '200px', height: 35 }} />


          <Column
            header="Actions"
            bodyStyle={{fontSize:10}}  headerStyle={{fontSize:10}}
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
        header={statusForm ? "Update Society info" : "Create New Society"}
        visible={visible}
        style={{ width: '450px' }}
        onHide={handleDialogHide}
        modal

        draggable={false}
      >

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">



          <div className="flex flex-col gap-2">
            <DropdownField
              name="subsidiaryId"
              control={control}
              options={Subsidiaries || []}
              optionLabel="country"
              optionValue='id'
              placeholder="Select a society *"
              errors={errors}
            />
          </div>

          <div className="flex flex-col gap-2">
            <FormInputText
              name="name"
              control={control}
              errors={errors}
              label="Region Name"
              placeholder="Enter region name"
              disabled={isSubmitting}
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