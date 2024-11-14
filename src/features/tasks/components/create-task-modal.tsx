"use client"

import { ResponsiveModal } from "@/components/globals/responsive-modal"

import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal"
import CreateTaskFormWrapper from "./create-task-form-wrapper"

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, onClose } = useCreateTaskModal()

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={onClose} />
    </ResponsiveModal>
  )
}
