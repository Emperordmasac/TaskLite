import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"
import { getWorkspaces } from "@/features/workspaces/server/queries"

export default async function Home() {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  const workspaces = await getWorkspaces()
  if (workspaces.total === 0) {
    redirect(`/dashboard/workspaces/create`)
  } else {
    redirect(`/dashboard/workspaces/${workspaces.documents[0].$id}`)
  }
}
