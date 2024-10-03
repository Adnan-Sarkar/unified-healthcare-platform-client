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
    exp: number
}

export type TBloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "O+"
    | "O-"
    | "AB+"
    | "AB-";

export type TGender = "male" | "female";

export type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: TGender;
    phone: string;
    location: string;
    accountStatus: TAccountStatus;
    dateOfBirth: string;
    bloodGroup: TBloodGroup;
    profilePicture: string;
};