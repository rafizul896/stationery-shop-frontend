import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/orders",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: (data) => (
        console.log(data),
        {
          url: `/orders/${data.orderId}`,
          method: "PATCH",
          body: { status: data.status },
        }
      ),
      invalidatesTags: ["order"],
    }),
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = orderApi;
