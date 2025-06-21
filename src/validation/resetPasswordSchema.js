import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .length(6, "Code must be exactly 6 digits")
      .regex(/^\d{6}$/, "Code must contain numbers only"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[!@#$%&*]/, "Must include a special character (!@#$%&*)"),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
  });
