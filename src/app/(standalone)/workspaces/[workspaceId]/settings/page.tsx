import { redirect } from "next/navigation"

import { Workspace } from "@/features/workspaces/lib/types"
import { getCurrent } from "@/features/auth/server/queries"
import { getWorkspace } from "@/features/workspaces/server/queries"
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form"

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string
  }
}

export default async function WorkspaceIdSettingsPage({
  params
}: WorkspaceIdSettingsPageProps) {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  const initialValues = (await getWorkspace({
    workspaceId: params.workspaceId
  })) as Workspace

  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`)
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  )
}
