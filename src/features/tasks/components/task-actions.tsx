import { ExternalLinkIcon, PencilIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"
import { useDeleteTask } from "../hooks/use-delete-task"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useRouter } from "next/navigation"
import { useUpdateTaskModal } from "../hooks/use-update-task-modal"

interface TaskActionProps {
  id: string
  projectId: string
  children: React.ReactNode
}

export default function TaskAction({
  id,
  projectId,
  children
}: TaskActionProps) {
  const router = useRouter()
  const workspaceId = useWorkspaceId()

  const { onOpen } = useUpdateTaskModal()

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone",
    "destructive"
  )

  const { mutate, isPending } = useDeleteTask()

  const onDelete = async () => {
    const ok = await confirm()
    if (!ok) return

    mutate({ param: { taskId: id } })
  }

  const onOpenTask = () => {
    router.push(`/dashboard/workspaces/${workspaceId}/tasks/${id}`)
  }

  const onOpenProject = () => {
    router.push(`/dashboard/workspaces/${workspaceId}/projects/${projectId}`)
  }

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[48]">
          <DropdownMenuItem
            onClick={onOpenTask}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onOpen(id)
            }}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Task
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700  font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
