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
import { TabPanel, TabView } from 'primereact/tabview'
import { useRouter } from 'next/navigation'



export default function Home() {
    const { data: user } = useCurrentUser()
    const toast = useRef<Toast | null>(null);
    const router = useRouter();

    const [rowClick, setRowClick] = useState(true);

    const { data: plannings, isLoading, error: error_list } = usePlannings();

    const install = (id: string) => {
        router.push(`/digilogie/installation/add/${id}`)
    };


    return (
        <div className="p-4">
            <Toast ref={toast} />
            <ConfirmDialog />
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold">Installation Management</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Total: {plannings?.length || 0} Plannings
                    </p>
                </div>
                <Button
                    label={"Add New planning"}
                    icon="pi pi-plus"
                    severity="success"
                    onClick={() => install("12")}
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


            <TabView>
                <TabPanel header="Pending">
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
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.scope || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />

                            <Column

                                header="Site NE Code"

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.siteNE?.code || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />

                            <Column

                                header="Site Name NE "
                                sortable
                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.siteNE?.name || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />

                            <Column

                                header="Activity Type "
                                sortable
                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.activityType || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />

                            <Column

                                header="Intervention Type "

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.interventionType || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />
                            <Column

                                header="Site FE Code"

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.siteNE?.code || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />

                            <Column

                                header="Site Name FE "

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.siteNE?.name || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />
                            <Column

                                header="Region"

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.siteNE?.region?.name || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />

                            <Column

                                header="Team"

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData?.team?.name || '-'}
                                bodyStyle={{ fontSize: 10 }}
                            />


                            <Column

                                header="Date"

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => formatDateFR(rowData?.plannedDate || '-')}
                                bodyStyle={{ fontSize: 10 }}
                            />

                            <Column

                                header="Status"

                                headerStyle={{ fontSize: 10 }}
                                style={{ width: 'auto', height: 35 }}
                                body={(rowData) => rowData.status}
                                bodyStyle={{ fontSize: 10 }}
                            />


                            <Column
                                header="Actions"
                                headerStyle={{ fontSize: 10 }}
                                body={(rowData) => (
                                    <div className="flex gap-2">
                                        <Button icon="pi pi-pencil" onClick={()=>install(rowData.id)} rounded text severity="info" tooltip="Edit" />

                                    </div>
                                )}
                                style={{ width: 'auto', textAlign: 'center', height: 35 }}
                            />
                        </DataTable>
                    )}
                </TabPanel>
                <TabPanel header="In Progress">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                        ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
                <TabPanel header="Completed">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
        </div>
    )
}