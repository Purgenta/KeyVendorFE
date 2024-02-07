import { emptySplitApi } from "../baseQuery";
import { CreateOrderArgs } from "./types";
export const orderApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<void, CreateOrderArgs>({
      query: (order) => ({
        url: "order/create",
        method: "POST",
        data: { keys: [order.id] },
      }),
    }),
  }),
});
export const { useCreateOrderMutation } = orderApi;
