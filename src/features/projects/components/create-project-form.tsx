"use client"

import { z } from "zod"
import { useRef } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
// import { useRouter } from "next/navigation"
import { ImageIcon, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DottedSeparator } from "@/components/globals/dotted-separators"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils"

import { createProjectSchema } from "@/features/projects/lib/schema"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateProjects } from "@/features/projects/hooks/use-create-projects"

interface createProjectFormProps {
  onCancel?: () => void
}

export function CreateProjectForm({ onCancel }: createProjectFormProps) {
  const workspaceId = useWorkspaceId()
  const inputRef = useRef<HTMLInputElement>(null)

  // const router = useRouter()

  const { mutate, isPending } = useCreateProjects()

  const createProjectForm = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
    const finalValues = {
      ...values,
      workspaceId,
      image: values.image instanceof File ? values.image : ""
    }

    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          createProjectForm.reset()
          // onCancel?.()
          window.location.href = `/dashboard/workspaces/${workspaceId}/projects/${data.$id}`
        }
      }
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      createProjectForm.setValue("image", file)
    }
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new project
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...createProjectForm}>
          <form onSubmit={createProjectForm.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                name="name"
                control={createProjectForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
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
                control={createProjectForm.control}
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
                          disabled={isPending}
                        />
                        {field.value ? (
                          <Button
                            type="button"
                            variant="destructive"
                            size="xs"
                            className="w-fit mt-2"
                            disabled={isPending}
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
                            disabled={isPending}
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
                disabled={isPending}
                onClick={onCancel}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button size="lg" type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Create project"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
