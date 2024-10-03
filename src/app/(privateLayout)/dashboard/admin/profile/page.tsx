"use client";

import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Container, Grid, Skeleton, Stack} from "@mui/material";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import ProfileInfoBox from "@/components/ui/ProfileInfoBox";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Link from "next/link";
import {useLoggedInUserQuery} from "@/redux/api/user/userApi";
import {getUserInfo} from "@/services/auth.services";
import UpdateProfilePicture from "@/app/(privateLayout)/dashboard/admin/profile/_components/UpdateProfilePicture";
import UpdateProfileInfoModal from "@/app/(privateLayout)/dashboard/admin/profile/_components/UpdateProfileInfoModal";
import {TTokenData} from "@/types";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [userData, setUserData] = useState<TTokenData | null>(null);
  const { data, isLoading } = useLoggedInUserQuery(userData?.id || "");

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo?.id) {
      setUserData(userInfo);
    }
  }, []);


  const handleOpenModal = () => {
    setIsModalOpen(true)
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  if (isLoading) {
    return <Container>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress size={"large"} />
      </Stack>
    </Container>
  }


  return (
      <Container>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={4} justifyContent={"start"} alignItems={"center"}>
            <Stack direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={4} mb={3}>
              {data?.data?.profilePicture ? (
                  <>
                    {isImageLoading && (
                        <Skeleton variant="rectangular" width={300} height={300} />
                    )}
                    <Image
                        src={data.data.profilePicture}
                        alt={"Profile Picture"}
                        width={300}
                        height={300}
                        priority
                        style={{
                          border: `1px solid #30336b`,
                          display: isImageLoading ? 'none' : 'block',
                        }}
                        onLoad={handleImageLoad}
                    />
                  </>
              ) : null}
              <Stack direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={2}>
                <UpdateProfilePicture userId={userData?.id as string} />
                <Button variant={"contained"} color={"primary"} sx={{width: "300px"}} onClick={() => handleOpenModal()}>
                  <EditNoteRoundedIcon/> <Box mx={0.5}></Box> Update Profile Info
                </Button>
                {
                    isModalOpen && <UpdateProfileInfoModal open={isModalOpen} setOpen={setIsModalOpen} userInfo={data?.data} />
                }
                <Link href={`/dashboard/admin/change-password`}>
                  <Button variant={"outlined"} color={"primary"} sx={{width: "300px"}}><KeyRoundedIcon/> <Box mx={0.5}></Box> Change Password</Button>
                </Link>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item xs={12}>
                <Divider textAlign="left">Personal Information</Divider>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={data?.data?.name} label={"Name"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={data?.data?.gender} label={"Gender"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={data?.data?.bloodGroup} label={"Blood Group"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={data?.data?.dateOfBirth} label={"Date of Birth"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={data?.data?.accountStatus} label={"Account Status"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProfileInfoBox  info={data?.data?.roles} label={"Role"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} my={2}>
            <Divider textAlign="center">Contact Information</Divider>
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={data?.data?.email} label={"Email"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileInfoBox  info={data?.data?.phone} label={"Contact Number"} />
          </Grid>
          <Grid item xs={12}>
            <ProfileInfoBox  info={data?.data?.location} label={"Location"} />
          </Grid>
        </Grid>
      </Container>
  );
};

export default ProfilePage;