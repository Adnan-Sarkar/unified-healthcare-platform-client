import {Button, Stack} from "@mui/material";
import Link from "next/link";


const PharmacyNavbar = () => {
    return (
        <Stack direction={{xs: "column", md: "row"}} p={2} spacing={4} bgcolor={"#f5f6fa"} mb={2}>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-pharmacy/"}>Medicine List</Link></Button>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-pharmacy/add-medicine-category"}>Add Medicine Category</Link></Button>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-pharmacy/add-medicine"}>Add Medicine</Link></Button>
        </Stack>
    );
};

export default PharmacyNavbar;