import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loggedInUser: builder.query({
      query: (userId: string) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.myself],
    }),

    updateUserInfo: builder.mutation({
      query: ({updatedData, id}: {updatedData: Record<string, string>, id: string}) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: updatedData
      }),
      invalidatesTags: [tagTypes.user, tagTypes.myself]
    }),

    changePassword: builder.mutation({
      query: ({updatedData, id}: {updatedData: Record<string, string>, id: string}) => ({
        url: `/user/change-password/${id}`,
        method: "PATCH",
        data: updatedData
      }),
      invalidatesTags: [tagTypes.user, tagTypes.myself]
    }),
  }),
});

export const {
  useLoggedInUserQuery,
    useUpdateUserInfoMutation,
    useChangePasswordMutation,
} = userApi;
