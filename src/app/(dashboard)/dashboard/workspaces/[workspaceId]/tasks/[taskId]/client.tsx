"use client"

import { PageError } from "@/components/globals/page-error"
import { PageLoader } from "@/components/globals/page-loader"

import { useTaskId } from "@/features/tasks/hooks/use-task-id"
import { useGetTask } from "@/features/tasks/hooks/use-get-task"
import { TaskBreadCrumbs } from "@/features/tasks/components/task-breadcrumbs"
import { DottedSeparator } from "@/components/globals/dotted-separators"
import { TaskOverview } from "@/features/tasks/components/task-overview"
import { TaskDescription } from "@/features/tasks/components/task-description"

export const TaskIdClient = () => {
  const taskId = useTaskId()
  const { data, isLoading } = useGetTask({ taskId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Task not found" />
  }

  return (
    <div className="flex flex-col">
      <TaskBreadCrumbs project={data.project} task={data} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  )
}
