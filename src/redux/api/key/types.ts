import { Key } from "../../../types";
export type { Key };
export type CreateKey = {
  name: string;
  vendorId: string;
  image: any;
  price: number;
  expirationDate: Date;
  categoryId: string;
  value: string;
  tax: number;
};
export type KeyFilter = {
  name?: string;
  categoryId?: string;
  price?: string;
  vendorId?: string;
} & KeyPagination;

export type KeyResponse = {
  categoryId: string;
  createdBy: string;
  id: string;
  licensedFor: null;
  name: string;
  price: number;
  vendorId: string;
  validUntil: Date;
};
export type KeyPagination = { page: number; size: number };
