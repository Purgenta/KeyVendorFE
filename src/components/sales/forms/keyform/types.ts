import { Vendor, Category } from "../../../../types";
export type { Vendor, Category };
export type KeyFormProps = {
  mode: "create" | "edit";
  onSubmit: (data: any) => void;
  error: string;
};
