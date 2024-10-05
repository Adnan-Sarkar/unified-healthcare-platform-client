import { z } from "zod";

const registerMedicineSchema = z.object({
    name: z.string({
        required_error: "Medicine name is required",
        invalid_type_error: "Medicine name must be a string",
    }).min(1, {message: "Medicine name is required"}),
    brandName: z.string({
        required_error: "Brand name is required",
        invalid_type_error: "Brand name must be a string",
    }).min(1, {message: "Medicine brand name is required"}),
    categoryId: z.string({
        required_error: "Category ID is required",
        invalid_type_error: "Category ID must be a string",
    }).min(1, {message: "Medicine categoryId is required"}),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }).min(1, {message: "Medicine description is required"}),
    price: z.preprocess(
        (val) => Number(val),
        z.number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        }).min(0, {message: "Price must be positive"}).default(0)
    ),
    discount: z.preprocess(
        (val) => Number(val),
        z.number({
            required_error: "Discount is required",
            invalid_type_error: "Discount must be a number",
        }).min(0, "Discount must be 0 or more")
            .max(100, "Discount must be 100 or less").default(0).optional()
    ),
    stockQuantity: z.preprocess(
        (val) => Number(val),
        z.number({
            required_error: "Stock quantity is required",
            invalid_type_error: "Stock quantity must be a number",
        }).min(0, {message: "Stock quantity must be positive"}).default(0)
    ),
    photo: z.instanceof(File, {
        message: "File is required",
    }),
});

export const medicineValidationSchema = {
    registerMedicineSchema,
}