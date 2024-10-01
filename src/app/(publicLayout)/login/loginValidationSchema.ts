import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .min(1, { message: "Email is required" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});
