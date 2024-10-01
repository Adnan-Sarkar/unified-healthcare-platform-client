"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registrationValidationSchema } from "../registrationValidationSchema";
import DatePicker from "@/components/form/DatePicker";
import Select from "@/components/form/Select";
import { BloodGroupSelectItems } from "@/constant/bloodGroup";
import { GenderSelectItems } from "@/constant/gender";
import FileUploader from "@/components/form/FileUpload";

const Registration = () => {
  const router = useRouter();

  const handleRegistration = async (values: FieldValues) => {

  };

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "male",
    dateOfBirth: "",
    bloodGroup: "A+",
    location: "",
    profilePicture: null,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 0, md: 5 }}>
          <Box
            sx={{
              backgroundColor: "#2ecc71",
              height: "100vh",
              width: "100%",
              display: { xs: "none", md: "block" },
            }}
          ></Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "100%", md: "100vh" },
              width: "100%",
            }}
          >
            <Stack spacing={2} direction="column" width="70%">
              <Typography variant="h4">Registration</Typography>
              <Stack spacing={5} direction="column">
                <Form
                  onSubmit={handleRegistration}
                  resolver={zodResolver(registrationValidationSchema)}
                  defaultValues={defaultValues}
                >
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <InputField name="firstName" label="First Name" />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <InputField name="lastName" label="Last Name" />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <InputField name="email" label="Email" type="email" />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <InputField
                        name="password"
                        label="Password"
                        type="password"
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <InputField name="phone" label="Phone" />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Select
                        name="gender"
                        label="Gender"
                        items={GenderSelectItems}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <DatePicker
                        name="dateOfBirth"
                        label="Date of Birth"
                        disablePast={false}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Select
                        name="bloodGroup"
                        label="Blood Group"
                        items={BloodGroupSelectItems}
                      />
                    </Grid>

                    <Grid size={12}>
                      <InputField name="location" label="Location" />
                    </Grid>

                    <Grid size={12}>
                      <FileUploader
                        name="profilePicture"
                        label="Profile Picture"
                      />
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
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: "70%" }}
                    >
                      Registration
                    </Button>
                    <Typography sx={{ mt: 2 }} textAlign="center">
                      Don&apos;t have an account?{" "}
                      <Link href="/login">Login</Link>
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

export default Registration;
