"use client"

import React from 'react';
import Navbar from "@/components/navbar/Navbar";
import {FieldValues,} from "react-hook-form";
import {
    Box,
    Button,
    CircularProgress, Container,
    Pagination,
    Stack
} from "@mui/material";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import Grid from "@mui/material/Grid2";
import { THospital} from "@/types";
import {useGetAllHospitalsQuery} from "@/redux/api/hospital/hospitalApi";
import HospitalCard from "@/components/ui/hospitalCard/HospitalCard";

const Page = () => {
    const [searchValue, setSearchValue] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [limit] = React.useState(15);
    const [filterBy, setFilterBy] = React.useState("");

    const query: Record<string, any> = {
        page,
        limit,
        search: searchValue,
        filterBy: filterBy
    };

    const {data, isLoading} = useGetAllHospitalsQuery(query);

    let pageCount: number = page;
    if (data?.data?.meta?.total) {
        pageCount = Math.ceil(data?.data?.meta?.total / limit);
    }

    console.log(data)

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchUsers = (values: FieldValues) => {
        setSearchValue(values.searchUser);
    }

    const handleRemoveSearch = () => {
        setSearchValue("");
    }

    const handleFilterAmbulance = (values: FieldValues) => {
        setFilterBy(values.filterBy);
    }

    return (
        <>
            <Navbar />
            <Container>
                <Box>
                    {/*search bar*/}
                    <Box my={4}>
                        <Stack direction={{xs: "column", md: "row"}} width={"100%"} my={2} justifyContent={"start"}>
                            <Form onSubmit={handleSearchUsers} defaultValues={{
                                searchUser: searchValue
                            }}>
                                <Stack justifyContent={"center"} alignItems={"center"}>
                                    <Stack direction={"row"} sx={{width: "100%"}} justifyContent={"center"} alignItems={"center"}>
                                        <InputField name={"searchUser"} placeholder={"Search name, district, area"} fullWidth={true}
                                                    sx={{width: "60%"}}/>
                                        <Button variant={"contained"} color={"primary"} type={"submit"} sx={{width: "20%"}}>
                                            Search Hospital
                                        </Button>
                                        <Button variant={"contained"} color={"error"} sx={{width: "20%"}} onClick={handleRemoveSearch}>
                                            Remove Search
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Form>
                        </Stack>
                    </Box>

                    {/*ambulance list*/}
                    <Grid container gap={4}>
                        {
                            isLoading?
                                <CircularProgress size={"large"} />
                                :
                                data?.data?.data &&
                                data?.data?.data?.map((hospital: THospital) => {
                                    return (
                                        <Grid size={12} key={hospital.id}>
                                            <HospitalCard hospitalInfo={hospital} />
                                        </Grid>
                                    )
                                })
                        }
                    </Grid>
                    <Stack justifyContent={"center"} alignItems={"center"} width={"100%"} mt={3}>
                        <Box width={"100%"}
                             py={2}
                             sx={
                                 {
                                     display: "flex",
                                     justifyContent: "center",
                                     alignItems: "center",
                                 }
                             }
                        ><Pagination
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                            color={"primary"}/>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default Page;