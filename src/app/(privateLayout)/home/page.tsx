"use client";

import React, {useEffect} from 'react';
import Navbar from "@/components/navbar/Navbar";
import {getUserInfo} from "@/services/auth.services";
import {useLoggedInUserQuery} from "@/redux/api/user/userApi";
import {useAppDispatch} from "@/redux/hooks";
import {setUser} from "@/redux/features/user/userSlice";

const Page = () => {
    const userInfo = getUserInfo();
    const {data: userData, isLoading} = useLoggedInUserQuery(userInfo?.id as string);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userData?.data) {
            dispatch(setUser(userData?.data));
        }
    }, [userData, dispatch])

    return (
        <>
            <Navbar />
        </>
    );
};

export default Page;