import { apiSlice } from "./apiSlice";

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------- ABOUT US ---------------- */

    getAboutUs: builder.query({
  query: () => "/about",  // ✅ Fixed: Backend GET route
  providesTags: ["AboutUs"],
}),

saveAboutUs: builder.mutation({
  query: (formData) => ({
    url: "/about",        // ✅ Fixed: Backend POST route  
    method: "POST",
    body: formData,
  }),
  invalidatesTags: ["AboutUs"],
}),

updateAboutUs: builder.mutation({     // ✅ NEW: Separate UPDATE
  query: (formData) => ({
    url: `/about/${formData.id}`,  // ✅ Fixed: Backend PUT route + ID
    method: "PUT",
    body: formData,
  }),
  invalidatesTags: ["AboutUs"],
}),

deleteAboutUs: builder.mutation({
  query: (aboutId) => ({        // ✅ Fixed: Pass ID
    url: `/about/${aboutId}`,
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
