"use client"

import { z } from "zod"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { signUpSchema } from "../lib/schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRegister } from "../hooks/use-register"
import { DottedSeparator } from "@/components/globals/dotted-separators"

export const SignUpCard = () => {
  const { mutate, isPending } = useRegister()

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    mutate({ json: values })
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-center">
          By signing up, you agree to out{" "}
          <Link href="/privacy">
            <span className="text-blue-700">Privacy policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-blue-700">Terms of service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={signUpForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="Enter full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={signUpForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={signUpForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="Enter password"
                      min={8}
                      max={256}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} size="lg" className="w-full">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <div className="flex flex-col p-7 gap-y-4">
        <Button
          variant="secondary"
          disabled={isPending}
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          variant="secondary"
          disabled={isPending}
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </div>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Already have an account ?{" "}
          <Link href="/sign-in" className="text-blue-700">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
