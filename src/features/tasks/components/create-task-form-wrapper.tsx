import { Loader } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useGetMembers } from "@/features/members/hooks/use-get-members"
import { useGetProjects } from "@/features/projects/hooks/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { CreateTaskForm } from "./create-task-form"

interface CreateTaskFormWrapperProps {
  onCancel: () => void
}

export default function CreateTaskFormWrapper({
  onCancel
}: CreateTaskFormWrapperProps) {
  const workspaceId = useWorkspaceId()

  const { data: projects, isLoading: isLoadingProjectss } = useGetProjects({
    workspaceId
  })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId
  })

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl
  }))

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name
  }))

  const isLoading = isLoadingMembers || isLoadingProjectss

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <CreateTaskForm
      onCancel={onCancel}
      membersOptions={memberOptions ?? []}
      projectOptions={projectOptions ?? []}
    />
  )
}
