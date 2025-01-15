"use client"

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { JoinWorkspaceform } from "@/features/workspaces/components/join-workspace-form"
import { useGetWorkspaceInfo } from "@/features/workspaces/hooks/use-get-workspace-info"

import { PageError } from "@/components/globals/page-error"
import { PageLoader } from "@/components/globals/page-loader"

export const WorkspaceIdJoinClientPage = () => {
  const workspaceId = useWorkspaceId()
  const { data, isLoading } = useGetWorkspaceInfo({ workspaceId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Project not found" />
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceform initialValues={data.name} />
    </div>
  )
}
