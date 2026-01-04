import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  tagTypes: ["CMS"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Get single CMS section
    getCmsSection: builder.query({
      query: (section) => `/cms/about?section=${section}`,
      providesTags: (result, error, section) => [{ type: "CMS", id: section }],
    }),

    // Get all CMS sections
    getAllCmsSections: builder.query({
      query: () => "/cms/about",
      providesTags: ["CMS"],
    }),

    // Save/Update CMS section
    saveCmsSection: builder.mutation({
      query: (data) => ({
        url: "/cms/about",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { section }) => [
        { type: "CMS", id: section },
        "CMS",
      ],
    }),

    // Delete CMS section
    deleteCmsSection: builder.mutation({
      query: (section) => ({
        url: `/cms/about/${section}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, section) => [
        { type: "CMS", id: section },
        "CMS",
      ],
    }),

    // Upload image
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/cms/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    // Delete image
    deleteImage: builder.mutation({
      query: (filename) => ({
        url: `/cms/upload/${filename}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCmsSectionQuery,
  useGetAllCmsSectionsQuery,
  useSaveCmsSectionMutation,
  useDeleteCmsSectionMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
} = cmsApi;
