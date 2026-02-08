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
import { CustomerDto, CustomerFormType, Customers, customerSchema } from '@/types/Customers'
import { useCreateCustomers, useCustomers, useDeleteCustomers, useUpdateCustomers } from '@/hooks/useCustomers'



export default function Page() {
  const { data: user } = useCurrentUser()
  const [visible, setVisible] = useState(false);
  const [statusForm, setStatusForm] = useState<boolean>(false);

  const [id, setId] = useState<string | null>(null)

  const toast = useRef<Toast | null>(null);

  const { mutate, isPending, isSuccess, error, } = useCreateCustomers()

  const { mutate: deleteCustomer, isPending: isPending_delete } = useDeleteCustomers();

  const { mutate: updateCustomer, isPending: isPending_update, error: errorUpdate } = useUpdateCustomers();


  const { data: Customers, isLoading, error: error_list } = useCustomers();




  // React Hook Form
  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      country: '',
      rccm: '',
      nui: '',
      siren: '',
      ein: '',
      taxId: '',
      address: '',
      phone: '',
      email: '',
    },
  });



  const actionButtonEdit = (data: Customers) => {
    setStatusForm(true);
    setValue('country', data?.country || "");
    setValue('name', data?.name || "");
    setValue('rccm', data?.rccm || "");
    setValue('nui', data?.nui || "");
    setValue('siren', data?.siren || "");
    setValue('ein', data?.ein || "");
    setValue('taxId', data?.taxId || "");
    setValue('address', data?.address || "");
    setValue('phone', data?.phone || "");
    setValue('email', data?.email || "");
    setId(data?.id || "")

    setVisible(true);

  }



  // Handle form submission
  const onSubmit = (data: CustomerDto) => {
    mutate(data, {
      onSuccess: () => {
        resetForm()
        setTimeout(() => {
          setVisible(false)

        }, 1500)
      },
    })
  }

  const updatingCustomer = (data: CustomerDto) => {
    updateCustomer(
      { id: id || "", updates: data },
      {
        onSuccess: () => {
          // resetForm();

          toast.current?.show({
            severity: 'success',
            summary: 'Updated',
            detail: 'Subsidiary updated successfully',
            life: 3000
          });

          setTimeout(() => {
            setVisible(false);

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

  }


  const handleAddOpenDialog = () => {
    setVisible(true);
    setStatusForm(false);
    // resetForm();
  }




  const acceptDelete = (id: string) => {
    deleteCustomer(id, {
      onSuccess: () => {
        toast.current?.show({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Customer deleted successfully',
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

  const submitHandler = statusForm ? updatingCustomer : onSubmit;

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Customers Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Total: {Customers?.length || 0} Customers
          </p>
        </div>
        <Button
          label={"Add New Customers"}
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
          Error loading Customers: {error_list.message}
        </div>
      )}

      {/* DataTable */}
      {!isLoading && (
        <DataTable
          value={Customers || []}
          scrollable
          // scrollHeight="600px"
          className="w-full"
          stripedRows
          showGridlines
          emptyMessage="No Customers found. Create your first Customer !"
          scrollHeight="calc(100vh - 250px)"
        >
          <Column
            header="#"
            body={(data, options) => options.rowIndex + 1}
            style={{ width: '60px', textAlign: 'center', height: 35 }}
            frozen
            bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }}
          />

          <Column
            field="name"
            header="Customer"
            sortable
            style={{ minWidth: '150px', height: 35 }}
            bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }}
          />
          <Column
            field="country"
            header="Country"
            sortable
            style={{ minWidth: '150px' }}
            bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            style={{ minWidth: '150px' }}
            bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            style={{ minWidth: '150px' }}
            bodyStyle={{ fontSize: 10 }} headerStyle={{ fontSize: 10 }}
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
        header={statusForm ? "Update Customer info" : "Create New Customer"}
        visible={visible}
        style={{ width: 'auto' }}
        onHide={handleDialogHide}
        modal
        draggable={false}
      >
        <form
          onSubmit={handleSubmit(submitHandler)}

        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'name', label: 'Name *' },
              { name: 'country', label: 'Country *' },
              { name: 'rccm', label: 'RCCM' },
              { name: 'nui', label: 'NUI' },
              { name: 'siren', label: 'SIREN' },
              { name: 'ein', label: 'EIN' },
              { name: 'taxId', label: 'Tax ID' },
              { name: 'address', label: 'Address' },
              { name: 'phone', label: 'Phone *' },
              { name: 'email', label: 'Email *', type: 'email' },
            ].map((field) => (
              <div key={field.name} className="flex flex-row gap-1">
                <FormInputText
                  name={field.name}
                  control={control}
                  errors={errors}
                  label={field.label}
                  placeholder={"Enter " + field.label}
                  disabled={isSubmitting}
                />
              </div>
            ))}
          </div>

          <div className='mt-8'>
            {!statusForm &&
              <FormSubmitButton
                label="Create customer"
                loading={isPending}
                disabled={isPending || !user?.userId}
                severity='success'
              />

            }

            {statusForm && <FormSubmitButton
              label="Update customer"
              loading={isPending_update}
              disabled={isPending_update || !user?.userId}
              severity='info'
            />}
          </div>

        </form>
      </Dialog>
    </div>
  )
}