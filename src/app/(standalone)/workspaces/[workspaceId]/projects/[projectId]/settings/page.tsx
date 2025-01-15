import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"
import { ProjectIdSettingsClientPage } from "./client"

export default async function ProjectIdSettingsPage() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return <ProjectIdSettingsClientPage />
}
