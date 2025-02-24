import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    statusChange: builder.mutation({
      query: (data) => (console.log(data.status),{
        url: `/admin/users/${data.userId}/block`,
        method: "PATCH",
        body: {status: data.status},
      }),
     invalidatesTags: ['user']
    }),
  }),
});

export const { useGetAllUsersQuery, useStatusChangeMutation } = userApi;
