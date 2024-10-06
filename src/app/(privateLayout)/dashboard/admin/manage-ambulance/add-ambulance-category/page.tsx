"use client"

import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import InputField from "@/components/form/InputField";
import LoadingButton from "@mui/lab/LoadingButton";
import Form from "@/components/form/Form";
import React from "react";
import {FieldValues} from "react-hook-form";
import toast from "react-hot-toast";
import {useAddAmbulanceCategoryMutation} from "@/redux/api/ambulance/ambulanceApi";


const Page = () => {

    const [addNewCategory, {isLoading}] = useAddAmbulanceCategoryMutation()


    const handleAddAmbulanceCategory = async (values: FieldValues) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });

        if (values.categoryName === "") {
            toast.error("Enter Category Name", {
                id: toastId,
            });
        }
        else {
            try {
                const res = await addNewCategory({categoryName: values.categoryName}).unwrap();
                if (res.success) {
                    toast.success("Category Added Successfully", {
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
    }

    return (
        <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }} mt={4}>
            <Box p={{xs: 1, sm: 2, md: 6}} sx={{
                background: "#FAF9F6",
                borderRadius: 3,
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }} width={"50%"}>
                <Stack py={2}>
                    <Typography mb={2} variant={"h4"} textAlign={"center"}>Add New Ambulance Category</Typography>
                </Stack>
                <Form onSubmit={handleAddAmbulanceCategory} defaultValues={{
                    categoryName: ""
                }}>
                    <Stack direction={"column"} spacing={2}>
                        <InputField name="categoryName" placeholder={"Enter Category Name"} fullWidth={true} />
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                            {isLoading ? (
                                <LoadingButton
                                    size="large"
                                    loading={isLoading}
                                    variant="contained"
                                    disabled
                                    sx={{width: "100%"}}
                                >
                                    Loading
                                </LoadingButton>
                            ) : (
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    sx={{width: "100%"}}
                                >
                                    Add New Category
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Form>
            </Box>
        </Stack>
    );
};

export default Page;