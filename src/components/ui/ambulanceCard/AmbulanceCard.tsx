import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {TAmbulance} from "@/types";

const AmbulanceCard = ({ambulanceInfo}: {ambulanceInfo: TAmbulance}) => {
    return (
        <Box sx={{
            overflow: 'hidden',
            border: "1px solid #ecf0f1",
            borderRadius: 4,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)"
            }
        }}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                <Stack justifyContent={"center"} alignItems={"center"} textAlign={"center"} width={150} px={3} py={4} sx={{
                    background: "#ecf0f1",
                }}>
                    <Typography variant={"h6"} fontWeight={"bold"}>{(ambulanceInfo.categoryName)?.toUpperCase()}</Typography>
                </Stack>
                <Stack width={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={8}>
                    <Stack spacing={2} flex={2}>
                        <Typography>Owner Name: {(ambulanceInfo.ownerName)}</Typography>
                        <Typography>Area: {(ambulanceInfo.area)}</Typography>
                    </Stack>
                    <Stack spacing={2} flex={2}>
                        <Typography>District: {(ambulanceInfo.district)}</Typography>
                        <Typography>Location: {(ambulanceInfo.location)}</Typography>
                    </Stack>
                    <Stack flex={1}>
                        <Typography>Contact Number: {(ambulanceInfo.contactNumber)}</Typography>
                    </Stack>
                </Stack>

                <Stack textAlign={"center"} width={250} px={3} py={4} sx={{
                    border: "3px solid #ecf0f1",
                    borderRadius: 4,
                }}>
                    <Typography variant={"h6"} fontWeight={"bold"}>Price Per KM</Typography>
                    <Typography variant={"h6"} fontWeight={"bold"}>{(ambulanceInfo.pricePerKm)}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default AmbulanceCard;