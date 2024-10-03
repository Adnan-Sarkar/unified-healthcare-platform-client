import React from "react";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";
import { FieldValues } from "react-hook-form";
import { Button, Grid, Stack } from "@mui/material";
import toast from "react-hot-toast";
import {useUpdateUserInfoMutation} from "@/redux/api/user/userApi";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {TUser} from "@/types";
import LoadingButton from "@mui/lab/LoadingButton";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: Partial<TUser> & {name: string}
};

const UpdateProfileInfoModal = ({open, setOpen, userInfo}: TProps) => {
  const [updateUserInfo, {isLoading: isUpdatingUserInfo}] = useUpdateUserInfoMutation();

  const handleUpdateProfileInfo = async (values: FieldValues) => {
    const toastId = toast.loading("Uploading...", {
      id: "uploading",
    });
    try {
      const res = await updateUserInfo({
        updatedData: values,
        id: userInfo.id as string,
      }).unwrap();

      if (res?.success) {
        toast.success("Profile Information Updated Successfully", {
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
    firstName: userInfo.name.split(' ')[0],
    lastName: userInfo.name.split(' ')[1],
    phone: userInfo.phone,
    location: userInfo.location,
  }

  return (
    <CustomFullScreenModal title={"Update Profile Information"} open={open} setOpen={setOpen}>
      <Form onSubmit={handleUpdateProfileInfo} defaultValues={defaultValues}>
        <Grid container spacing={{sm: 1, md: 2, lg: 4}}>
          <Grid item xs={12} md={6}>
            <InputField name="firstName" label="First Name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField name="lastName" label="Last Name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField name="phone" label="Contact Number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField name="location" label="Location" />
          </Grid>

          <Grid item xs={12}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
              {isUpdatingUserInfo ? (
                  <LoadingButton
                      size="large"
                      loading={isUpdatingUserInfo}
                      variant="contained"
                      disabled
                      sx={{width: "290px"}}
                  >
                    Loading
                  </LoadingButton>
              ) : (
                  <Button
                      type={"submit"}
                      variant="contained"
                      sx={{width: "290px"}}
                  >
                    Update Information
                  </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </CustomFullScreenModal>
  );
};

export default UpdateProfileInfoModal;