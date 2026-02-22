import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ---------------------------
    // GET ALL ORDERS (filters + pagination)
    // GET /api/orders/getall
    // ---------------------------
    getAllOrders: builder.query({
      query: ({
        page = 1,
        limit = 10,
        status,
        paymentStatus,
        shipmentStatus,
        orderId,
        userId,
      } = {}) => ({
        url: "/orders/getall",
        params: {
          page,
          limit,
          ...(status && { status }),
          ...(paymentStatus && { paymentStatus }),
          ...(shipmentStatus && { shipmentStatus }),
          ...(orderId && { orderId }),
          ...(userId && { userId }),
        },
      }),
      providesTags: (result) =>
        result?.orders
          ? [
              ...result.orders.map(({ _id }) => ({
                type: "Order",
                id: _id,
              })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
      keepUnusedDataFor: 60,
    }),

  }),
});


export const {
  useGetAllOrdersQuery,
} = ordersApiSlice;