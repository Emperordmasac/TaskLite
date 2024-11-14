import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MemberAvatarProps {
  name: string
  className?: string
  fallbackClassName?: string
}

export function MemberAvatar({
  fallbackClassName,
  name,
  className
}: MemberAvatarProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar
        className={cn(
          "size-5 transition border border-neutral-300 rounded-full",
          className
        )}
      >
        <AvatarFallback
          className={cn(
            "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
            fallbackClassName
          )}
        >
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-neutral-500 font-semibold text-sm uppercase rounded-md">
        {name}
      </div>
    </div>
  )
}
