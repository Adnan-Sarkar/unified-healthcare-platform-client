import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
import {TAmbulance} from "@/types";

const ambulanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addAmbulanceCategory: builder.mutation({
            query: (data) => ({
                url: `/ambulance/ambulance-category`,
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.ambulance]
        }),

        getAllAmbulanceCategories: builder.query({
            query: () => ({
                url: `/ambulance/ambulance-category`,
                method: "GET",
            }),
            providesTags: [tagTypes.ambulance],
        }),

        addAmbulance: builder.mutation({
            query: (data) => ({
                url: `/ambulance/register-ambulance`,
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.ambulance]
        }),

        getAllAmbulances: builder.query({
            query: (query: Record<string, any>) => ({
                url: `/ambulance`,
                method: "GET",
                params: query
            }),
            providesTags: [tagTypes.ambulance],
        }),

        updateAmbulanceInfo: builder.mutation({
            query: ({updatedInfo, id}: {updatedInfo: TAmbulance, id: string}) => ({
                url: `/ambulance/${id}`,
                method: "PATCH",
                data: updatedInfo
            }),
            invalidatesTags: [tagTypes.ambulance],
        }),

    }),
});

export const {
    useAddAmbulanceCategoryMutation,
    useGetAllAmbulanceCategoriesQuery,
    useAddAmbulanceMutation,
    useGetAllAmbulancesQuery,
    useUpdateAmbulanceInfoMutation
} = ambulanceApi;
