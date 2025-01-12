import { useState, useCallback, useEffect } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd"

import { Task, TaskStatus } from "../lib/types"
import KanbanColumnHeader from "./kanban-column-header"
import { KanbanCard } from "./kanban-card"

interface DataKanbanProps {
  data: Task[]
  onChange: (
    tasks: {
      $id: string
      status: TaskStatus
      position: number
    }[]
  ) => void
}

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE
]

type TasksState = {
  [key in TaskStatus]: Task[]
}

export default function DataKanban({ data, onChange }: DataKanbanProps) {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: []
    }

    data.forEach((task) => {
      initialTasks[task.status].push(task)
    })

    Object.keys(initialTasks).forEach((key) => {
      initialTasks[key as TaskStatus].sort((a, b) => a.position - b.position)
    })

    return initialTasks
  })

  useEffect(() => {
    const newTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: []
    }

    data.forEach((task) => {
      newTasks[task.status].push(task)
    })

    Object.keys(newTasks).forEach((key) => {
      newTasks[key as TaskStatus].sort((a, b) => a.position - b.position)
    })

    setTasks(newTasks)
  }, [data])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return

      const { source, destination } = result
      const sourceStatus = source.droppableId as TaskStatus
      const destinationStatus = destination.droppableId as TaskStatus

      let updatesPayload: {
        $id: string
        status: TaskStatus
        position: number
      }[] = []

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks }

        // safely removed the task from the source column
        const sourceColumn = [...newTasks[sourceStatus]]
        const [movedTask] = sourceColumn.splice(source.index, 1)

        // if there's no moved task (shouldn't happen, but jusut in case), return previous task
        if (!movedTask) {
          console.error("No task found at the source index")
          return prevTasks
        }

        // create a new task object with potentially updated status
        const updatedMovedTask =
          sourceStatus !== destinationStatus
            ? { ...movedTask, status: destinationStatus }
            : movedTask

        // update the source column
        newTasks[sourceStatus] = sourceColumn

        // addd the task to the destination column
        const destinationColumn = [...newTasks[destinationStatus]]
        destinationColumn.splice(destination.index, 0, updatedMovedTask)
        newTasks[destinationStatus] = destinationColumn

        // prepare minimal update payloads
        updatesPayload = []

        // always updaye the moved task
        updatesPayload.push({
          $id: updatedMovedTask.$id,
          status: destinationStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000)
        })

        // update positions for affected tasks in the destination cloumn
        newTasks[destinationStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000)
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: destinationStatus,
                position: newPosition
              })
            }
          }
        })

        // if the task moved between columns, update positions in the source column
        if (sourceStatus !== destinationStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPostion = Math.min((index + 1) * 1000, 1_000_000)
              if (task.position !== newPostion) {
                updatesPayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPostion
                })
              }
            }
          })
        }

        return newTasks
      })

      onChange(updatesPayload)
    },
    [onChange]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-muted rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        key={task.$id}
                        draggableId={task.$id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
