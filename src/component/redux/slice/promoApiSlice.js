import { apiSlice } from "./apiSlice";

export const promoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ---------------------------
    // CREATE PROMO
    // POST /api/promos/create
    // ---------------------------
    createPromo: builder.mutation({
      query: (data) => ({
        url: "/promos/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Promo"],
    }),

    // ---------------------------
    // GET ALL PROMOS (filters + pagination)
    // GET /api/promos/get
    // ---------------------------
    getAllPromos: builder.query({
      query: ({
        page = 1,
        limit = 10,
        isActive,
        appliesTo,
        promoCode,
      } = {}) => ({
        url: "/promos/get",
        params: {
          page,
          limit,
          ...(isActive !== undefined && { isActive }),
          ...(appliesTo && { appliesTo }),
          ...(promoCode && { promoCode }),
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Promo",
                id: _id,
              })),
              { type: "Promo", id: "LIST" },
            ]
          : [{ type: "Promo", id: "LIST" }],
      keepUnusedDataFor: 60,
    }),

    // ---------------------------
    // GET PROMO BY ID
    // GET /api/promos/:id/get
    // ---------------------------
    getPromoById: builder.query({
      query: (id) => `/promos/${id}/get`,
      providesTags: (result, error, id) => [{ type: "Promo", id }],
    }),

    // ---------------------------
    // UPDATE PROMO
    // PUT /api/promos/:id/update
    // ---------------------------
    updatePromo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/promos/${id}/update`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Promo", id },
        { type: "Promo", id: "LIST" },
      ],
    }),

    // ---------------------------
    // DELETE PROMO
    // DELETE /api/promos/:id/delete
    // ---------------------------
    deletePromo: builder.mutation({
      query: (id) => ({
        url: `/promos/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Promo", id: "LIST" }],
    }),

    // ---------------------------
    // TOGGLE PROMO STATUS
    // PATCH /api/promos/:id/toggle
    // ---------------------------
    togglePromoStatus: builder.mutation({
      query: (id) => ({
        url: `/promos/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Promo", id },
        { type: "Promo", id: "LIST" },
      ],
    }),

  }),
});

// 🔥 Hooks
export const {
  useCreatePromoMutation,
  useGetAllPromosQuery,
  useGetPromoByIdQuery,
  useUpdatePromoMutation,
  useDeletePromoMutation,
  useTogglePromoStatusMutation,
} = promoApiSlice;
