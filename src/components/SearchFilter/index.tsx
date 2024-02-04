import { useGetCategoriesQuery } from "../../redux/api/category";
import { useGetVendorsQuery } from "../../redux/api/vendor";
import {
  Box,
  FormLabel,
  Flex,
  Select,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "@chakra-ui/react";
import { schema } from "./validation";
import { SearchFilterProps } from "./types";
const SearchFilter = ({ onSearchSubmit }: SearchFilterProps) => {
  const categories = useGetCategoriesQuery();
  const vendors = useGetVendorsQuery();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  if (categories.isLoading || vendors.isLoading) return <Box>Loading...</Box>;
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit(onSearchSubmit)}>
        <Flex>
          <FormControl id="name">
            <FormLabel>Key Name</FormLabel>
            <Input type="text" {...register("name")} />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price</FormLabel>
            <Input type="number" {...register("price")} />
          </FormControl>
        </Flex>

        <Flex>
          <FormControl id="categoryId">
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category" {...register("categoryId")}>
              {categories.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="vendorId">
            <FormLabel>Vendor</FormLabel>
            <Select placeholder="Select vendor" {...register("vendorId")}>
              {vendors.data?.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Button mt={4} colorScheme="teal" type="submit">
          Search
        </Button>
      </form>
    </Box>
  );
};

export default SearchFilter;
