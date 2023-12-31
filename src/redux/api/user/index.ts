import { RegisterArgs } from "./types";
import { emptySplitApi } from "../baseQuery";
export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterArgs>({
      query: ({ email }) => ({
        url: "user/create",
        method: "POST",
        data: { user: { email } },
      }),
    }),
  }),
});

export const { useRegisterMutation } = userApi;
