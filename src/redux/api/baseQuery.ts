import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import { AxiosRequestConfig, AxiosError } from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, updateToken } from "../slices/authSlice";
const baseUrl = "http://localhost:5098/";
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "http://localhost:5098/" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
const baseQuery = axiosBaseQuery({ baseUrl });
const baseQueryWithReauth: BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
  },
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const {
    auth: { jwtToken },
  } = api.getState() as RootState;
  let result = await baseQuery(
    {
      ...args,
      headers: { ...args.headers, Authorization: `Bearer ${jwtToken}` },
    },
    api,
    extraOptions
  );
  if (result.error && (result.error as AxiosError).status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(args, api, extraOptions);
    if (refreshResult.data) {
      const { jwtToken: refreshedToken } = refreshResult.data as {
        jwtToken: string;
      };
      api.dispatch(updateToken(refreshedToken));
      result = await baseQuery(
        {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${refreshedToken}`,
          },
        },
        api,
        extraOptions
      );
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  tagTypes: ["Key", "Vendor", "User", "Category", "CreatedKeys"],
});
export { baseQueryWithReauth as axiosBaseQuery, baseUrl };
