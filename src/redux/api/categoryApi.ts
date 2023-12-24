import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../data/axios";
import apiEndpoints from "../../data/api";
type Category = {
  name: string;
  id: string;
};
type Response = {
  name: string;
  id: string;
  childCategories: Category[];
};
export const categoryApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAllRootCategories: builder.query<Response[], string>({
      query: () => apiEndpoints.category.rootCategories,
    }),
    getAllLeafCategories: builder.query<Category[], string>({
      query: () => apiEndpoints.category.rootCategories,
    }),
  }),
});
export const { useGetAllRootCategoriesQuery, useGetAllLeafCategoriesQuery } =
  categoryApi;
