import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"
import { getWorkspaceInfo } from "@/features/workspaces/server/queries"
import { JoinWorkspaceform } from "@/features/workspaces/components/join-workspace-form"

interface WorkspaceIdJoinPageProps {
  params: {
    workspaceId: string
  }
}

export default async function WorkspaceIdJoinPage({
  params
}: WorkspaceIdJoinPageProps) {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId
  })

  if (!initialValues) {
    redirect(`/`)
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceform initialValues={initialValues.name} />
    </div>
  )
}
