import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products/getall",
      providesTags: ["Products"],
    }),

    getProductBySlug: builder.query({
      query: (slug) => `/products/${slug}`,
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
