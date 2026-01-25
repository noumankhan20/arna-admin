import { apiSlice } from "./apiSlice";

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------- ABOUT US ---------------- */

    getAboutUs: builder.query({
      query: () => "/cms/about",
      providesTags: ["AboutUs"],
    }),

    saveAboutUs: builder.mutation({
      query: (formData) => ({
        url: "/cms/about",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    deleteAboutUs: builder.mutation({
      query: () => ({
        url: "/cms/about",
        method: "DELETE",
      }),
      invalidatesTags: ["AboutUs"],
    }),

    /* ---------------- HOME HERO ---------------- */

    getHomeHero: builder.query({
      query: () => "/cms/hero",
      providesTags: ["AboutUs"],
    }),

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

export const {
  useGetAboutUsQuery,
  useSaveAboutUsMutation,
  useDeleteAboutUsMutation,
  useGetHomeHeroQuery,
  useSaveHomeHeroMutation,
} = cmsApi;
