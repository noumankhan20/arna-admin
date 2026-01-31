import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
    }),

    logoutAdmin: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    getAdminProfile: builder.query({
      query: () => "/admin/me",
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useGetAdminProfileQuery,
} = authApi;
