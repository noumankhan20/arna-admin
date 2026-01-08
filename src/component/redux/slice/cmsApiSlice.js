import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  tagTypes: ["AboutUs"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Get About Us section
    getAboutUs: builder.query({
      query: () => "/cms/about",
      providesTags: ["AboutUs"],
    }),

    // Create or Update About Us (with image upload)
    saveAboutUs: builder.mutation({
      query: (formData) => ({
        url: "/cms/about",
        method: "POST",
        body: formData, // FormData object containing title, description, and image
      }),
      invalidatesTags: ["AboutUs"],
    }),

    // Delete About Us section (soft delete)
    deleteAboutUs: builder.mutation({
      query: () => ({
        url: "/cms/about",
        method: "DELETE",
      }),
      invalidatesTags: ["AboutUs"],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useSaveAboutUsMutation,
  useDeleteAboutUsMutation,
} = cmsApi;
