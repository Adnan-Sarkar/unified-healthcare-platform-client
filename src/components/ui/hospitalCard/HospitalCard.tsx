import {Box, Button, Stack, Typography} from "@mui/material";
import React from "react";
import {THospital} from "@/types";


const HospitalCard = ({hospitalInfo}: {hospitalInfo: THospital}) => {
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
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} p={2}>
                <Stack width={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={8}>
                    <Stack spacing={2} flex={3}>
                        <Typography fontSize={18} fontWeight={"bold"}>{(hospitalInfo.name)}</Typography>
                        <Typography>({(hospitalInfo.location)})</Typography>
                    </Stack>
                    <Stack spacing={2} flex={1}>
                        <Typography>District: {(hospitalInfo.district)}</Typography>
                        <Typography>Area: {(hospitalInfo.area)}</Typography>
                    </Stack>
                    <Stack flex={1}>
                        <Typography>Contact Number: {(hospitalInfo.contactNumber)}</Typography>
                    </Stack>
                </Stack>

                <Stack textAlign={"center"} justifyContent={"center"} alignItems={"center"} >
                    <Button color={"primary"} variant={"outlined"}>
                        <a href={hospitalInfo.website} target={"_blank"}>Website</a>
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default HospitalCard;