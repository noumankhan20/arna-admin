import { apiSlice } from "./apiSlice";

export const adminTicketsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET ALL TICKETS (Admin Panel)
    getAllTickets: builder.query({
      query: () => "/tickets/get",
      providesTags: ["Tickets"],
    }),

    // 🔹 GET SINGLE TICKET
    getTicketById: builder.query({
      query: (id) => `/tickets/${id}/get`,
      providesTags: ["Tickets"],
    }),

    // 🔹 UPDATE TICKET STATUS
    updateTicketStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tickets/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Tickets"],
    }),

    // 🔹 DELETE TICKET
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/tickets/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateTicketStatusMutation,
  useDeleteTicketMutation,
} = adminTicketsApi;
