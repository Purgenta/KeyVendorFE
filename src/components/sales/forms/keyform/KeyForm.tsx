// src/components/KeyForm/index.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import schema from "./validation";

const KeyForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const vendors = []; // TODO: Get vendors from </API>
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="name" isRequired>
          <FormLabel>Key Name</FormLabel>
          <Input type="text" {...register("name")} />
        </FormControl>
        <FormControl id="vendor" isRequired>
          <FormLabel>Vendor</FormLabel>
          <Select placeholder="Select vendor" {...register("vendor")}>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="image" isRequired>
          <FormLabel>Image</FormLabel>
          <Input type="file" {...register("image")} />
        </FormControl>
        <FormControl id="price" isRequired>
          <FormLabel>Price</FormLabel>
          <Input type="number" {...register("price")} />
        </FormControl>
        <FormControl id="expirationDate" isRequired>
          <FormLabel>Expiration Date</FormLabel>
          <Input type="date" {...register("expirationDate")} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create Key
        </Button>
      </form>
    </Box>
  );
};

export default KeyForm;
