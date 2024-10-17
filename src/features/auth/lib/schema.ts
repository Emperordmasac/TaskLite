import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters")
})


export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required")
})