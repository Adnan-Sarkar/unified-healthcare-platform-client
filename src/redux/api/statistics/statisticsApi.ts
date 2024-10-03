import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsersStatistics: builder.query({
            query: () => ({
                url: `/user/meta-data`,
                method: "GET",
            }),
            providesTags: [tagTypes.myself, tagTypes.user, tagTypes.medicine, tagTypes.donor, tagTypes.doctor],
        }),
    }),
});

export const {
    useGetUsersStatisticsQuery,
} = userApi;
