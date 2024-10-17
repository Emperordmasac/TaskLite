"use client"

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  const isSignIn = pathname === "/sign-in"

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="logo" width={152} height={56} />
          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  )
}
