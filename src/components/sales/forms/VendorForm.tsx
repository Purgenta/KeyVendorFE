// src/components/VendorForm/index.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    // Add other fields as needed
  })
  .required();

const VendorForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async () => {};
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="name" isRequired>
          <FormLabel>Vendor Name</FormLabel>
          <Input type="text" {...register("name")} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Vendor Email</FormLabel>
          <Input type="email" {...register("email")} />
        </FormControl>
        {/* Add other fields as needed */}
        <Button mt={4} colorScheme="teal" type="submit">
          Create Vendor
        </Button>
      </form>
    </Box>
  );
};

export default VendorForm;
