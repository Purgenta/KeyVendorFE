import { PaginatedData } from "../../../types";
import { emptySplitApi } from "../baseQuery";
import { CreateOrderArgs, FindByBuyerArgs, Order, OrderStatus } from "./types";
export const orderApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<void, CreateOrderArgs>({
      query: (order) => ({
        url: "order/create",
        method: "POST",
        data: { keys: [order.id] },
      }),
    }),
    findByBuyer: builder.query<PaginatedData<Order>, FindByBuyerArgs>({
      query: (params) => ({
        url: "order/findbybuyer",
        method: "GET",
        params: params,
      }),
      providesTags: ["FindByBuyer"],
    }),
    findBySeller: builder.query<PaginatedData<Order>, FindByBuyerArgs>({
      query: (params) => ({
        url: "order/findbyseller",
        method: "GET",
        params: params,
      }),
      providesTags: ["FindBySeller"],
    }),
    statusOptions: builder.query<OrderStatus[], void>({
      query: () => ({
        url: "order/status/options",
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `order/update/${id}`,
        method: "PUT",
        data: { status },
      }),
      invalidatesTags: ["FindByBuyer", "FindBySeller"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFindByBuyerQuery,
  useStatusOptionsQuery,
  useFindBySellerQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
