"use client";

import React, {useEffect, useState} from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import {useChangePasswordMutation} from "@/redux/api/user/userApi";
import {getUserInfo} from "@/services/auth.services";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {
  changePasswordValidationSchema
} from "@/app/(privateLayout)/dashboard/admin/change-password/changePasswordValidationSchema";
import {TTokenData} from "@/types";

const ChangePasswordPage = () => {
  const [userData, setUserData] = useState<TTokenData | null>(null);
  const [changePassword, {isLoading}] = useChangePasswordMutation();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo?.id) {
      setUserData(userInfo);
    }
  }, []);


  const handleChangePassword = async (values: FieldValues) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Confirm password is not matched");
      return;
    }

    if (values.newPassword === values.oldPassword) {
      toast.error("New password cannot be same as old password");
      return;
    }

    const toastId = toast.loading("Changing password...", {
      id: "change-password",
    });

    try {
      const res = await changePassword({
        updatedData: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        },
        id: userData?.id as string
      }).unwrap();

      if (res?.success) {
        toast.success("Password changed successfully", {
          id: toastId,
        });
      } else {
        toast.error(res?.message, {
          id: toastId,
        });
      }
    }
    catch (error: any) {
      toast.error(error.data, {
        id: toastId,
      });
    }
  }

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }}>
      <Box p={{xs: 1, sm: 2, md: 6}} sx={{
        background: "#FAF9F6",
        borderRadius: 3,
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}>
        <Box display={"flex"} justifyContent={"center"} pb={3}>
          <Typography  variant={"h4"}>Change Password</Typography>
        </Box>
        <Stack direction={{xs: "column", md: "row"}} spacing={{xs: 1, sm: 2, md: 3}} justifyContent={"center"} >
          <Form onSubmit={handleChangePassword} resolver={zodResolver(changePasswordValidationSchema)} defaultValues={defaultValues}>
            <Grid container spacing={2} >
              <Grid item xs={12} md={12}>
                <InputField name="oldPassword" label="Old Password" type={"password"} />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputField name="newPassword" label="New Password" type={"password"} />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputField name="confirmPassword" label="Confirm New Password" type={"password"} />
              </Grid>
              <Grid item xs={12} md={12} justifyContent={"center"}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                  <Button type={"submit"} color={"primary"} variant={"contained"} size={"large"} sx={{width: "290px"}} disabled={isLoading}>Change Password</Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChangePasswordPage;