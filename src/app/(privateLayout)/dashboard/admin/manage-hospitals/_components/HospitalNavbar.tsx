import {Button, Stack} from "@mui/material";
import Link from "next/link";


const HospitalNavbar = () => {
    return (
        <Stack direction={{xs: "column", md: "row"}} p={2} spacing={4} bgcolor={"#f5f6fa"} mb={2}>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-hospitals/"}>Hospital List</Link></Button>
            <Button variant={"outlined"}><Link href={"/dashboard/admin/manage-hospitals/add-hospital"}>Add New Hospital</Link></Button>
        </Stack>
    );
};

export default HospitalNavbar;