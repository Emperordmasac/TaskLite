"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { RiAddCircleFill } from "react-icons/ri"

import { useGetProjects } from "@/features/projects/hooks/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { ProjectAvatar } from "@/features/projects/components/projects-avatar"
import { useCreateProjecteModal } from "@/features/projects/hooks/use-create-project-modal"

export default function Projects() {
  const pathname = usePathname()

  const workspaceId = useWorkspaceId()
  const { data } = useGetProjects({
    workspaceId
  })

  const { onOpen } = useCreateProjecteModal()

  return (
    <div className="flex  flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={onOpen}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`
        const isActive = pathname === href

        return (
          <Link key={project.$id} href={href}>
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
