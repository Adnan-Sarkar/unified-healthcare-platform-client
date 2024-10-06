"use client";

import {Box, Button, Stack, Typography} from "@mui/material";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import {FieldValues} from "react-hook-form";
import toast from "react-hot-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import Select from "@/components/form/Select";
import {useAddAmbulanceMutation, useGetAllAmbulanceCategoriesQuery} from "@/redux/api/ambulance/ambulanceApi";
import {
    AmbulanceValidationSchema
} from "@/app/(privateLayout)/dashboard/admin/manage-ambulance/add-ambulance/AmbulanceValidationSchema";


const Page = () => {

    const [addNewAmbulance, {isLoading}] = useAddAmbulanceMutation();
    const {data} = useGetAllAmbulanceCategoriesQuery({});



    const handleAddAmbulance = async (values: FieldValues) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });

        const ambulanceObj = {
            ownerName: values.ownerName,
            area: values.area,
            ambulanceCategoryId: values.ambulanceCategoryId,
            location: values.location,
            district: values.district,
            pricePerKm: Number(values.pricePerKm),
            contactNumber: values.contactNumber,
        }

        try {
            const res = await addNewAmbulance(ambulanceObj).unwrap();
            if (res.success) {
                toast.success("Ambulance Added Successfully", {
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
        ownerName: "",
        area: "",
        ambulanceCategoryId: "",
        location: "",
        district: "",
        pricePerKm: 0,
        contactNumber: "",
    };

    return (
        <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }} mt={4}>
            <Box p={{xs: 1, sm: 2, md: 6}} sx={{
                background: "#FAF9F6",
                borderRadius: 3,
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }} width={"50%"}>
                <Stack py={2}>
                    <Typography mb={2} variant={"h4"} textAlign={"center"}>Add New Ambulance</Typography>
                </Stack>
                <Stack spacing={5} direction="column">
                    <Form
                        onSubmit={handleAddAmbulance}
                        resolver={zodResolver(AmbulanceValidationSchema.registerAmbulanceSchema)}
                        defaultValues={defaultValues}
                    >
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="ownerName" label="Owner Name" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="district" label="District" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="area" label="Area" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Select
                                    name="ambulanceCategoryId"
                                    label="Ambulance Category"
                                    items={
                                        data?.data
                                            ? data.data.map((category: { id: string; categoryName: string }) => ({
                                                label: category.categoryName,
                                                value: category.id,
                                            }))
                                            : []
                                    }
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="pricePerKm" label="Price Per Km" type="number" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="contactNumber" label="Contact Number" />
                            </Grid>

                            <Grid size={12}>
                                <InputField name="location" label="Location" />
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
                                    Add New Ambulance
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