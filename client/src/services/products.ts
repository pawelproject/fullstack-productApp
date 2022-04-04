// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { Product } from "../types/Product";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
      //   query: (name) => `products/${name}`,
    }),
    getProductDetails: builder.query({
      query: (id: string) => `products?id=${id}`,
    }),
    createProduct: builder.mutation({
      query: (body: Product) => ({
        url: `products/create`,
        method: "POST",
        body: body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    editProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} = productsApi;
