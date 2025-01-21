"use client"

import Link from "next/link"
import { PencilIcon } from "lucide-react"

import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { useGetProject } from "@/features/projects/hooks/use-get-project"
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher"
import { ProjectAvatar } from "@/features/projects/components/projects-avatar"

import { Button } from "@/components/ui/button"
import { PageError } from "@/components/globals/page-error"
import { PageLoader } from "@/components/globals/page-loader"
import { useGetProjectAnalytics } from "@/features/projects/hooks/use-get-project-analytics"
import { Analytics } from "@/components/analytics"

export const ProjectIdClientPage = () => {
  const projectId = useProjectId()

  const { data: project, isLoading: isProjectLoading } = useGetProject({
    projectId
  })
  const { data: analytics, isLoading: isAnalyticsLoading } =
    useGetProjectAnalytics({ projectId })

  if (isProjectLoading || isAnalyticsLoading) {
    return <PageLoader />
  }

  if (!project) {
    return <PageError message="Project not found" />
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button asChild variant="secondary" size="sm">
            <Link
              href={`/dashboard/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit project
            </Link>
          </Button>
        </div>
      </div>
      {analytics && <Analytics data={analytics} />}
      <TaskViewSwitcher hideProjectFilter />
    </div>
  )
}
