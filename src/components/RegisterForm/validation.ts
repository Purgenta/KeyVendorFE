import * as yup from "yup";
const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();
export default schema;
