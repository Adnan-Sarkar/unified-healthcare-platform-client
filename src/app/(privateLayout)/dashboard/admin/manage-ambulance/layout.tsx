import React from "react";
import { TComponentProps } from "@/types";
import {Box} from "@mui/material";
import AmbulanceNavbar from "@/app/(privateLayout)/dashboard/admin/manage-ambulance/_components/AmbulanceNavbar";

const Layout = ({ children }: TComponentProps) => {
    return <>
        <Box>
            <AmbulanceNavbar />
            {children}
        </Box>
    </>
};

export default Layout;
