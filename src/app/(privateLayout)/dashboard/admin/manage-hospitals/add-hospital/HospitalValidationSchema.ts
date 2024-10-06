import { z } from "zod";

const registerHospitalSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(1, {message: "Name is required"}),
    area: z.string({
        required_error: "Area is required",
    }).min(1, {message: "Area is required"}),
    district: z.string({
        required_error: "District is required",
    }).min(1, {message: "District is required"}),
    location: z.string({
        required_error: "Location is required",
    }).min(1, {message: "Location is required"}),
    website: z.string({
        required_error: "Website is required",
    }).optional(),
    contactNumber: z.string({
        required_error: "Contact number is required",
    }).min(10, {message: "Contact number must be 10 characters"}),
});

export const HospitalValidationSchema = {
    registerHospitalSchema
}