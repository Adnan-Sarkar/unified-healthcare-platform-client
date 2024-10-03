"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { adminLoginValidationSchema } from "../adminLoginValidationSchema";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { storeUserInfo } from "@/services/auth.services";
import { useAppDispatch } from "@/redux/hooks";
import { decodedToken } from "@/utils/jwtHelpers";
import { loginAdmin } from "@/services/actions/loginAdmin";
import { setToken } from "@/redux/features/user/tokenSlice";

const AdminLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = async (values: FieldValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Login in progress...");
    try {
      const response = await loginAdmin({
        email: values.email,
        password: values.password,
      });
      if (response.success) {
        storeUserInfo(response.data);
        dispatch(setToken(response.data));
        toast.success("Login successful", { id: toastId });
        router.push("/dashboard/admin/home");
      } else {
        toast.error(response.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Login failed", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={5}>
          <Box
            sx={{
              backgroundColor: "#2ecc71",
              height: "100vh",
              width: "100%",
            }}
          ></Box>
        </Grid>
        <Grid size={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Stack spacing={2} direction="column" width="70%">
              <Typography variant="h4">Admin Login</Typography>
              <Stack spacing={5} direction="column">
                <Form
                  onSubmit={handleLogin}
                  resolver={zodResolver(adminLoginValidationSchema)}
                  defaultValues={defaultValues}
                >
                  <Stack spacing={3} direction="column" width="100%">
                    <InputField name="email" label="Email" type="email" />
                    <InputField
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Stack>
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
                        Login
                      </LoadingButton>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "70%" }}
                      >
                        Login
                      </Button>
                    )}
                  </Box>
                </Form>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminLogin;
