import React, {useEffect, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button, CircularProgress, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import { removeToken } from "@/redux/features/user/tokenSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useLoggedInUserQuery } from "@/redux/api/user/userApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.services";
import deleteCookie from "@/services/actions/deleteCookie";
import {TTokenData} from "@/types";

type TProps = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
};

const DashboardAppbar = ({ drawerWidth, handleDrawerToggle }: TProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<TTokenData | null>(null);
  const { data, isLoading } = useLoggedInUserQuery(userData?.id || "");

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo?.id) {
      setUserData(userInfo);
    }
  }, []);


  const handleLogout = async () => {
    dispatch(removeToken());
    await deleteCookie();
    removeUserInfo();
    router.push("/adminLogin");
    router.refresh();
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        p: 0,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <Typography variant="h6" noWrap component="div">
            Welcome, {data?.data.name}
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Avatar src={data?.data?.profilePicture} />
            )}
            <Button variant="contained" color={"error"} onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppbar;
