import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TUserSliceState = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    phone: string;
    location: string;
    roles: string;
    accountStatus: "";
    dateOfBirth: string;
    bloodGroup: string;
    profilePicture: string;
};

const initialState: TUserSliceState = {
    id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    location: "",
    roles: "",
    accountStatus: "",
    dateOfBirth: "",
    bloodGroup: "",
    profilePicture: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<TUserSliceState>) => {
            const {
                id,
                name,
                firstName,
                lastName,
                email,
                password,
                gender,
                phone,
                location,
                roles,
                accountStatus,
                dateOfBirth,
                bloodGroup,
                profilePicture,
            } = action.payload;

            state.id = id;
            state.name = name;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.password = password;
            state.gender = gender;
            state.phone = phone;
            state.location = location;
            state.roles = roles;
            state.accountStatus = accountStatus;
            state.dateOfBirth = dateOfBirth;
            state.bloodGroup = bloodGroup;
            state.profilePicture = profilePicture;
        },

        removeUser: (state) => {
            state.id = "";
            state.name = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.password = "";
            state.gender = "";
            state.phone = "";
            state.location = "";
            state.roles = "";
            state.accountStatus = "";
            state.dateOfBirth = "";
            state.bloodGroup = "";
            state.profilePicture = "";
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
