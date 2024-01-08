export type Role = "Customer" | "Administrator" | "Sales";
export type Category = {
  name: string;
  id: string;
};
export type Vendor = {
  name: string;
  id: string;
};
export type Key = {
  id: string;
  name: string;
  vendor: string;
  image: string;
  price: number;
  expirationDate: Date;
  category: string;
};
export type PaginatedData<T> = {
  data: T[];
  pagination: {
    itemCount: number;
    pageCount: number;
  };
};
