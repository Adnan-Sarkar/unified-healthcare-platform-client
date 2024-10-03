export type TUserRoles =
  | "admin"
  | "user"
  | "super_admin"
  | "doctor"
  | "patient"
  | "donor";

export type TAccountStatus = "active" | "blocked";


export type TTokenData = {
    id: string;
    email: string;
    roles: TUserRoles[];
    token: string;
    accountStatus: TAccountStatus;
}