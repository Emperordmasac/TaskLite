import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/server/queries"
import { SignInCard } from "@/features/auth/components/sign-in-card"

export default async function SignInPage() {
  const user = await getCurrent()

  if (user) redirect("/dashboard")

  return <SignInCard />
}
