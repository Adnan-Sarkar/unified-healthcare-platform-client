import {Button, Stack} from "@mui/material";
import Link from "next/link";


const AmbulanceNavbar = () => {
    return (
        <Stack direction={{xs: "column", md: "row"}} p={2} spacing={4} bgcolor={"#f5f6fa"} mb={2}>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-ambulance/"}>Ambulance List</Link></Button>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-ambulance/add-ambulance-category"}>Add Ambulance Category</Link></Button>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-ambulance/add-ambulance"}>Add Ambulance</Link></Button>
        </Stack>
    );
};

export default AmbulanceNavbar;