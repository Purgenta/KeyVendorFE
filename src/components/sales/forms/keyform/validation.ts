import * as yup from "yup";
const schema = yup
  .object({
    name: yup.string().required(),
    vendorId: yup.string().required(),
    image: yup.mixed().required(),
    price: yup.number().required().positive(),
    expirationDate: yup.date().required().min(new Date()),
    categoryId: yup.string().required(),
    value: yup.string().required(),
  })
  .required();
export default schema;
