import { emptySplitApi } from "../baseQuery";
import type { Category } from "./types";
export const categoryApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "category/all",
        method: "GET",
      }),
    }),
    rootCategories: builder.query<Category[], void>({
      query: () => ({
        url: "category/root",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useRootCategoriesQuery } = categoryApi;
