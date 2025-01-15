import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"

import { WorkspaceIdJoinClientPage } from "./client"

export default async function WorkspaceIdJoinPage() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return <WorkspaceIdJoinClientPage />
}
