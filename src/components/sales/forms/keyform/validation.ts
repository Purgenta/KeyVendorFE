import * as yup from "yup";
const schema = yup
  .object({
    name: yup.string().required(),
    vendor: yup.string().required(),
    image: yup.mixed().required(),
    price: yup.number().required().positive(),
    expirationDate: yup.date().required().min(new Date()),
  })
  .required();
export default schema;
