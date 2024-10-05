"use client";

import SingleFileUploader from "@/components/form/SingleFileUploader";
import { uploadFileIntoCloudinary } from "@/utils/uploadFileIntoCloudinary";
import React from "react";
import toast from "react-hot-toast";
import {useUpdateMedicineMutation} from "@/redux/api/medicine/medicineApi";

const UpdateMedicinePicture = ({medicineId}: {medicineId: string}) => {
    const [updateMedicineInfo, {isLoading: isMedicineUpdate}] = useUpdateMedicineMutation();

    const handleUploadMedicinePicture = async (file: File) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });
        try {
            const imageUrl = await uploadFileIntoCloudinary(file);
            const res = await updateMedicineInfo({
                updatedInfo: {
                    photo: imageUrl,
                },
                id: medicineId
            }).unwrap();

            if (res?.success) {
                toast.success("Medicine Photo Updated Successfully", {
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
            onFileUpload={handleUploadMedicinePicture}
            sx={{ width: "300px" }}
            label={"Upload Medicine Picture"}
            disabled={isMedicineUpdate}
        />
    );
};

export default UpdateMedicinePicture;