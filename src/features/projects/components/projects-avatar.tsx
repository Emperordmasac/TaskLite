import Image from "next/image"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ProjectAvatarProps {
  image?: string
  name: string
  className?: string
  fallbackClassName?: string
}

export function ProjectAvatar({
  image,
  name,
  className,
  fallbackClassName
}: ProjectAvatarProps) {
  if (image) {
    return (
      <div className="flex items-center gap-x-2">
        <div
          className={cn(
            "size-5 relative rounded-md overflow-hidden",
            className
          )}
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="text-neutral-500 font-semibold text-sm uppercase rounded-md">
          {name}
        </div>
      </div>
    )
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold text-sm uppercase rounded-md",
          fallbackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
