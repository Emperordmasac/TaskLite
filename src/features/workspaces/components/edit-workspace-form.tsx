"use client"

import { z } from "zod"
import { useRef } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, CopyIcon, ImageIcon, Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/globals/dotted-separators"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils"
import { useConfirm } from "@/hooks/use-confirm"
import { Workspace } from "@/features/workspaces/lib/types"
import { updateWorkspaceSchema } from "@/features/workspaces/lib/schema"
import { useUpdateWorkspace } from "@/features/workspaces/hooks/use-update-workspace"
import { useDeleteWorkspace } from "@/features/workspaces/hooks/use-delete-workspace"
import { useResetInviteCode } from "../hooks/use-reset-invitecode"

interface EditWorkspaceformProps {
  onCancel?: () => void
  initialValues: Workspace
}

export function EditWorkspaceForm({
  onCancel,
  initialValues
}: EditWorkspaceformProps) {
  const router = useRouter()
  const { mutate, isPending } = useUpdateWorkspace()
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace()
  const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
    useResetInviteCode()

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "Deleting a workspace is irreversible and will delete all associated data.",
    "destructive"
  )

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset invite code",
    "This will reset the invite code for this workspace. Are you sure you want to continue?",
    "destructive"
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const createWorkspaceForm = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? ""
    }
  })

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (!ok) {
      return
    }

    deleteWorkspace(
      {
        param: { workspaceId: initialValues.$id }
      },
      {
        onSuccess: () => {
          window.location.href = "/"
        }
      }
    )
  }

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : ""
    }

    mutate(
      {
        form: finalValues,
        param: { workspaceId: initialValues.$id }
      },
      {
        onSuccess: ({ data }) => {
          createWorkspaceForm.reset()
          // onCancel?.()
          router.push(`/workspaces/${data.$id}`)
        }
      }
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      createWorkspaceForm.setValue("image", file)
    }
  }

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink).then(() => {
      toast.success("Invite link copied")
    })
  }

  const handleResetInviteCode = async () => {
    const ok = await confirmReset()

    if (!ok) {
      return
    }

    resetInviteCode(
      {
        param: { workspaceId: initialValues.$id }
      },
      {
        onSuccess: () => {
          router.refresh()
        }
      }
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...createWorkspaceForm}>
            <form onSubmit={createWorkspaceForm.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="name"
                  control={createWorkspaceForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            isPending ||
                            isDeletingWorkspace ||
                            isResettingInviteCode
                          }
                          type="text"
                          placeholder="Enter workspace name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="image"
                  control={createWorkspaceForm.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] rounded-md relative overflow-hidden">
                            <Image
                              alt="logo"
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG, max 1mb
                          </p>
                          <input
                            className="hidden"
                            accept=".jpg, .png, .jpeg, .svg"
                            type="file"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={
                              isPending ||
                              isDeletingWorkspace ||
                              isResettingInviteCode
                            }
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                              disabled={
                                isPending ||
                                isDeletingWorkspace ||
                                isResettingInviteCode
                              }
                              onClick={() => {
                                field.onChange(null)
                                if (inputRef.current) {
                                  inputRef.current.value = ""
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                              disabled={
                                isPending ||
                                isDeletingWorkspace ||
                                isResettingInviteCode
                              }
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  size="lg"
                  variant="secondary"
                  type="button"
                  disabled={
                    isPending || isDeletingWorkspace || isResettingInviteCode
                  }
                  onClick={onCancel}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  type="submit"
                  disabled={
                    isPending || isDeletingWorkspace || isResettingInviteCode
                  }
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link below to invite members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input value={fullInviteLink} disabled />
                <Button
                  className="size-[12]"
                  onClick={handleCopyInviteLink}
                  variant="secondary"
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeparator className="py-7" />
            <Button
              size="sm"
              className="mt-6 w-fit ml-auto"
              variant="destructive"
              type="button"
              disabled={
                isPending || isDeletingWorkspace || isResettingInviteCode
              }
              onClick={handleResetInviteCode}
            >
              Reset invite Link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will delete all
              associated data.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              size="sm"
              className="mt-6 w-fit ml-auto"
              variant="destructive"
              type="button"
              disabled={
                isPending || isDeletingWorkspace || isResettingInviteCode
              }
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
