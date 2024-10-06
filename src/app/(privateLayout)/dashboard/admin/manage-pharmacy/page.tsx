"use client";

import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack} from "@mui/material";
import {useGetAllMedicinesQuery, useGetMedicineCategoriesQuery} from "@/redux/api/medicine/medicineApi";
import React, {useState} from "react";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {Controller, FieldValues, useForm} from "react-hook-form";
import MedicineCardAdmin from "@/components/ui/MedicineCardAdmin";
import {TMedicine} from "@/types";

type FormData = {
    filterBy: string;
};

const ManagePharmacyPage = () => {
    const [searchValue, setSearchValue] = React.useState("");
    const [filterBy, setFilterBy] = React.useState("");
    const [limit] = React.useState(15);
    const [page, setPage] = React.useState(1);
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


    const {data} = useGetMedicineCategoriesQuery({});
    const {data: medicinesData, isLoading: isMedicineLoading} = useGetAllMedicinesQuery(query);
    console.log(medicinesData);

    const handleSearchMedicines = (values: FieldValues) => {
        setSearchValue(values.searchProducts);
    }

    const handleFilterMedicines = (values: FieldValues) => {
        setFilterBy(values.filterBy);
    }

    const handleRemoveSearch = () => {
        setSearchValue("");
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    let pageCount: number = page;
    if (medicinesData?.data?.meta?.total) {
        pageCount = Math.ceil(medicinesData?.data?.meta?.total / limit);
    }


  return (
    <Stack direction={{xs: "column", md: "row"}} mt={2} width={"100%"}>
    {/*  List medicine categories */}
      <Stack width={"20%"} direction={{xs: "row", md: "column"}} bgcolor={"#f5f6fa"} p={4} spacing={2}>
          {
              <Button onClick={() => setFilterBy("")} variant={"outlined"} key={"all-category"}>All Category</Button>
          }
          {
              data?.data
              && data?.data?.length > 0 &&
              data?.data?.map((category: {id: string; categoryName: string}) => {
                  return <Button onClick={() => setFilterBy(category.id)} variant={"outlined"} key={category.id}>{category.categoryName}</Button>
              })
          }
      </Stack>

    {/*  medicine list */}
        <Stack direction={{xs: "row", md: "column"}} px={2} spacing={2} width={"80%"}>
            {/* Medicine search bar */}
            <Stack direction={{xs: "column", md: "row"}} width={"100%"} my={2} justifyContent={"start"}>
                <Form onSubmit={handleSearchMedicines} defaultValues={{
                    searchProducts: searchValue
                }}>
                    <Stack justifyContent={"center"} alignItems={"center"} width={"100%"}>
                        <Stack direction={"row"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
                            <InputField name={"searchProducts"} placeholder={"Search Products"} fullWidth={true}
                                        sx={{width: "60%"}}/>
                            <Button variant={"contained"} color={"primary"} type={"submit"} sx={{width: "20%"}}>
                                Search Products
                            </Button>
                            <Button variant={"contained"} color={"error"} sx={{width: "20%"}}
                                    onClick={handleRemoveSearch}>
                                Remove Search
                            </Button>
                        </Stack>
                    </Stack>
                </Form>

                <form style={{width: "20%"}} onSubmit={handleSubmit(handleFilterMedicines)}>
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
                                        handleSubmit(handleFilterMedicines)();
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="inStock">In Stock</MenuItem>
                                    <MenuItem value="outOfStock">Out of Stock</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </form>
            </Stack>

            {/*  Medicine item  */}
            <Grid container spacing={2}>
                {
                    medicinesData?.data?.medicines
                    && medicinesData?.data?.medicines?.length > 0 &&
                    medicinesData?.data?.medicines?.map((medicine: TMedicine) => {
                        return <Grid item xs={12} md={4} lg={3} key={medicine.id}>
                            <MedicineCardAdmin medicineInfo={medicine}/>
                        </Grid>
                    })
                }
                <Grid item xs={12}>
                    <Box
                        py={2}
                        sx={
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#f5f6fa"
                            }
                        }
                    ><Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color={"primary"}/>
                    </Box>
                </Grid>
            </Grid>

        </Stack>
    </Stack>
  )
}

export default ManagePharmacyPage;