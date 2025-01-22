"use client"

import { useRouter } from "next/navigation"
import { RiAddCircleFill } from "react-icons/ri"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import { WorkspaceAvatar } from "./workspace-avatar"
import { useGetWorkspaces } from "@/features/workspaces/hooks/use-get-workspaces"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"

export function WorkspaceSwitcher() {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { data: workspaces } = useGetWorkspaces()

  const { onOpen } = useCreateWorkspaceModal()

  const onSelectWorkspace = (id: string) => {
    router.push(`/dashboard/workspaces/${id}`)
  }

  return (
    <div className="flex  flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={onOpen}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      <Select onValueChange={onSelectWorkspace} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent className="p-1">
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
