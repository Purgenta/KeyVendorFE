import { Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import useVendorCreate from "../../../hooks/requests/useVendorCreate";
const schema = yup
  .object({
    name: yup.string().required().min(5),
  })
  .required();
const VendorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const { error, sendVendorCreate, setError } = useVendorCreate();
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await sendVendorCreate(data.name);
          toast({ description: "Successfully added a vendor" });
        } catch (error) {
          setError("Such a vendor already exists");
          toast({ description: "Error while adding a vendor" });
        }
      })}
    >
      <Box my={2}>
        {error ? <Text>{error}</Text> : <></>}
        {errors.name?.message ? <Text>{errors.name.message}</Text> : <></>}
        <label>Name</label>
        <br></br>
        <Input type="text" {...register("name")}></Input>
      </Box>
      <Button type="submit" my={2}>
        Submit
      </Button>
    </form>
  );
};

export default VendorForm;
