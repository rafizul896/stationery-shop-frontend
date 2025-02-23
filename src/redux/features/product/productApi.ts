import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import { TProduct } from "@/types/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["product"],
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/products/getAll/reviews",
        method: "GET",
      }),
    }),
    getAllbrands: builder.query({
      query: (params) => ({
        url: "/products/getAll/brands",
        method: "GET",
        params
      }),
      transformResponse: (response: TResponseRedux<string[]>) => {
        return {
          data: response.data,
        };
      }
    }),
  }),
});

export const { useGetAllProductsQuery, useGetAllReviewsQuery,useGetAllbrandsQuery } = productApi;
