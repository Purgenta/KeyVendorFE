import { PaginatedData } from "../../../types";
import { emptySplitApi } from "../baseQuery";
import {
  CreateOrderArgs,
  FindByBuyerArgs,
  Order,
  OrderStatus,
  OverviewQueryArgs,
} from "./types";
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
    overview: builder.query<any, OverviewQueryArgs>({
      query: () => ({
        url: "order/overview",
        method: "GET",
      }),
    }),
    find: builder.query<
      PaginatedData<Order>,
      FindByBuyerArgs & { seller?: string; buyer?: string }
    >({
      query: () => ({
        url: "order/find",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFindByBuyerQuery,
  useStatusOptionsQuery,
  useFindBySellerQuery,
  useUpdateOrderStatusMutation,
  useOverviewQuery,
  useFindQuery,
} = orderApi;
