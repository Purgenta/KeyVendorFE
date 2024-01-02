import { emptySplitApi } from "../baseQuery";

import type { CreateVendorArgs, Vendor } from "./types";
export const vendorApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query<Vendor[], void>({
      query: () => ({
        url: "vendor/all",
        method: "GET",
      }),
    }),
    createVendor: builder.mutation<Vendor, CreateVendorArgs>({
      query: (data) => ({
        url: "vendor/create",
        method: "POST",
        data,
      }),
    }),
  }),
});
export const { useGetVendorsQuery, useCreateVendorMutation } = vendorApi;
