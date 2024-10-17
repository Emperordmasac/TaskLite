"use client"

import { ResponsiveModal } from "@/components/globals/responsive-modal"

import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"

import { CreateWorkspaceForm } from "./create-workspace-form"

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, onClose } = useCreateWorkspaceModal()

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={onClose} />
    </ResponsiveModal>
  )
}
