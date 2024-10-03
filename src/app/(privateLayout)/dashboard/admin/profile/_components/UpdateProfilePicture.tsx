import SingleFileUploader from "@/components/form/SingleFileUploader";
import { uploadFileIntoCloudinary } from "@/utils/uploadFileIntoCloudinary";
import React from "react";
import toast from "react-hot-toast";
import {useUpdateUserInfoMutation} from "@/redux/api/user/userApi";

const UpdateProfilePicture = ({userId}: {userId: string}) => {
  const [updateUserInfo, { isLoading: isUpdatingUserInfo }] =
      useUpdateUserInfoMutation();

  const handleUploadProfilePicture = async (file: File) => {
    const toastId = toast.loading("Uploading...", {
      id: "uploading",
    });
    try {
      const imageUrl = await uploadFileIntoCloudinary(file);
      const res = await updateUserInfo({
        updatedData: {
          profilePicture: imageUrl,
        },
        id: userId
      }).unwrap();

      if (res?.success) {
        toast.success("Profile Picture Updated Successfully", {
          id: toastId,
        });
      } else {
        throw new Error(res?.message as string);
      }
    } catch (error: any) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  };

  return (
      <SingleFileUploader
          onFileUpload={handleUploadProfilePicture}
          sx={{ width: "300px" }}
          label={"Upload Profile Picture"}
          disabled={isUpdatingUserInfo}
      />
  );
};

export default UpdateProfilePicture;
