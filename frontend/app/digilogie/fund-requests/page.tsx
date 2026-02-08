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
import CountrySelector from '@/components/CountrySelector'
import FormInputText from '@/components/FormInputText'
import { Subsidiaries, SubsidiariesFormData, subsidiariesSchema } from '@/types/Subsidiaries'
import { DropdownField } from '@/components/DropdownField'
import FormSubmitButton from '@/components/FormSubmitButton'
import { useCreateSubsidiary, useDeleteSubsidiaries, useSubsidiaries, useUpdateSubsidiaries } from '@/hooks/useSubsidiaries'



export default function Page() {
  const { data: user } = useCurrentUser()
  const [visible, setVisible] = useState(false);
  const [statusForm, setStatusForm] = useState<boolean>(false);

  const [id, setId] = useState<string | null>(null)

  const toast = useRef<Toast | null>(null);

  const { mutate, isPending, isSuccess, error, reset } = useCreateSubsidiary()

  const { mutate: deleteSubsidiary, isPending: isPending_delete } = useDeleteSubsidiaries();

  const { mutate: updateSubsidiary, isPending: isPending_update, error: errorUpdate } = useUpdateSubsidiaries();

  const { data: societies } = useSociety();

  const { data: Subsidiaries, isLoading, error: error_list } = useSubsidiaries();

  console.log("data ",Subsidiaries)
  

  // React Hook Form
  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubsidiariesFormData>({
    resolver: zodResolver(subsidiariesSchema),
    defaultValues: {
      country: '',
      societyId: '',
    },
  });



  const actionButtonEdit = (data: Subsidiaries) => {
    setStatusForm(true);
    setValue('country', data?.country || "");
    setValue('societyId', data?.society.id || "");
    setId(data?.id)

    setVisible(true);

  }



  // Handle form submission
  const onSubmit = (data: SubsidiariesFormData) => {
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

  const updatingSubsidiaryMethod = (data: SubsidiariesFormData) => {
    updateSubsidiary(
      { id: id || "", updates: data },
      {
        onSuccess: () => {
          resetForm();

          toast.current?.show({
            severity: 'success',
            summary: 'Updated',
            detail: 'Subsidiary updated successfully',
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
    resetForm()
    reset()
  }


  const handleAddOpenDialog = () => {
    setVisible(true);
    setStatusForm(false);
    resetForm();
  }




  const acceptDelete = (id: string) => {
    deleteSubsidiary(id, {
      onSuccess: () => {
        toast.current?.show({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Subsidiary deleted successfully',
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

  const submitHandler = statusForm ? updatingSubsidiaryMethod : onSubmit;
  
  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Subsidiaries Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Total: {Subsidiaries?.length || 0} Subsidiaries
          </p>
        </div>
        <Button
          label={"Add New Subsidiaries"}
          icon="pi pi-plus"
          severity="success"
          onClick={handleAddOpenDialog}
          className="h-10"
          disabled={!user?.userId}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
        </div>
      )}

      {/* Error State */}
      {error_list && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 mb-4">
          Error loading Subsidiary: {error_list.message}
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
          value={Subsidiaries || []}
          scrollable
          // scrollHeight="600px"
          className="w-full"
          stripedRows
          showGridlines
          emptyMessage="No Subsidiaries found. Create your first Subsidiary !"
          scrollHeight="calc(100vh - 250px)"
        >
          <Column
            header="#"
            body={(data, options) => options.rowIndex + 1}
            style={{ width: '60px', textAlign: 'center', height: 35 }}
            frozen
            bodyStyle={{fontSize:10}}  headerStyle={{fontSize:10}} 
          />
        
          <Column
            field="nomSociete"
            header="SOCIETE"
            sortable
            style={{ minWidth: '150px', height: 35 }}
            body={(rowData) => rowData?.society?.nomSociete || '-'}
            bodyStyle={{fontSize:10}}  headerStyle={{fontSize:10}} 
          />
          <Column
            field="country"
            header="Subsidiary"
            sortable
            style={{ minWidth: '150px' }}
            bodyStyle={{fontSize:10}}  headerStyle={{fontSize:10}} 
          />
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
        header={statusForm ? "Update Subsidiaries info" : "Create New Subsidiaries"}
        visible={visible}
        style={{ width: '450px' }}
        onHide={handleDialogHide}
        modal
        draggable={false}
      >
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">
          {/* Society Name */}
          <div className="flex flex-col gap-2">
            <DropdownField
              name="societyId"
              control={control}
              options={societies || []}
              optionLabel="nomSociete"
              optionValue='id'
              placeholder="Select a society"
              errors={errors}
            />
          </div>

          <div className="flex flex-col gap-2">
            <FormInputText
              name="country"
              control={control}
              errors={errors}
              label="Country"
              placeholder="Enter country"
              disabled={isSubmitting}
            />
          </div>



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
          {isSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded text-green-700">
              <i className="pi pi-check-circle"></i>
              <span>Society created successfully!</span>
            </div>
          )}


          {isSuccess && (
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