import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"

import { getCurrent } from "@/features/auth/server/queries"
import { getProject } from "@/features/projects/server/queries"
import { ProjectAvatar } from "@/features/projects/components/projects-avatar"
import Link from "next/link"
import { PencilIcon } from "lucide-react"

interface ProjectIdPageProps {
  params: { projectId: string }
}

export default async function ProjectIdPage({ params }: ProjectIdPageProps) {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  const initialValues = await getProject({
    projectId: params.projectId
  })

  if (!initialValues) {
    throw new Error("Project not found")
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
        <div>
          <Button asChild variant="secondary" size="sm">
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit project
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
