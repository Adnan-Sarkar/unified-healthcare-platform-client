import React from "react";
import CustomFullScreenModal from "@/components/modal/CustomFullScreenModal";
import { FieldValues } from "react-hook-form";
import {Box, Button, Stack, Typography} from "@mui/material";
import toast from "react-hot-toast";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {TMedicine, TUser} from "@/types";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@/components/form/Select";
import {useGetMedicineCategoriesQuery, useUpdateMedicineMutation} from "@/redux/api/medicine/medicineApi";
import Image from "next/image";
import UpdateMedicinePicture
    from "@/app/(privateLayout)/dashboard/admin/manage-pharmacy/_components/UpdateMedicinePicture";
import Grid from "@mui/material/Grid2";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    medicineInfo: TMedicine
};

const UpdateMedicineModal = ({open, setOpen, medicineInfo}: TProps) => {
    const [updateMedicineInfo, {isLoading: isMedicineUpdate}] = useUpdateMedicineMutation();
    const {data} = useGetMedicineCategoriesQuery({});

    const handleUpdateMedicine = async (values: FieldValues) => {
        const toastId = toast.loading("Uploading...", {
            id: "uploading",
        });

        const updatedData = {
            name: values.name,
            brandName: values.brandName,
            categoryId: values.categoryId,
            description: values.description,
            discount: Number(values.discount),
            price: Number(values.price),
            stockQuantity: Number(values.stockQuantity),
        }
        try {
            const res = await updateMedicineInfo({
                updatedInfo: updatedData,
                id: medicineInfo.id as string,
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
        name: medicineInfo.name,
        brandName: medicineInfo.brandName,
        categoryId: medicineInfo.categoryId,
        description: medicineInfo.description,
        discount: Number(medicineInfo.discount),
        price: Number(medicineInfo.price),
        stockQuantity: Number(medicineInfo.stockQuantity)
    }

    return (
        <CustomFullScreenModal title={"Update Medicine Information"} open={open} setOpen={setOpen}>
            <Stack direction={{xs: "column", md: "row"}}>
                <Stack width={"30%"} direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={4} mb={3}>
                    <Image
                        src={medicineInfo.photo as string}
                        alt={"Medicine Picture"}
                        width={300}
                        height={300}
                        priority
                        style={{
                            border: `1px solid #30336b`
                        }}
                    />
                    <Stack direction={"column"} alignItems={"start"} justifyContent={"center"} spacing={2}>
                        <UpdateMedicinePicture medicineId={medicineInfo?.id as string} />
                    </Stack>
                </Stack>
                <Stack width={"70%"} direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{ width: "100%", height: "100%" }} mt={4}>
                    <Box p={{xs: 1, sm: 2, md: 6}} width={"100%"}>
                        <Stack py={2}>
                            <Typography mb={2} variant={"h4"} textAlign={"center"}>Update Medicine Information</Typography>
                        </Stack>
                        <Stack spacing={5} direction="column">
                            <Form
                                onSubmit={handleUpdateMedicine}
                                defaultValues={defaultValues}
                            >
                                <Grid container spacing={3}>
                                    <Grid size={12}>
                                        <InputField name="name" label="Medicine Name" />
                                    </Grid>

                                    <Grid size={12}>
                                        <InputField name="brandName" label="Brand Name" />
                                    </Grid>

                                    <Grid size={12}>
                                        <InputField name="stockQuantity" label="Stock Quantity" type="number" />
                                    </Grid>

                                    <Grid size={12}>
                                        <InputField name="price" label="Price" type="number" />
                                    </Grid>

                                    <Grid size={12}>
                                        <InputField name="discount" label="Discount" type="number" />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Select
                                            name="categoryId"
                                            // defaultValue={}
                                            label="Category"
                                            items={data?.data ?
                                                data?.data?.map((category: { id: string; categoryName: string }) => ({
                                                    label: category.categoryName,
                                                    value: category.id,
                                                }))
                                                : []}
                                        />
                                    </Grid>

                                    <Grid size={12}>
                                        <InputField name="description" label="Description" type={"textarea"} multiline={true}/>
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
                                    {isMedicineUpdate ? (
                                        <LoadingButton
                                            size="large"
                                            loading={isMedicineUpdate}
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
                                            Update Medicine Information
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

export default UpdateMedicineModal;