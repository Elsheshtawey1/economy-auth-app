import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(4, "Full name must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[!@#$%&*-_]/, "Must include a special character (!@#$%&*-_)"),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
  });
