"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  Box, Button,  Pagination, Stack } from "@mui/material";
import {THospital} from "@/types";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {FieldValues} from "react-hook-form";
import {useGetAllHospitalsQuery} from "@/redux/api/hospital/hospitalApi";
import UpdateHospitalModal
  from "@/app/(privateLayout)/dashboard/admin/manage-hospitals/_components/UpdateHospitalModal";

const ManageHospitalsPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [hospitalInfo, setHospitalInfo] = React.useState<THospital>();
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(15);

  const query: Record<string, any> = {
    page,
    limit,
    search: searchValue
  };

  const {data, isLoading} = useGetAllHospitalsQuery(query);

  let hospitalData;
  if (data?.data?.data?.length > 0 && !isLoading) {
    hospitalData = data?.data?.data?.map((hospital: THospital, index: number) => {
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


  const handleUpdateHospital = (hospitalInfo: THospital) => {
    setHospitalInfo(hospitalInfo);
    setIsModalOpen(true);
  }
  const handleSearchUsers = (values: FieldValues) => {
    setSearchValue(values.searchUser);
  }

  const handleRemoveSearch = () => {
    setSearchValue("");
  }

  const manageUsersColumns: GridColDef[] = [
    { field: 'rowSerial', headerName: 'Serial', maxWidth: 70, sortable: false},
    { field: 'name', headerName: 'Hospital Name',  minWidth: 300, sortable: false },
    {
      field: 'district', headerName: 'District',  minWidth: 80, sortable: false
    },
    {
      field: 'area', headerName: 'Area',  minWidth: 80, sortable: false
    },
    {
      field: 'location', headerName: 'Location',  minWidth: 350, sortable: false
    },
    {
      field: 'contactNumber', headerName: 'Contact Number',  minWidth: 150, sortable: false
    },
    {
      field: 'website',
      headerName: 'Website',
      minWidth: 250, sortable: false
    },
    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {

        return (
            <Stack direction={"row"} spacing={1}>
              <Button
                  variant={"outlined"}
                  onClick={() => handleUpdateHospital(row)}
                  color={"primary"}
              >
                Update Hospital
              </Button>
            </Stack>
        );
      },
    },
  ];


  return (
      <Box sx={{ height: 400, width: '100%' }}>
        {
          <UpdateHospitalModal open={isModalOpen} setOpen={setIsModalOpen} hospitalInfo={hospitalInfo as THospital} />
        }
        <Box my={2}>
          <Form onSubmit={handleSearchUsers} defaultValues={{
            searchUser: searchValue
          }}>
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Stack direction={"row"} sx={{width: "70%"}} justifyContent={"center"} alignItems={"center"}>
                <InputField name={"searchUser"} placeholder={"Search name, district, area"} fullWidth={true} sx={{width: "60%"}} />
                <Button variant={"contained"} color={"primary"} type={"submit"} sx={{width: "20%"}}>
                  Search Hospitals
                </Button>
                <Button variant={"contained"} color={"error"} sx={{width: "15%"}} onClick={handleRemoveSearch}>
                  Remove Search
                </Button>
              </Stack>
            </Stack>
          </Form>
        </Box>
        <DataGrid
            rowHeight={100}
            rows={isLoading ? [] : hospitalData || []}
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

export default ManageHospitalsPage;