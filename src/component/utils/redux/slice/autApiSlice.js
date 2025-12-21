import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes:["Admin"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
    credentials: "include", // IMPORTANT for cookies
  }),
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

    getAdmin: builder.query({
      query: () => "/admin/me",
      providesTags: ["Admin"],
    }), 
  }),
});

export const {
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useGetAdminQuery,
} = authApi;
