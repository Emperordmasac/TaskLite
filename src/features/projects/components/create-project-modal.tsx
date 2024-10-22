"use client"

import { ResponsiveModal } from "@/components/globals/responsive-modal"

import { useCreateProjecteModal } from "@/features/projects/hooks/use-create-project-modal"

import { CreateProjectForm } from "./create-project-form"

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, onClose } = useCreateProjecteModal()

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={onClose} />
    </ResponsiveModal>
  )
}
