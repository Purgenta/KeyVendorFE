import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";
import schema from "./validation";
import { useGetCategoriesQuery } from "../../../../redux/api/category";
import { useGetVendorsQuery } from "../../../../redux/api/vendor";
const KeyForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data, error } = useGetCategoriesQuery();
  const { data: vendors, error: vendorsError } = useGetVendorsQuery();
  if (!data || !vendors) return <></>;
  if (error || vendorsError)
    return <Text color={"red.500"}>Something went wrong</Text>;
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit(() => {})}>
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
          <Input
            accept="image/png, image/gif, image/jpeg"
            type="file"
            {...register("image")}
          />
        </FormControl>
        <FormControl id="price" isRequired>
          <FormLabel>Price</FormLabel>
          <Input type="number" {...register("price")} />
        </FormControl>
        <FormControl id="expirationDate" isRequired>
          <FormLabel>Expiration Date</FormLabel>
          <Input type="date" {...register("expirationDate")} />
        </FormControl>
        <FormControl id="category" isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" {...register("category")}>
            {data.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create Key
        </Button>
      </form>
    </Box>
  );
};

export default KeyForm;
