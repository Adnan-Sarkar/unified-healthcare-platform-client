"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, Stack} from "@mui/material";
import {TAmbulance, THospital} from "@/types";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {
  useDeleteAmbulanceInfoMutation,
  useGetAllAmbulanceCategoriesQuery,
  useGetAllAmbulancesQuery
} from "@/redux/api/ambulance/ambulanceApi";
import UpdateAmbulanceModal
  from "@/app/(privateLayout)/dashboard/admin/manage-ambulance/_components/UpdateAmbulanceModal";
import toast from "react-hot-toast";

type FormData = {
  filterBy: string;
};

const ManageUsersPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [ambulanceInfo, setAmbulanceInfo] = React.useState<TAmbulance>();
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(15);
  const [filterBy, setFilterBy] = React.useState("");

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      filterBy: filterBy,
    },
  });

  const [deleteAmbulance] = useDeleteAmbulanceInfoMutation();

  const query: Record<string, any> = {
    page,
    limit,
    search: searchValue,
    filterBy: filterBy
  };

  const {data, isLoading} = useGetAllAmbulancesQuery(query);
  const {data: categoriesData} = useGetAllAmbulanceCategoriesQuery({});

  let ambulanceData;
  if (data?.data?.data?.length > 0 && !isLoading) {
    ambulanceData = data?.data?.data?.map((hospital: THospital, index: number) => {
      return {
        ...hospital,
        rowSerial: (index + 1)
      }
    });
  }


  let pageCount: number = 1;
  if (data?.data?.meta?.total) {
    pageCount = Math.ceil(data?.data?.meta?.total / limit);
  }


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  const handleUpdateAmbulance = (ambulanceInfo: TAmbulance) => {
    setAmbulanceInfo(ambulanceInfo);
    setIsModalOpen(true);
  }
  const handleSearchUsers = (values: FieldValues) => {
    setSearchValue(values.searchUser);
  }

  const handleRemoveSearch = () => {
    setSearchValue("");
  }

  const handleFilterAmbulance = (values: FieldValues) => {
    setFilterBy(values.filterBy);
  }

  const handleDeleteAmbulance = async (id: string) => {
    const toastId = toast.loading("Uploading...", {
      id: "uploading",
    });

    try {
      const res = await deleteAmbulance(id).unwrap();

      if (res?.success) {
        toast.success("Ambulance Information Deleted Successfully", {
          id: toastId,
        });
      }
      else {
        throw new Error("Something went wrong! Please try again later.");
      }
    }
    catch (error: any) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  }

  const manageUsersColumns: GridColDef[] = [
    { field: 'rowSerial', headerName: 'Serial', maxWidth: 70, sortable: false},
    { field: 'ownerName', headerName: 'Owner Name',  minWidth: 200, sortable: false },
    {
      field: 'district', headerName: 'District',  minWidth: 150, sortable: false
    },
    {
      field: 'area', headerName: 'Area',  minWidth: 200, sortable: false
    },
    {
      field: 'location', headerName: 'Location',  minWidth: 250, sortable: false
    },
    {
      field: 'categoryName', headerName: 'Category Name',  minWidth: 150, sortable: false
    },
    {
      field: 'contactNumber', headerName: 'Contact Number',  minWidth: 150, sortable: false
    },
    {
      field: 'pricePerKm',
      headerName: 'Price Per Km',
      minWidth: 150, sortable: false
    },
    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 420,
      sortable: false,
      headerAlign: "center",
      align: "center",
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {

        return (
            <Stack direction={"row"} spacing={1}>
              <Button
                  variant={"outlined"}
                  onClick={() => handleUpdateAmbulance(row)}
                  color={"primary"}
              >
                Update Ambulance
              </Button>

              <Button
                  variant={"outlined"}
                  onClick={() => handleDeleteAmbulance(row?.id)}
                  color={"error"}
              >
                Delete Ambulance
              </Button>
            </Stack>
        );
      },
    },
  ];


  return (
      <Box sx={{ height: 400, width: '100%' }}>
        {
          <UpdateAmbulanceModal open={isModalOpen} setOpen={setIsModalOpen} ambulanceInfo={ambulanceInfo as TAmbulance} />
        }
        <Box my={2}>
          <Stack direction={{xs: "column", md: "row"}} width={"100%"} my={2} justifyContent={"start"}>
            <Form onSubmit={handleSearchUsers} defaultValues={{
              searchUser: searchValue
            }}>
              <Stack justifyContent={"center"} alignItems={"center"}>
                <Stack direction={"row"} sx={{width: "100%"}} justifyContent={"center"} alignItems={"center"}>
                  <InputField name={"searchUser"} placeholder={"Search name, district, area"} fullWidth={true}
                              sx={{width: "60%"}}/>
                  <Button variant={"contained"} color={"primary"} type={"submit"} sx={{width: "20%"}}>
                    Search Hospitals
                  </Button>
                  <Button variant={"contained"} color={"error"} sx={{width: "15%"}} onClick={handleRemoveSearch}>
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
        <DataGrid
            rowHeight={100}
            rows={isLoading ? [] : ambulanceData || []}
            columns={manageUsersColumns}
            hideFooterPagination={true}
            loading={isLoading}
            autoHeight={true}
            rowSelection={false}
            slots={{
              footer: () => {
                return <Box
                    sx={
                      {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        my: 2
                      }
                    }
                ><Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color={"primary"}/>
                </Box>
              }
            }}
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: ' none'
              },
              '& .MuiDataGrid-virtualScroller': {
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '4px',
                },
              },
            }}
        />
      </Box>
  );
};

export default ManageUsersPage;