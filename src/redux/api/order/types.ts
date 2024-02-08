export type CreateOrderArgs = {
  id: string;
};
export type FindByBuyerArgs = {
  status?: number;
  page: number;
  size: number;
};
export type Order = {
  id: string;
  buyerEmail: string;
  sellerEmail: string;
  orderStatus: number;
  keys: [
    {
      value: null | string;
      id: string;
      name: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
  totalCost: 37.4;
};
export type OrderStatus = {
  value: number;
  name: string;
};
export type OverviewQueryArgs = {
  startDate: Date;
  endDate: Date;
};
