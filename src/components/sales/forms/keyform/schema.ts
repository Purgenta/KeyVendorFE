import * as yup from "yup";
const schema = (mode: "create" | "edit") =>
  yup.object().shape({
    name: yup.string().required(),
    vendorId: yup.string().required(),
    image: yup.mixed().required(),
    price: yup.number().required().positive(),
    expirationDate: yup.date().required().min(new Date()),
    categoryId: yup.string().required(),
    value: yup.string().required(),
    tax: yup.number().required().positive(),
    photo:
      mode === "edit" ? yup.mixed() : yup.mixed().required("Photo is required"),
  });
export default schema;
