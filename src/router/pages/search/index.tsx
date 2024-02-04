import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import SearchFilter from "../../../components/SearchFilter";
import { useGetKeysQuery } from "../../../redux/api/key";
import { SearchFilterValues } from "../../../components/SearchFilter/types";
const Search = () => {
  const { isError, data } = useGetKeysQuery();
  const [formValues, setFormValues] = useState<SearchFilterValues>({
    name: "",
    price: 0,
    categoryId: 0,
    vendorId: 0,
  });
  return (
    <Box>
      <Heading>Search</Heading>
      <SearchFilter onSearchSubmit={(values) => console.log(values)} />
    </Box>
  );
};

export default Search;
