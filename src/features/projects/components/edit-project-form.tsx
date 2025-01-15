"use client"

import { z } from "zod"
import { useRef } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, ImageIcon, Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/globals/dotted-separators"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils"
import { useConfirm } from "@/hooks/use-confirm"
import { Project } from "@/features/projects/lib/types"
import { updateProjectSchema } from "@/features/projects/lib/schema"
import { useUpdateProject } from "@/features/projects/hooks/use-update-project"
import { useDeleteProject } from "@/features/projects/hooks/use-delete-project"

interface EditProjectFormProps {
  onCancel?: () => void
  initialValues: Project
}

export function EditProjectForm({
  onCancel,
  initialValues
}: EditProjectFormProps) {
  const router = useRouter()
  const { mutate, isPending } = useUpdateProject()

  const { mutate: deleteProject, isPending: isDeletingProject } =
    useDeleteProject()

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "Deleting a project is irreversible and will delete all associated data.",
    "destructive"
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const editProjectForm = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
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

    deleteProject(
      {
        param: { projectId: initialValues.$id }
      },
      {
        onSuccess: () => {
          window.location.href = `/workspaces/${initialValues.workspaceId}`
        }
      }
    )
  }

  const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : ""
    }

    mutate({
      form: finalValues,
      param: { projectId: initialValues.$id }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      editProjectForm.setValue("image", file)
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`
                    )
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
          <Form {...editProjectForm}>
            editProjectForm
            <form onSubmit={editProjectForm.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="name"
                  control={editProjectForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending || isDeletingProject}
                          type="text"
                          placeholder="Enter project name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="image"
                  control={editProjectForm.control}
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
                          <p className="text-sm">Project Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG, max 1mb
                          </p>
                          <input
                            className="hidden"
                            accept=".jpg, .png, .jpeg, .svg"
                            type="file"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={isPending || isDeletingProject}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                              disabled={isPending || isDeletingProject}
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
                              disabled={isPending || isDeletingProject}
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
                  disabled={isPending || isDeletingProject}
                  onClick={onCancel}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  type="submit"
                  disabled={isPending || isDeletingProject}
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
              disabled={isPending || isDeletingProject}
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
