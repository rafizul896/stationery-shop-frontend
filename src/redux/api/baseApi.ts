import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { logout, setUser } from "../features/auth/authSlice";

interface ErrorResponse {
  message: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://stationery-shop-backend-blush.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const custombaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    const errorData = result?.error?.data as ErrorResponse;
    toast.error(errorData?.message);
  }

  if (result?.error?.status === 403) {
    const errorData = result?.error?.data as ErrorResponse;
    toast.error(errorData?.message);
  }

  if (result?.error?.status === 401) {
    const errorData = result?.error?.data as ErrorResponse;
    toast.error(errorData?.message);
  }

  if (result?.error?.status === 444) {
    const res = await fetch("https://stationery-shop-backend-blush.vercel.app/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: data.data.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: custombaseQuery,
  tagTypes: ["product", "user", "order"],
  endpoints: () => ({}),
});
