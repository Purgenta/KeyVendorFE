// src/components/VendorForm/index.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import schema from "./validation";
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
        <Button mt={4} colorScheme="teal" type="submit">
          Create Vendor
        </Button>
      </form>
    </Box>
  );
};

export default VendorForm;
