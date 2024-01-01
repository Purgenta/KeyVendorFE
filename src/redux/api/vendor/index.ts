import { emptySplitApi } from "../baseQuery";

import type { Vendor } from "./types";
export const vendorApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query<Vendor[], void>({
      query: () => ({
        url: "vendor/",
        method: "GET",
      }),
    }),
  }),
});
