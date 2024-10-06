"use client"

import React from "react";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";
import { FieldValues } from "react-hook-form";
import {Box, Button, Stack, Typography} from "@mui/material";
import toast from "react-hot-toast";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {THospital} from "@/types";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid2";
import {useUpdateHospitalInfoMutation} from "@/redux/api/hospital/hospitalApi";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    hospitalInfo: THospital
};

const UpdateHospitalModal = ({open, setOpen, hospitalInfo}: TProps) => {
    const [updateHospitalInfo, {isLoading}] = useUpdateHospitalInfoMutation();

    const handleUpdateHospital = async (values: FieldValues) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });

        const updatedData = {
            name: values?.name,
            area: values?.area,
            district: values?.district,
            location: values?.location,
            website: values?.website,
            contactNumber: values?.contactNumber
        }
        try {
            const res = await updateHospitalInfo({
                updatedInfo: updatedData,
                id: hospitalInfo.id as string,
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
        name: hospitalInfo?.name,
        area: hospitalInfo?.area,
        district: hospitalInfo?.district,
        location: hospitalInfo?.location,
        website: hospitalInfo?.website,
        contactNumber: hospitalInfo?.contactNumber
    };

    return (
        <CustomFullScreenModal title={"Update Hospital Information"} open={open} setOpen={setOpen}>
            <Stack direction={{xs: "column", md: "row"}}>
                <Stack width={"70%"} direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }} mt={4}>
                    <Box p={{xs: 1, sm: 2, md: 6}} width={"100%"}>
                        <Stack py={2}>
                            <Typography mb={2} variant={"h4"} textAlign={"center"}>Update Hospital Information</Typography>
                        </Stack>
                        <Stack spacing={5} direction="column">
                            <Form
                                onSubmit={handleUpdateHospital}
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

export default UpdateHospitalModal;