import { Button, Chip, Stack, Typography} from "@mui/material";
import React from "react";
import {TMedicine} from "@/types";
import Image from "next/image";
import UpdateProfileInfoModal from "@/app/(privateLayout)/dashboard/admin/profile/_components/UpdateProfileInfoModal";
import UpdateMedicineModal from "@/app/(privateLayout)/dashboard/admin/manage-pharmacy/_components/UpdateMedicineModal";


const MedicineCardAdmin = ({medicineInfo}: {medicineInfo: TMedicine}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true)
    };

    return (
        <>
            {
                isModalOpen && <UpdateMedicineModal open={isModalOpen} setOpen={setIsModalOpen} medicineInfo={medicineInfo} />
            }
            <Stack direction={"column"} sx={{border: "1px solid #dcdde1"}} p={2} height={490}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} mb={2}>
                    <Image src={medicineInfo?.photo} alt={medicineInfo?.name} width={200} height={200} />
                </Stack>
                <Stack>
                    <Typography variant={"h6"} textAlign={"center"} fontWeight={"bold"} fontSize={18} height={80}>
                        {medicineInfo?.name}
                    </Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                    <Chip label={(medicineInfo?.categoryName as string)} size="small" variant="outlined" />
                    <Chip
                        label={"Stock: " + (medicineInfo?.stockQuantity)}
                        size="small" variant="outlined"
                        color={medicineInfo?.stockQuantity === 0 ? "error" : "success"} />
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                    <Chip label={"Brand: " + (medicineInfo?.brandName as string)} size="small" variant="outlined" />
                    <Chip label={"Discount: " + (medicineInfo?.discount)} size="small" variant="outlined" />
                </Stack>
                <Stack mb={2}>
                    <Typography variant={"h6"} textAlign={"center"} fontWeight={"bold"} fontSize={18}>
                        Price: {medicineInfo?.price}
                    </Typography>
                </Stack>
                <Stack>
                    <Button variant={"outlined"} onClick={() => handleOpenModal()}>
                        Update Information
                    </Button>
                </Stack>
            </Stack>
        </>
    );
};

export default MedicineCardAdmin;