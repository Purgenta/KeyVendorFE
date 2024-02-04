import * as yup from "yup";
export const schema = yup
  .object({
    name: yup.string().optional(),
    categoryId: yup.string().optional(),
    price: yup.number().optional().positive(),
    vendorId: yup.string().optional(),
  })
  .required();
