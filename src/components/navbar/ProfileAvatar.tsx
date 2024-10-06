"use client";

import { removeUserInfo} from "@/services/auth.services";
import {Avatar, MenuItem, Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {removeToken} from "@/redux/features/user/tokenSlice";
import deleteCookie from "@/services/actions/deleteCookie";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Logout} from "@mui/icons-material";

const ProfileAvatar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        removeUserInfo();
        await deleteCookie();
        dispatch(removeToken());
        router.push("/login");
    }

    return (
        <>
            <Tooltip title="Profile">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'profile' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 50, height: 50 }} src={user.profilePicture}/>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="profile"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
                <Link href={`/dashboard/user/profile`} onClick={handleClose}>
                    <MenuItem>
                        <Typography fontWeight={500}>
                            Dashboard
                        </Typography>
                    </MenuItem>
                </Link>

                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileAvatar;