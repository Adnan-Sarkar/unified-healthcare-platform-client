"use client";

import React from 'react';
import Navbar from "@/components/navbar/Navbar";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem, Pagination,
    Select,
    Stack
} from "@mui/material";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {useGetAllAmbulanceCategoriesQuery, useGetAllAmbulancesQuery} from "@/redux/api/ambulance/ambulanceApi";
import Grid from "@mui/material/Grid2";
import {TAmbulance} from "@/types";
import AmbulanceCard from "@/components/ui/ambulanceCard/AmbulanceCard";

type FormData = {
    filterBy: string;
};

const Page = () => {
    const [searchValue, setSearchValue] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [limit] = React.useState(15);
    const [filterBy, setFilterBy] = React.useState("");

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            filterBy: filterBy,
        },
    });

    const query: Record<string, any> = {
        page,
        limit,
        search: searchValue,
        filterBy: filterBy
    };

    const {data, isLoading} = useGetAllAmbulancesQuery(query);
    const {data: categoriesData} = useGetAllAmbulanceCategoriesQuery({});

    let pageCount: number = page;
    if (data?.data?.meta?.total) {
        pageCount = Math.ceil(data?.data?.meta?.total / limit);
    }

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
                                            Search Ambulance
                                        </Button>
                                        <Button variant={"contained"} color={"error"} sx={{width: "20%"}} onClick={handleRemoveSearch}>
                                            Remove Search
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Form>
                            <form style={{width: "20%"}} onSubmit={handleSubmit(handleFilterAmbulance)}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="filter-by-label">Filter By</InputLabel>
                                    <Controller
                                        name="filterBy"
                                        control={control}
                                        render={({field}) => (
                                            <Select
                                                size={"small"}
                                                {...field}
                                                labelId="filter-by-label"
                                                label="Filter By"
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    handleSubmit(handleFilterAmbulance)();
                                                }}
                                            >
                                                <MenuItem key={999} value={""}>all</MenuItem>
                                                {
                                                    categoriesData?.data &&
                                                    categoriesData?.data.map((category: {categoryName: string; id: string}) => {
                                                        return <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </form>
                        </Stack>
                    </Box>

                    {/*ambulance list*/}
                    <Grid container gap={4}>
                        {
                            isLoading?
                                <CircularProgress size={"large"} />
                                :
                                data?.data?.data &&
                                data?.data?.data?.map((ambulance: TAmbulance) => {
                                    return (
                                        <Grid size={12} key={ambulance.id}>
                                            <AmbulanceCard ambulanceInfo={ambulance} />
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