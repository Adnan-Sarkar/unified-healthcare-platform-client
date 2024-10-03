"use server";

import { cookies } from "next/headers";

const deleteCookie = async () => {
    cookies().delete(process.env.NEXT_PUBLIC_AUTH_KEY as string);
};

export default deleteCookie;