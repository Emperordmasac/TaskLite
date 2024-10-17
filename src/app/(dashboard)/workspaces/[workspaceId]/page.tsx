import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"

export default async function WorkspaceIdPage() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return <div>Workspace Id page</div>
}
