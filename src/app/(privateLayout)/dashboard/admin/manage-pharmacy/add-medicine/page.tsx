"use client";

import {Box, Button, Stack, Typography} from "@mui/material";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import {
    useAddNewMedicineMutation,
    useGetMedicineCategoriesQuery
} from "@/redux/api/medicine/medicineApi";
import {FieldValues} from "react-hook-form";
import toast from "react-hot-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import Select from "@/components/form/Select";
import FileUploader from "@/components/form/FileUpload";
import {
    medicineValidationSchema
} from "@/app/(privateLayout)/dashboard/admin/manage-pharmacy/add-medicine/MedicineValidationSchema";
import {uploadFileIntoCloudinary} from "@/utils/uploadFileIntoCloudinary";


const Page = () => {

    const [addNewMedicine, {isLoading}] = useAddNewMedicineMutation();
    const {data} = useGetMedicineCategoriesQuery({});

    const handleAddMedicine = async (values: FieldValues) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });

        if (values.photo) {
            values.photo = await uploadFileIntoCloudinary(
                values.photo
            );
        }

        const medicineObj = {
            name: values.name,
            brandName: values.brandName,
            categoryId: values.categoryId,
            description: values.description,
            discount: Number(values.discount),
            price: Number(values.price),
            stockQuantity: Number(values.stockQuantity),
            photo: values.photo,
        }

        try {
            const res = await addNewMedicine(medicineObj).unwrap();
            if (res.success) {
                toast.success("Medicine Added Successfully", {
                    id: toastId,
                });
            }
            else {
                throw new Error(res.message);
            }
        } catch (error: any) {
            toast.error(error?.message, {
                id: toastId,
            });
        }
    }

    const defaultValues = {
        name: "",
        brandName: "",
        categoryId: "",
        description: "",
        discount: 0,
        price: 0,
        stockQuantity: 0,
        photo: null,
    };

    return (
        <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }} mt={4}>
            <Box p={{xs: 1, sm: 2, md: 6}} sx={{
                background: "#FAF9F6",
                borderRadius: 3,
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }} width={"50%"}>
                <Stack py={2}>
                    <Typography mb={2} variant={"h4"} textAlign={"center"}>Add New Medicine</Typography>
                </Stack>
                <Stack spacing={5} direction="column">
                    <Form
                        onSubmit={handleAddMedicine}
                        resolver={zodResolver(medicineValidationSchema.registerMedicineSchema)}
                        defaultValues={defaultValues}
                    >
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="name" label="Medicine Name" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="brandName" label="Brand Name" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="stockQuantity" label="Stock Quantity" type="number" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="price" label="Price" type="number" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="discount" label="Discount" type="number" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Select
                                    name="categoryId"
                                    label="Category"
                                    items={data?.data ?
                                        data?.data?.map((category: { id: string; categoryName: string }) => ({
                                            label: category.categoryName,
                                            value: category.id,
                                        }))
                                        : []}
                                />
                            </Grid>

                            <Grid size={12}>
                                <InputField name="description" label="Description" type={"textarea"} multiline={true}/>
                            </Grid>

                            <Grid size={12}>
                                <FileUploader
                                    name="photo"
                                    label="Picture"
                                />
                            </Grid>
                        </Grid>

                        <Box
                            sx={{
                                mt: 5,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {isLoading ? (
                                <LoadingButton
                                    size="large"
                                    loading={isLoading}
                                    variant="contained"
                                    disabled
                                    sx={{ width: "70%" }}
                                >
                                    Adding
                                </LoadingButton>
                            ) : (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ width: "70%" }}
                                >
                                    Add New Medicine
                                </Button>
                            )}
                        </Box>
                    </Form>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Page;