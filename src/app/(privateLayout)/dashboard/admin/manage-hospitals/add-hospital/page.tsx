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
import {
    HospitalValidationSchema
} from "@/app/(privateLayout)/dashboard/admin/manage-hospitals/add-hospital/HospitalValidationSchema";
import {useAddNewHospitalMutation} from "@/redux/api/hospital/hospitalApi";


const Page = () => {

    const [addNewHospital, {isLoading}] = useAddNewHospitalMutation();



    const handleAddHospital = async (values: FieldValues) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });

        const hospitalData = {
            name: values.name,
            area: values.area,
            district: values.district,
            location: values.location,
            website: values.website,
            contactNumber: values.contactNumber,
        }

        try {
            const res = await addNewHospital(hospitalData).unwrap();
            console.log(res);
            if (res.success) {
                toast.success("Hospital Added Successfully", {
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
        area: "",
        district: "",
        location: "",
        website: "",
        contactNumber: ""
    };

    return (
        <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }} mt={4}>
            <Box p={{xs: 1, sm: 2, md: 6}} sx={{
                background: "#FAF9F6",
                borderRadius: 3,
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }} width={"50%"}>
                <Stack py={2}>
                    <Typography mb={2} variant={"h4"} textAlign={"center"}>Add New Hospital</Typography>
                </Stack>
                <Stack spacing={5} direction="column">
                    <Form
                        onSubmit={handleAddHospital}
                        resolver={zodResolver(HospitalValidationSchema.registerHospitalSchema)}
                        defaultValues={defaultValues}
                    >
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="name" label="Hospital Name" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="district" label="District" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="area" label="Area" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="website" label="Website" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="location" label="Location" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputField name="contactNumber" label="Contact Number" />
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
                                    Add New Hospital
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