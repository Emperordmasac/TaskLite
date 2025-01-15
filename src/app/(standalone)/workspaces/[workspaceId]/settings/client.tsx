"use client"

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetWorkspace } from "@/features/workspaces/hooks/use-get-workspace"
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form"

import { PageError } from "@/components/globals/page-error"
import { PageLoader } from "@/components/globals/page-loader"

export const WorkspaceIdSettingsClientPage = () => {
  const workspaceId = useWorkspaceId()
  const { data, isLoading } = useGetWorkspace({ workspaceId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Workspace not found" />
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={data} />
    </div>
  )
}
