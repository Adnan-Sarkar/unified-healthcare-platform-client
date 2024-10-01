"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginValidationSchema } from "../loginValidationSchema";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    console.log(values);
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
              <Typography variant="h4">Login</Typography>
              <Stack spacing={5} direction="column">
                <Form
                  onSubmit={handleLogin}
                  resolver={zodResolver(loginValidationSchema)}
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
                    <Button type="submit" variant="contained" sx={{ width: "70%" }}>
                      Login
                    </Button>
                    <Typography sx={{ mt: 2 }} textAlign="center">
                      Don&apos;t have an account?{" "}
                      <Link href="/registration">Registration</Link>
                    </Typography>
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

export default Login;
