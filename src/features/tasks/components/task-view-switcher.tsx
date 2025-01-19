"use client"

import { useQueryState } from "nuqs"
import { Loader, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/globals/dotted-separators"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useGetTasks } from "@/features/tasks/hooks/use-get-tasks"
import DataFilters from "@/features/tasks/components/data-filters"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal"
import { useTaskFilters } from "../hooks/use-task-filters"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import DataKanban from "./data-kanban"
import { useCallback } from "react"
import { TaskStatus } from "../lib/types"
import { useBulkUpdateTask } from "../hooks/use-bulk-update-task"
import { DataCalendar } from "./data-calendar"
import { useProjectId } from "@/features/projects/hooks/use-project-id"

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean
}

export default function TaskViewSwitcher({
  hideProjectFilter
}: TaskViewSwitcherProps) {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table"
  })
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters()

  const workspaceId = useWorkspaceId()
  const paramProjectId = useProjectId()

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    status,
    assigneeId,
    projectId: paramProjectId || projectId,
    dueDate
  })
  const { onOpen } = useCreateTaskModal()
  const { mutate: bulkUpdate } = useBulkUpdateTask()

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks }
      })
    },
    [bulkUpdate]
  )

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button onClick={onOpen} className="w-full lg:w-auto" size="sm">
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.populatedTasks ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.populatedTasks || []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <DataCalendar data={tasks?.populatedTasks || []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
