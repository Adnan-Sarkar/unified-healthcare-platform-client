import BloodGroup from "@/constant/bloodGroup";
import { z } from "zod";

export const registrationValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be string",
    })
    .min(1, { message: "First name is required" }),

  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be string",
    })
    .min(1, { message: "Last name is required" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(6, { message: "Password should be at least 6 digits" }),

  gender: z.enum(["male", "female"], {
    message: "Invalid gender value",
  }),

  phone: z
    .string()
    .min(10, { message: "Phone number should be at least 10 digits" })
    .min(11, { message: "Phone number must be 11 digits" }),

  location: z
    .string()
    .min(2, { message: "Location should be at least 2 characters long" }),

  dateOfBirth: z
    .string({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be string",
    })
    .min(1, { message: "Date of birth is required" }),

  bloodGroup: z.enum(BloodGroup as [string, ...string[]], {
    message: "Invalid blood group",
  }),

  profilePicture: z.instanceof(File, {
    message: "File is required",
  }),
});
