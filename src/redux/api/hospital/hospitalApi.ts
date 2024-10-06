import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
import {THospital} from "@/types";

const hospitalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addNewHospital: builder.mutation({
            query: (data) => ({
                url: `/hospital/register-hospital`,
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.hospital]
        }),

        getAllHospitals: builder.query({
            query: (query: Record<string, any>) => ({
                url: `/hospital/`,
                method: "GET",
                params: query
            }),
            providesTags: [tagTypes.hospital],
        }),

        updateHospitalInfo: builder.mutation({
            query: ({updatedInfo, id}: {updatedInfo: THospital, id: string}) => ({
                url: `/hospital/${id}`,
                method: "PATCH",
                data: updatedInfo
            }),
            invalidatesTags: [tagTypes.hospital],
        }),

        deleteHospitalInfo: builder.mutation({
            query: (id: string) => ({
                url: `/hospital/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.hospital],
        }),

    }),
});

export const {
    useAddNewHospitalMutation,
    useUpdateHospitalInfoMutation,
    useGetAllHospitalsQuery,
    useDeleteHospitalInfoMutation
} = hospitalApi;
