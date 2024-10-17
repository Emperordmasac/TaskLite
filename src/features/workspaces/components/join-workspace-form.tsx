"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/globals/dotted-separators"

import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useJoinWorkspace } from "@/features/workspaces/hooks/use-join-workspace"
import { Loader2 } from "lucide-react"

interface JoinWorkspaceformProps {
  initialValues: string
}

export function JoinWorkspaceform({ initialValues }: JoinWorkspaceformProps) {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const inviteCode = useInviteCode()

  const { mutate, isPending } = useJoinWorkspace()

  const onJoinWorkspace = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode }
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`)
        }
      }
    )
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues}</strong>{" "}
          workspace.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            variant="secondary"
            type="button"
            asChild
            size="lg"
            disabled={isPending}
            className="w-full lg:w-fit"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            size="lg"
            disabled={isPending}
            type="button"
            onClick={onJoinWorkspace}
            className="w-full lg:w-fit"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Join workspace"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
