"use client";

import {Container, Stack, Typography} from "@mui/material";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import ProfileAvatar from "@/components/navbar/ProfileAvatar";

const Navbar = () => {
    return (
        <Stack direction={"row"} py={2} sx={{
            borderBottom: "1px solid #ecf0f1"
        }}>
            <Container>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack>
                        <Image src={logo} alt={"Logo"} width={250} height={120} />
                    </Stack>

                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={4}>
                        <Stack direction={"row"} alignItems={"center"} spacing={4}>
                            <Link href={"/home"} >
                                <Typography fontSize={16} variant={"h6"} fontWeight={"bold"}>Home</Typography>
                            </Link>

                            <Link href={"/pharmacy"} >
                                <Typography fontSize={16} variant={"h6"} fontWeight={"bold"}>Pharmacy</Typography>
                            </Link>

                            <Link href={"/blood-bank"} >
                                <Typography fontSize={16} variant={"h6"} fontWeight={"bold"}>Blood Bank</Typography>
                            </Link>

                            <Link href={"/blogs"} >
                                <Typography fontSize={16} variant={"h6"} fontWeight={"bold"}>Blogs</Typography>
                            </Link>

                            <Link href={"/ambulance"} >
                                <Typography fontSize={16} variant={"h6"} fontWeight={"bold"}>Ambulance</Typography>
                            </Link>

                            <Link href={"/hospital"} >
                                <Typography fontSize={16} variant={"h6"} fontWeight={"bold"}>Hospital</Typography>
                            </Link>
                        </Stack>

                        <Stack>
                            <ProfileAvatar />
                        </Stack>

                    </Stack>
                </Stack>
            </Container>
        </Stack>
    );
};

export default Navbar;