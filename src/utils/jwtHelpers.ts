import {TAccountStatus, TTokenData, TUserRoles} from "@/types";
import { jwtDecode } from "jwt-decode";

export const decodedToken = (
  token: string
): TTokenData => {
  return jwtDecode(token);
};