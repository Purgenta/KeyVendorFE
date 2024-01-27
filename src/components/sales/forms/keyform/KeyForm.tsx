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
import { useGetCategoriesQuery } from "../../../../redux/api/category";
import { useGetVendorsQuery } from "../../../../redux/api/vendor";
import { KeyFormProps } from "./types";
import schema from "./schema";
const KeyForm = ({ mode, onSubmit, error }: KeyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(mode)),
  });
  console.log(errors);
  const { data, error: categoriesError } = useGetCategoriesQuery();
  const { data: vendors, error: vendorsError } = useGetVendorsQuery();
  if (!data || !vendors) return <></>;
  if (vendorsError || categoriesError)
    return <Text color={"red.500"}>Something went wrong</Text>;
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      {error && <Text color={"red.500"}>{error}</Text>}
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
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
        <FormControl id="tax" isRequired>
          <FormLabel>Tax</FormLabel>
          <Input type="number" {...register("tax")} />
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
