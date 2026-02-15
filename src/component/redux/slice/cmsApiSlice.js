import { apiSlice } from "./apiSlice";

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------- ABOUT US ---------------- */

    getAboutUs: builder.query({
      query: () => "/about",
      providesTags: ["AboutUs"],
    }),

    saveAboutUs: builder.mutation({
      query: (formData) => ({
        url: "/about",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    updateAboutUs: builder.mutation({
      query: (formData) => ({
        url: `/about/${formData.id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),

    deleteAboutUs: builder.mutation({
      query: (aboutId) => ({
        url: `/about/${aboutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AboutUs"],
    }),


    /* ---------------- HOME HERO ---------------- */

    getHomeHero: builder.query({
      query: (section) => ({
        url: "/cms/hero",
        params: section ? { section } : {},
      }),
      providesTags: ["CMS"],
    }),

    saveHomeHero: builder.mutation({
      query: (formData) => ({
        url: "/cms/hero",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CMS"],
    }),

    deleteHomeHero: builder.mutation({
      query: (section) => ({
        url: "/cms/hero",
        method: "DELETE",
        params: { section },
      }),
      invalidatesTags: ["CMS"],
    }),

    getOurStory: builder.query({
      query: () => "/our-story/get",
      providesTags: ["OurStory"],
    }),

    updateOurStory: builder.mutation({
      query: (data) => ({
        url: "/our-story/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["OurStory"],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useSaveAboutUsMutation,
  useDeleteAboutUsMutation,
  useGetHomeHeroQuery,
  useSaveHomeHeroMutation,
  useDeleteHomeHeroMutation,
  useGetOurStoryQuery,
  useUpdateOurStoryMutation,
} = cmsApi;
