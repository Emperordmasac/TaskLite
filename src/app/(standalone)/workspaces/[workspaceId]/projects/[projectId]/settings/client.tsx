"use client"

import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { useGetProject } from "@/features/projects/hooks/use-get-project"
import { EditProjectForm } from "@/features/projects/components/edit-project-form"

import { PageError } from "@/components/globals/page-error"
import { PageLoader } from "@/components/globals/page-loader"

export const ProjectIdSettingsClientPage = () => {
  const projectId = useProjectId()
  const { data, isLoading } = useGetProject({ projectId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Project not found" />
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={data} />
    </div>
  )
}
