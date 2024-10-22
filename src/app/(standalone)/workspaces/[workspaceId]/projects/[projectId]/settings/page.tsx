import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"
import { getProject } from "@/features/projects/server/queries"
import { EditProjectForm } from "@/features/projects/components/edit-project-form"

interface ProjectIdSettingsPageProps {
  params: {
    projectId: string
  }
}

export default async function ProjectIdSettingsPage({
  params
}: ProjectIdSettingsPageProps) {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  const initialValues = await getProject({
    projectId: params.projectId
  })

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  )
}
