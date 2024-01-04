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
};
