"use client"

import Link from "next/link"
import { Fragment } from "react"
import { ArrowLeft, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import { DottedSeparator } from "@/components/globals/dotted-separators"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { useGetMembers } from "@/features/members/hooks/use-get-members"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { useDeleteMember } from "@/features/members/hooks/use-delete-member"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useUpdateMember } from "../hooks/use-update-member"
import { MemberRole } from "../lib/types"
import { useConfirm } from "@/hooks/use-confirm"

export function MembersList() {
  const workspaceId = useWorkspaceId()
  const { data } = useGetMembers({ workspaceId })

  const [ConfrimDeleteDialog, confirmDelete] = useConfirm(
    "Remove member",
    "Are you sure you want to remove this member?",
    "destructive"
  )

  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember()
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember()

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId }
    })
  }

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirmDelete()
    if (!ok) return

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload()
        }
      }
    )
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfrimDeleteDialog />
      <CardHeader className=" flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeft className="sizw-4 mr-2" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members list</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto" size="icon" variant="secondary">
                    <MoreVertical className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.ADMIN)
                    }
                    disabled={isUpdatingMember || isDeletingMember}
                    className="font-medium"
                  >
                    Set as Administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.MEMBER)
                    }
                    disabled={isUpdatingMember || isDeletingMember}
                    className="font-medium"
                  >
                    Set as Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={isDeletingMember || isUpdatingMember}
                    className="font-medium text-amber-700"
                  >
                    Remove member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}
