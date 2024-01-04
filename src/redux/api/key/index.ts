import { emptySplitApi } from "../baseQuery";
import type { CreateKey, Key } from "./types";
export const keyApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getKeys: builder.query<Key[], void>({
      query: () => ({
        url: "key/",
        method: "GET",
      }),
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
        console.log(formData);
        return {
          url: "key/create",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "form-data",
          },
        };
      },
    }),
  }),
});
export const { useGetKeysQuery, useCreateKeyMutation } = keyApi;
