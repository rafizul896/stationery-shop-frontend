import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/products/getAll/reviews",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetAllReviewsQuery } = productApi;
