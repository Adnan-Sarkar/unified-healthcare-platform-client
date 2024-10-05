"use client";

import React from "react";
import { TUser } from "@/types";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import ProfileInfoBox from "@/components/ui/ProfileInfoBox";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: TUser
};

const UserDetailsModal = ({open, setOpen, userInfo}: TProps) => {
    const theme = useTheme();
    return (
        <CustomFullScreenModal title={"User Details Information"} open={open} setOpen={setOpen}>
            <Container>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={4}>
                    <Typography variant={"h5"} fontWeight={500}>User Details</Typography>
                </Stack>
                <Grid container spacing={2} justifyContent={"space-between"}>
                    <Grid item xs={12} md={3} justifyContent={"center"} alignItems={"center"}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} my={3}>
                            <Image
                                src={userInfo?.profilePicture}
                                alt={"Profile Picture"}
                                width={300}
                                height={300}
                                priority
                                style={{
                                    border: `1px solid ${theme.palette.primary.main}`,
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} justifyContent={"space-between"}>
                            <Grid item xs={12}>
                                <Divider textAlign="left">Personal Information</Divider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProfileInfoBox  info={userInfo?.name} label={"Name"} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProfileInfoBox  info={userInfo?.gender} label={"Gender"} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProfileInfoBox  info={userInfo?.bloodGroup} label={"Blood Group"} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProfileInfoBox  info={userInfo?.dateOfBirth} label={"Date of Birth"} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProfileInfoBox  info={userInfo?.accountStatus} label={"Account Status"} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProfileInfoBox  info={userInfo?.roles} label={"Role"} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={0.5}>
                    <Grid item xs={12} my={2}>
                        <Divider textAlign="center">Contact Information</Divider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProfileInfoBox  info={userInfo?.email} label={"Email"} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProfileInfoBox  info={userInfo?.phone} label={"Contact Number"} />
                    </Grid>
                    <Grid item xs={12}>
                        <ProfileInfoBox  info={userInfo?.location} label={"Location"} />
                    </Grid>
                </Grid>
            </Container>
        </CustomFullScreenModal>
    );
};

export default UserDetailsModal;