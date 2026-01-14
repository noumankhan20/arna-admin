import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // GET ALL PRODUCTS
    getAllProducts: builder.query({
      query: () => "/products/getall",
      providesTags: ["Products"],
    }),

    // GET PRODUCT BY SLUG
    getProductBySlug: builder.query({
      query: (slug) => `/products/${slug}`,
    }),

    // CREATE PRODUCT (multipart/form-data)
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // DELETE PRODUCT
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
