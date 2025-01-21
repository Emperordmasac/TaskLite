import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"

import { ProjectIdClientPage } from "./client"

export default async function ProjectIdPage() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return <ProjectIdClientPage />
}
