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
    deleteOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${data.orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
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
  }),
});

export const {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
