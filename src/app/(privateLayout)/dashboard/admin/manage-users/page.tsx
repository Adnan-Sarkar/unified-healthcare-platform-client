"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, Button, Chip, Pagination, Stack, Grid } from "@mui/material";
import { TUser } from "@/types";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import {useChangeAccountStatusMutation, useGetAllUsersQuery} from "@/redux/api/user/userApi";
import UserDetailsModal from "@/app/(privateLayout)/dashboard/admin/manage-users/_components/UserDetailsModal";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import {FieldValues} from "react-hook-form";

const ManageUsersPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [userDetailsInfo, setUserDetailsInfo] = React.useState<TUser>();
  const [page, setPage] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);
  const [limit] = React.useState(5);

  const query: Record<string, any> = {
    page,
    limit,
    search: searchValue
  };

  const {data, isLoading} = useGetAllUsersQuery(query);
  const [changeAccountStatus] = useChangeAccountStatusMutation();

  let userData;
  if (data?.data?.data?.length > 0 && !isLoading) {
    userData = data?.data?.data?.map((user: TUser, index: number) => {
      return {
        ...user,
        rowSerial: (index + 1)
      }
    });
  }


  let pageCount: number = 1;
  if (data?.data?.meta?.total) {
    pageCount = Math.ceil(data?.data?.meta?.total / limit);
  }

  console.log(pageCount)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleUserDetails = (userInfo: TUser) => {
    setUserDetailsInfo(userInfo);
    setIsModalOpen(true);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentUserId(null);
  };

  const handleChangeUserStatus = async (status: string) => {
    const toastId = toast.loading("Changing Status...", {
      id: "toastId"
    });

    try {
      const res = await changeAccountStatus({
        id: currentUserId as string,
        status: {
          accountStatus: status
        }
      }).unwrap();
      console.log(res)
      if (res.success) {
        toast.success("User status changed successfully", {
          id: toastId
        });
      }
      else {
        throw new Error(res.message);
      }
    }
    catch (error: any) {
      toast.error(error.message, {
        id: toastId
      })
    }
    handleClose();
  }

  const handleSearchUsers = (values: FieldValues) => {
    setSearchValue(values.searchUser);
  }

  const handleRemoveSearch = () => {
    setSearchValue("");
  }

  const open = Boolean(anchorEl);

  const manageUsersColumns: GridColDef[] = [
    { field: 'rowSerial', headerName: 'Serial', maxWidth: 70, sortable: false},
    {
      field: 'profilePicture',
      headerName: 'Picture',

      minWidth: 100,
      sortable: false,
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        return (
            <Avatar
                alt="profile"
                src={row?.profilePicture}
                sx={{ width: 70, height: 70 }}
                variant="rounded"
            />
        );
      },
    },
    { field: 'name', headerName: 'Name',  minWidth: 200, sortable: false },
    {
      field: 'email', headerName: 'Email',  minWidth: 250, sortable: false
    },
    {
      field: 'phone', headerName: 'Contact Number',  minWidth: 200, sortable: false
    },
    {
      field: 'location', headerName: 'Location',  minWidth: 200, sortable: false
    },
    {
      field: 'gender', headerName: 'Gender',  minWidth: 70, sortable: false
    },
    {
      field: 'bloodGroup',
      headerName: 'Blood Group',
      minWidth: 150, sortable: false
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      minWidth: 150, sortable: false
    },
    {
      field: 'roles',
      headerName: 'User Roles',
      minWidth: 200,
      sortable: false,
      renderCell: ({row}) => {
        const roles = row.roles?.split(',');
        const roleChips = roles?.map((role: string) => {
          let color: "error" | "primary" | "success"| "default";
          switch (role.trim()) {
            case 'admin':
              color = 'error';
              break;
            case 'user':
            case 'patient':
            case 'donor':
              color = 'primary';
              break;
            case 'doctor':
              color = 'success';
              break;
            default:
              color = 'default';
          }
          return <Chip key={role} label={role.trim()} color={color} size="small" style={{ margin: '2px' }} />;
        });

        return <div>{roleChips}</div>;
      },
    },
    {
      field: 'accountStatus',
      headerName: 'Account Status',
      minWidth: 150,
      sortable: false,
      renderCell: ({row}) => {
        if (row?.accountStatus === "blocked") {
          return (
              <Chip icon={<BlockRoundedIcon fontSize={"small"} />} variant={"outlined"} label={row?.accountStatus} color="error" />
          );
        }
        else {
          return (
              <Chip icon={<CheckCircleOutlineOutlinedIcon fontSize={"small"} /> } variant={"outlined"} label={row?.accountStatus} color="success" />
          );
        }
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 400,
      sortable: false,
      headerAlign: "center",
      align: "center",
      cellClassName: "flex items-center justify-center",
      renderCell: ({row}) => {
        const isMenuOpen = open && anchorEl?.id === row.id;

        return (
            <Stack direction={"row"} spacing={1}>
              <Button onClick={() => handleUserDetails(row)} variant={"contained"} color={"primary"}>
                <VisibilityOutlinedIcon />
                <Box mx={0.5}></Box>
                Details
              </Button>
              <>
                <Button
                    variant={"outlined"}
                    id={`basic-button-${row.id}`}
                    aria-controls={isMenuOpen ? `basic-menu-${row.id}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? "true" : undefined}
                    onClick={(event) => handleClick(event, row.id)}
                    color={"primary"}
                >
                  Change Account Status
                </Button>
                <Menu
                    id={`basic-menu-${row.id}`}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button"
                    }}
                >
                  <MenuItem onClick={() => handleChangeUserStatus("active")}>Active</MenuItem>
                  <MenuItem onClick={() => handleChangeUserStatus("blocked")}>Blocked</MenuItem>
                </Menu>
              </>
            </Stack>
        );
      },
    },
  ];


  return (
      <Box sx={{ height: 400, width: '100%' }}>
        {
          <UserDetailsModal open={isModalOpen} setOpen={setIsModalOpen} userInfo={userDetailsInfo as TUser} />
        }
        <Box my={2}>
          <Form onSubmit={handleSearchUsers} defaultValues={{
            searchUser: searchValue
          }}>
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Stack direction={"row"} sx={{width: "70%"}} justifyContent={"center"} alignItems={"center"}>
                <InputField name={"searchUser"} placeholder={"Search Users"} fullWidth={true} sx={{width: "60%"}} />
                <Button variant={"contained"} color={"primary"} type={"submit"} sx={{width: "15%"}}>
                  Search User
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
            rows={isLoading ? [] : userData || []}
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