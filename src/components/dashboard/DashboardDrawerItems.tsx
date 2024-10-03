import React, {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Link from "next/link";
import { Stack } from "@mui/material";
import { generateDrawerItems } from "@/utils/generateDrawerItems";
import { getUserInfo } from "@/services/auth.services";
import {TDrawerItem, TTokenData, TUserRoles} from "@/types";
import DashboardDrawerItem from "@/components/dashboard/DashboardDrawerItem";

const DashboardDrawerItems = () => {
    const [userData, setUserData] = useState<TTokenData | null>(null);

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo?.id) {
            setUserData(userInfo);
        }
    }, []);

  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        my={1}
      >
        <Link href={"/"}>
          {/* <Image
            src={assets.images.logo}
            alt={"Blood Bank"}
            width={200}
            height={50}
            priority={true}
          /> */}
        </Link>
      </Stack>
      <Divider />
      <List>
        {generateDrawerItems(userData?.roles as TUserRoles[])?.map(
          (item: TDrawerItem) => {
            return <DashboardDrawerItem item={item} key={item.title} />;
          }
        )}
      </List>
    </div>
  );
};

export default DashboardDrawerItems;
