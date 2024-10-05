import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
import {TMedicine} from "@/types";

const medicineApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addNewMedicineCategory: builder.mutation({
            query: (data: Record<string, any>) => ({
                url: `/medicine/medicine-category`,
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.medicine]
        }),

        getMedicineCategories: builder.query({
            query: () => ({
                url: `/medicine/medicine-categories`,
                method: "GET",
            }),
            providesTags: [tagTypes.medicine],
        }),

        addNewMedicine: builder.mutation({
            query: (data: Record<string, any>) => ({
                url: `/medicine/register-medicine`,
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.medicine]
        }),

        getAllMedicines: builder.query({
            query: (query: Record<string, any>) => ({
                url: `/medicine`,
                method: "GET",
                params: query
            }),
            providesTags: [tagTypes.medicine],
        }),

        updateMedicine: builder.mutation({
            query: ({updatedInfo, id}: {updatedInfo: Partial<TMedicine>, id: string}) => ({
                url: `/medicine/${id}`,
                method: "PATCH",
                data: updatedInfo
            }),
            invalidatesTags: [tagTypes.medicine]
        }),

    }),
});

export const {
    useAddNewMedicineCategoryMutation,
    useGetMedicineCategoriesQuery,
    useAddNewMedicineMutation,
    useGetAllMedicinesQuery,
    useUpdateMedicineMutation
} = medicineApi;
