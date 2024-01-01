import { emptySplitApi } from "../baseQuery";

import type { Vendor } from "./types";
export const vendorApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query<Vendor[], void>({
      query: () => ({
        url: "vendor/all",
        method: "GET",
      }),
    }),
    createVendor: builder.mutation<Vendor, Vendor>({
      query: (body) => ({
        url: "vendor/create",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useGetVendorsQuery, useCreateVendorMutation } = vendorApi;
