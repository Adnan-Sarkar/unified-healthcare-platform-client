import { z } from "zod";

const registerAmbulanceSchema = z.object({
    ambulanceCategoryId: z.string({
        required_error: "Category id is required",
    }).min(1, {message: "Category id is required"}),
    ownerName: z.string({
        required_error: "Ambulance owner name is required",
    }).min(1, {message: "Ambulance owner name is required"}),
    area: z.string({
        required_error: "Ambulance area is required",
    }).min(1, {message: "Ambulance area is required"}),
    location: z.string({
        required_error: "Ambulance location is required",
    }).min(1, {message: "Ambulance location is required"}),
    district: z.string({
        required_error: "Ambulance district is required",
    }).min(1, {message: "Ambulance district is required"}),
    pricePerKm: z.preprocess(
        (val) => Number(val),
        z.number({
            required_error: "Price per kilometer is required",
            invalid_type_error: "Price per kilometer must be a number",
        }).min(0, {message: "Price per kilometer must be positive"}).default(0)
    ),
    contactNumber: z.string({
        required_error: "Contact number is required",
    }).min(10, {message: "Contact number must be 10 characters"}),
});

export const AmbulanceValidationSchema = {
    registerAmbulanceSchema
}