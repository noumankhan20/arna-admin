import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  tagTypes: ["AboutUs"], // keep existing tag
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    /* ---------------- ABOUT US (EXISTING - UNCHANGED) ---------------- */

    // Get About Us section
    getAboutUs: builder.query({
      query: () => "/cms/about",
      providesTags: ["AboutUs"],
    }),

    // Create or Update About Us
    saveAboutUs: builder.mutation({
      query: (formData) => ({
        url: "/cms/about",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    // Delete About Us section
    deleteAboutUs: builder.mutation({
      query: () => ({
        url: "/cms/about",
        method: "DELETE",
      }),
      invalidatesTags: ["AboutUs"],
    }),

    /* ---------------- HOME HERO (NEW - ADDITIVE) ---------------- */

    // Get Home Hero section
    getHomeHero: builder.query({
      query: () => "/cms/hero",
      providesTags: ["AboutUs"], // reuse tag to avoid touching cache logic
    }),

    // Create or Update Home Hero
    saveHomeHero: builder.mutation({
      query: (formData) => ({
        url: "/cms/hero",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),
  }),
});

/* ---------------- EXPORTS ---------------- */

export const {
  // About Us (existing)
  useGetAboutUsQuery,
  useSaveAboutUsMutation,
  useDeleteAboutUsMutation,

  // Home Hero (new)
  useGetHomeHeroQuery,
  useSaveHomeHeroMutation,
} = cmsApi;
