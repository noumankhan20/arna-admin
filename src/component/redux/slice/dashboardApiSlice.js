import { apiSlice } from "./apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => "/dashboard/stats",
            providesTags: ["Products", "Admin"],
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
} = dashboardApi;
