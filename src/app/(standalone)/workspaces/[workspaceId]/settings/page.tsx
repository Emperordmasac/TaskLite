import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"

import { WorkspaceIdSettingsClientPage } from "./client"

export default async function WorkspaceIdSettingsPage() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return <WorkspaceIdSettingsClientPage />
}
