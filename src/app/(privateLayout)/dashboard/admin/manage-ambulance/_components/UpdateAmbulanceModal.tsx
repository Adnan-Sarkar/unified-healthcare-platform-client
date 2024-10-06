"use client"

import React from "react";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";
import { FieldValues } from "react-hook-form";
import {Box, Button, Stack, Typography} from "@mui/material";
import toast from "react-hot-toast";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {TAmbulance} from "@/types";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid2";
import {useGetAllAmbulanceCategoriesQuery, useUpdateAmbulanceInfoMutation} from "@/redux/api/ambulance/ambulanceApi";
import Select from "@/components/form/Select";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ambulanceInfo: TAmbulance
};

const UpdateAmbulanceModal = ({open, setOpen, ambulanceInfo}: TProps) => {
    const [updateAmbulanceInfo, {isLoading}] = useUpdateAmbulanceInfoMutation();
    const {data} = useGetAllAmbulanceCategoriesQuery({});

    const handleUpdateHospital = async (values: FieldValues) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });

        const updatedData = {
            ownerName: values?.ownerName,
            area: values?.area,
            ambulanceCategoryId: values?.ambulanceCategoryId,
            district: values?.district,
            location: values?.location,
            pricePerKm: values?.pricePerKm,
            contactNumber: values?.contactNumber,
        }
        try {
            const res = await updateAmbulanceInfo({
                updatedInfo: updatedData,
                id: ambulanceInfo.id as string,
            }).unwrap();

            if (res?.success) {
                toast.success("Hospital Information Updated Successfully", {
                    id: toastId,
                });
            }
            else {
                throw new Error("Something went wrong! Please try again later.");
            }
        }
        catch (error: any) {
            toast.error(error.message, {
                id: toastId,
            });
        }

        setOpen(false);
    }

    const defaultValues = {
        ambulanceCategoryId: ambulanceInfo?.ambulanceCategoryId,
        ownerName: ambulanceInfo?.ownerName,
        area: ambulanceInfo?.area,
        location: ambulanceInfo?.location,
        district: ambulanceInfo?.district,
        pricePerKm: ambulanceInfo?.pricePerKm,
        contactNumber: ambulanceInfo?.contactNumber,
    };

    return (
        <CustomFullScreenModal title={"Update Ambulance Information"} open={open} setOpen={setOpen}>
            <Stack direction={{xs: "column", md: "row"}}>
                <Stack width={"70%"} direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }} mt={4}>
                    <Box p={{xs: 1, sm: 2, md: 6}} width={"100%"}>
                        <Stack py={2}>
                            <Typography mb={2} variant={"h4"} textAlign={"center"}>Update Ambulance Information</Typography>
                        </Stack>
                        <Stack spacing={5} direction="column">
                            <Form
                                onSubmit={handleUpdateHospital}
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
                                            Updating
                                        </LoadingButton>
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ width: "70%" }}
                                        >
                                            Update Hospital Information
                                        </Button>
                                    )}
                                </Box>
                            </Form>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </CustomFullScreenModal>
    );
};

export default UpdateAmbulanceModal;