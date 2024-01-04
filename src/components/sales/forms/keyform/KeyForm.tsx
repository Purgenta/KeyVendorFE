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
import { useCreateKeyMutation } from "../../../../redux/api/key";
const KeyForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data, error } = useGetCategoriesQuery();
  const { data: vendors, error: vendorsError } = useGetVendorsQuery();
  const [createKey, { isLoading }] = useCreateKeyMutation();
  if (!data || !vendors) return <></>;
  if (error || vendorsError)
    return <Text color={"red.500"}>Something went wrong</Text>;
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form
        onSubmit={handleSubmit((data) => {
          createKey(data);
        })}
      >
        <FormControl id="name" isRequired>
          <FormLabel>Key Name</FormLabel>
          <Input type="text" {...register("name")} />
        </FormControl>
        <FormControl id="value" isRequired>
          <FormLabel>Value</FormLabel>
          <Input type="text" {...register("value")} />
        </FormControl>
        <FormControl id="vendorId" isRequired>
          <FormLabel>Vendor</FormLabel>
          <Select placeholder="Select vendor" {...register("vendorId")}>
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
        <FormControl id="categoryId" isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" {...register("categoryId")}>
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
