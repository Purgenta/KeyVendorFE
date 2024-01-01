import { emptySplitApi } from "../baseQuery";
import type { Key } from "./types";
export const keyApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getKeys: builder.query<Key[], void>({
      query: () => ({
        url: "key/",
        method: "GET",
      }),
    }),
    createKey: builder.mutation<Key, Key>({
      query: (body) => ({
        url: "key/",
        method: "POST",
        body,
      }),
    }),
  }),
});
