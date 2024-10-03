import {Box} from "@mui/material";
import React from "react";


const InfoBox = ({children}: {children: React.ReactNode}) => {
    return (
        <Box  sx={{
            background: "#FAF9F6",
            borderRadius: 3,
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            p: 2
        }}>
            {
                children
            }
        </Box>
    );
};

export default InfoBox;