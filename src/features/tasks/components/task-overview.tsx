import { Button } from "@/components/ui/button"
import { Task } from "../lib/types"
import { PencilIcon } from "lucide-react"
import { DottedSeparator } from "@/components/globals/dotted-separators"
import { OverviewProperty } from "./overview-property"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import TaskDate from "./task-date"
import { Badge } from "@/components/ui/badge"
import { snakeCaseToTitleCase } from "@/lib/utils"
import { useUpdateTaskModal } from "../hooks/use-update-task-modal"

interface TaskOverviewProps {
  task: Task
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { onOpen } = useUpdateTaskModal()

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className=" text-lg font-semibold">Overview</p>
          <Button
            onClick={() => onOpen(task.$id)}
            size="sm"
            variant="secondary"
          >
            <PencilIcon className=" size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className=" my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="tex-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  )
}
