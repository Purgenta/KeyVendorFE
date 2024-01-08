import { PaginatedData } from "../../../types";
import { RootState } from "../../store";
import { emptySplitApi } from "../baseQuery";
import type { CreateKey, Key } from "./types";
export const keyApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getKeys: builder.query<Key[], void>({
      query: () => ({
        url: "key/find",
        method: "GET",
      }),
      providesTags: ["Key"],
    }),
    createKey: builder.mutation<Key, CreateKey>({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("value", data.value);
        formData.append("vendorId", data.vendorId);
        formData.append("price", data.price.toString());
        formData.append("validUntil", data.expirationDate.toISOString());
        formData.append("categoryId", data.categoryId.toString());
        formData.append("photo", data.image[0]);
        formData.append("tax", data.tax.toString());
        return {
          url: "key/create",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "form-data",
          },
        };
      },
      invalidatesTags: ["Key", "CreatedKeys"],
    }),
    updateKey: builder.mutation<Key, CreateKey & { id: string }>({
      query: (data) => ({
        url: `key/${data.id}`,
        method: "PUT",
        data: {
          name: data.name,
          value: data.value,
          vendorId: data.vendorId,
          price: data.price,
          validUntil: data.expirationDate.toISOString(),
          categoryId: data.categoryId,
          tax: data.tax,
        },
      }),
      invalidatesTags: ["Key", "CreatedKeys"],
    }),
    deleteKey: builder.mutation<void, string>({
      query: (id) => ({
        url: `key/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Key", "CreatedKeys"],
    }),
    createdKeys: builder.query<
      PaginatedData<Key>,
      { page: number; size: number }
    >({
      queryFn: async (arg, { getState }, _, baseQuery) => {
        const email = (getState() as RootState).auth.emailAddress;
        const { page, size } = arg;
        try {
          const keys = (await baseQuery({
            url: `key/find`,
            method: "GET",
            params: { email, page, size },
          })) as unknown as { data: PaginatedData<Key> };
          return { data: keys.data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["CreatedKeys"],
    }),
  }),
});
export const {
  useGetKeysQuery,
  useCreateKeyMutation,
  useCreatedKeysQuery,
  useDeleteKeyMutation,
} = keyApi;
