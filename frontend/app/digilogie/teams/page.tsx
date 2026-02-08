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
import { ISiteDto, SiteFormType, siteSchema } from '@/types/ISites'
import { useCreateSites, useDeleteSites, useSites, useUpdateSites } from '@/hooks/useSite'
import Link from 'next/link'
import { useDeleteTeam, useTeams } from '@/hooks/useTeams'
import { ITeam } from '@/types/ITeams'
import { useRouter } from 'next/navigation'



export default function Home() {
  const { data: user } = useCurrentUser()

  const toast = useRef<Toast | null>(null);

  const { mutate: deleteTeam, isPending: isPending_delete } = useDeleteTeam();

  const { data: teams, isLoading, error: error_list } = useTeams();

  const router = useRouter();







  const actionButtonEdit = (id: string) => {

    router.push(`/digilogie/teams/${id}`);
  }



  const acceptDelete = (id: string) => {
    deleteTeam(id, {
      onSuccess: () => {
        toast.current?.show({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Team deleted successfully',
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
          <h2 className="text-2xl font-bold">Teams Management</h2>
          <p className="text-gray-600 text-sm mt-1">
            Total: {teams?.length || 0} Teams
          </p>
        </div>
        <Link href={'/digilogie/teams/add'}>
          <Button
            label={"Add New team"}
            icon="pi pi-plus"
            severity="success"
            className="h-10"
            disabled={!user?.userId}
          />
        </Link>
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
          value={teams || []}
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

            header="Team Name"

            headerStyle={{ fontSize: 10 }}
            style={{ minWidth: '80px', height: 35 }}
            body={(rowData) => rowData?.name || '-'}
            bodyStyle={{ fontSize: 10 }}
          />

          <Column

            header="Type"

            headerStyle={{ fontSize: 10 }}
            style={{ minWidth: '150px', height: 35 }}
            body={(rowData) => rowData?.type || '-'}
            bodyStyle={{ fontSize: 10 }}
          />

          <Column
            header="Team Leader"
            headerStyle={{ fontSize: 10 }}
            style={{ minWidth: '150px', height: 35 }}
            body={(rowData: ITeam) => {
              const teamLeader = rowData.members.find(member => member.role === 'Team Leader');
              return teamLeader ? teamLeader.name : '-';
            }}
            bodyStyle={{ fontSize: 10 }}
          />

          <Column
            header="Nationality"
            headerStyle={{ fontSize: 10 }}
            style={{ minWidth: '150px', height: 35 }}
            body={(rowData: ITeam) => {
              const teamLeader = rowData.members.find(member => member.role === 'Team Leader');
              return teamLeader ? teamLeader.nationality : '-';
            }}
            bodyStyle={{ fontSize: 10 }}
          />



          <Column
            header="Members"
            headerStyle={{ fontSize: 10 }}
            style={{ minWidth: '150px', height: 35 }}
            body={(team: ITeam) => {
              if (!team.members || team.members.length === 0) return '-';

              // Exclure le Team Leader
              const membersWithoutLeader = team.members.filter(m => m.role !== 'Team Leader');
              if (membersWithoutLeader.length === 0) return '-';

              const maxDisplay = 10; // Nombre de membres à afficher directement
              const displayMembers = membersWithoutLeader.slice(0, maxDisplay).map(m => `${m.name} (${m.role})`);
              const remaining = membersWithoutLeader.length - maxDisplay;

              return (
                <span title={membersWithoutLeader.map(m => `${m.name} (${m.role})`).join(', ')}>
                  {displayMembers.join(', ')}
                  {remaining > 0 ? ` ... et ${remaining} autre(s)` : ''}
                </span>
              );
            }}
            bodyStyle={{ fontSize: 10 }}
          />


          <Column

            header="Subsidiary"

            headerStyle={{ fontSize: 10 }}
            style={{ minWidth: '80px', height: 35 }}
            body={(rowData) => rowData?.subsidiary?.country || '-'}
            bodyStyle={{ fontSize: 10 }}
          />



          <Column
            header="Actions"
            headerStyle={{ fontSize: 10 }}
            body={(rowData: ITeam) => (

              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  onClick={() => actionButtonEdit(rowData.id)}
                  rounded
                  text
                  severity="info"
                  tooltip="Edit"
                />
                <Button
                  icon="pi pi-trash"
                  onClick={() => confirmDelete(rowData?.id)}
                  rounded
                  text
                  severity="danger"
                  tooltip="Delete"
                />

              </div>

            )}
          />

        </DataTable>
      )}

    </div>
  )
}