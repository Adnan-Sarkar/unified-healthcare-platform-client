import React from "react";
import { TComponentProps } from "@/types";
import {Box} from "@mui/material";
import PharmacyNavbar from "@/app/(privateLayout)/dashboard/admin/manage-pharmacy/_components/PharmacyNavbar";

const Layout = ({ children }: TComponentProps) => {
    return <>
        <Box>
            <PharmacyNavbar />
            {children}
        </Box>
    </>
};

export default Layout;
