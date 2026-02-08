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

// Validation Schema
const societySchema = z.object({
  nomSociete: z.string().min(1, 'Society name is required').min(3, 'Society name must be at least 3 characters'),
  rccm: z.string().optional(),
  nui: z.string().optional(),
  userId: z.string().uuid('Invalid user ID'),
})

type SocietyFormData = z.infer<typeof societySchema>

export default function Page() {
  const { data: user } = useCurrentUser()
  const [visible, setVisible] = useState(false);
  const [statusForm, setStatusForm] = useState<boolean>(false);

  const [societyId,setSocietyId]=useState<string | null>(null)

  const toast = useRef<Toast | null>(null);

  const { mutate, isPending, isSuccess, error, reset } = useCreateSociety()

  const { mutate: deleteSociety, isPending: isPending_delete } = useDeleteSociety();

   const { mutate: updateSociety, isPending: isPending_update,error:errorUpdate } = useUpdateSociety();

  const { data: societies, isLoading, error: error_list } = useSociety()

  // React Hook Form
  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SocietyFormData>({
    resolver: zodResolver(societySchema),
    defaultValues: {
      nomSociete: '',
      rccm: '',
      nui: '',
      userId: '',
    },
  });



  const actionButtonEdit = (data: Society) => {
    setStatusForm(true);
    setValue('nomSociete', data?.nomSociete || "");
    setValue('rccm', data?.rccm || "");
    setValue('nui', data?.nui || "");
    setValue('userId', data?.user.userId);
    setSocietyId(data?.id)
    alert(data.id)
    setVisible(true);

  }

  // Set userId when user loads
  useEffect(() => {
    if (user?.userId) {
      setValue('userId', user.userId)
    }
  }, [user, setValue])

  // Handle form submission
  const onSubmit = (data: SocietyFormData) => {
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

 const updatingSociety = (data: SocietyFormData) => {
    updateSociety(
        { id : societyId || "", updates:data },
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
    resetForm()
    reset()
  }


  const handleAddOpenDialog = () => {
    setVisible(true);
    setStatusForm(false);
    resetForm();
  }




  const acceptDelete = (id: string) => {
    deleteSociety(id, {
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


  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Subsidiaries Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Total: {societies?.length || 0} Subsidiaries
          </p>
        </div>
        <Button
          label={"Add New Society"}
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
          Error loading societies: {error_list.message}
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
          value={societies || []}
          scrollable
          // scrollHeight="600px"
          className="w-full"
          stripedRows
          showGridlines
          emptyMessage="No societies found. Create your first society!"
          scrollHeight="calc(100vh - 250px)"
        >
          <Column
            header="#"
            body={(data, options) => options.rowIndex + 1}
            style={{ width: '60px', textAlign: 'center', height: 35 }}
            frozen
          />
          <Column field="nomSociete" header="Society Name" sortable style={{ minWidth: '200px', height: 35 }} />
          <Column
            field="rccm"
            header="RCCM"
            sortable
            style={{ minWidth: '150px', height: 35 }}
            body={(rowData) => rowData.rccm || '-'}
          />
          <Column
            field="nui"
            header="NUI"
            sortable
            style={{ minWidth: '150px' }}
            body={(rowData) => rowData.nui || '-'}
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
        header={statusForm ? "Update Society info" : "Create New Society"}
        visible={visible}
        style={{ width: '450px' }}
        onHide={handleDialogHide}
        modal
        draggable={false}
      >
        <form onSubmit={statusForm ?  handleSubmit(updatingSociety) : handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Society Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nomSociete" className="font-semibold">
              Society Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="nomSociete"
              control={control}
              render={({ field }) => (
                <InputText
                  id="nomSociete"
                  placeholder="Enter society name"
                  className={`w-full ${errors.nomSociete ? 'p-invalid' : ''}`}
                  disabled={isPending}
                  {...field}
                />
              )}
            />
            {errors.nomSociete && (
              <small className="text-red-500">{errors.nomSociete.message}</small>
            )}
          </div>

          {/* RCCM */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rccm" className="font-semibold">
              RCCM
            </label>
            <Controller
              name="rccm"
              control={control}
              render={({ field }) => (
                <InputText
                  id="rccm"
                  placeholder="Enter RCCM"
                  className={`w-full ${errors.rccm ? 'p-invalid' : ''}`}
                  disabled={isPending}
                  {...field}
                />
              )}
            />
            {errors.rccm && <small className="text-red-500">{errors.rccm.message}</small>}
          </div>

          {/* NUI */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nui" className="font-semibold">
              NUI
            </label>
            <Controller
              name="nui"
              control={control}
              render={({ field }) => (
                <InputText
                  id="nui"
                  placeholder="Enter NUI"
                  className={`w-full ${errors.nui ? 'p-invalid' : ''}`}
                  disabled={isPending}
                  {...field}
                />
              )}
            />
            {errors.nui && <small className="text-red-500">{errors.nui.message}</small>}
          </div>

          {/* User Warning */}
          {!user?.userId && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
              <i className="pi pi-exclamation-triangle mr-2"></i>
              User information is loading...
            </div>
          )}

          {/* Submit Button */}
          {!statusForm && <Button
            type="submit"
            label={isPending ? 'Creating...' : 'Create Society'}
            icon={isPending ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
            disabled={isPending || !user?.userId}
            className="w-full mt-2"
            severity="success"
          />}

          {statusForm && <Button
            type="submit"
            label={isPending_update ? 'Updating...' : 'Update Society'}
            icon={isPending_update ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
            disabled={isPending || !user?.userId}
            className="w-full mt-2"
            severity="success"
          />}

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