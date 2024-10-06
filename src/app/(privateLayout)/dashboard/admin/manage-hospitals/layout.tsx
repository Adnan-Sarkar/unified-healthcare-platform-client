import React from "react";
import { TComponentProps } from "@/types";
import Dashboard from "@/components/dashboard/Dashboard";
import {Box} from "@mui/material";
import HospitalNavbar from "@/app/(privateLayout)/dashboard/admin/manage-hospitals/_components/HospitalNavbar";

const Layout = ({ children }: TComponentProps) => {
    return <>
        <Box>
            <HospitalNavbar />
            {children}
        </Box>
    </>
};

export default Layout;
