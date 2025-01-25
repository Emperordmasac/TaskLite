"use client"

import Link from "next/link"

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
        <header className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm z-50">
          <div className="flex items-center justify-between container py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                T
              </div>
              <span className="text-lg font-semibold text-[#000]">
                TaskLite
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Button
                variant="landing"
                className="bg-[#654CDC]  text-[15px] font-medium px-6 py-2.5 rounded-xl"
              >
                <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                  {isSignIn ? "Sign Up" : "Login"}
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center pt-[40px] md:pt-[100px]">
          {children}
        </div>
      </div>
    </div>
  )
}
