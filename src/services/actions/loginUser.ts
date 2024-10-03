"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";

export const loginUser = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const response = await res.json();

  if (response.success && response.data) {
    cookies().set(process.env.NEXT_PUBLIC_AUTH_KEY as string, response.data, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }


  return response;
};
