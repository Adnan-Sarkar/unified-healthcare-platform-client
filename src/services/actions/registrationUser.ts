"use server";

import { FieldValues } from "react-hook-form";

export const registrationUser = async (data: FieldValues) => {
  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/registration`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await res.json();
};
