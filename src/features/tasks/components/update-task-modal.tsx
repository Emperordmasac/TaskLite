"use client"

import { ResponsiveModal } from "@/components/globals/responsive-modal"

import { useUpdateTaskModal } from "../hooks/use-update-task-modal"
import UpdateTaskFormWrapper from "./update-task-form-wrapper"

export const UpdateTaskModal = () => {
  const { taskId, onClose } = useUpdateTaskModal()

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <UpdateTaskFormWrapper id={taskId} onCancel={onClose} />}
    </ResponsiveModal>
  )
}
