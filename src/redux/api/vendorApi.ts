import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../data/axios";
type Vendor = {
  name: string;
  id: string;
};
export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAllVendors: builder.query<Vendor[], string>({
      query: () => `vendor/allvendors`,
    }),
  }),
});
export const { useGetAllVendorsQuery } = vendorApi;
