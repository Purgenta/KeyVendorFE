import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Grid,
  Button,
  useToast,
} from "@chakra-ui/react";
import SearchFilter from "../../../components/SearchFilter";
import { useGetKeysQuery } from "../../../redux/api/key";
import { SearchFilterValues } from "../../../components/SearchFilter/types";
import ReactPaginate from "react-paginate";
import style from "./index.module.css";
import { baseUrl } from "../../../redux/api/baseQuery";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slices/authSlice";
import { useCreateOrderMutation } from "../../../redux/api/order";
const Search = () => {
  const [formValues, setFormValues] = useState<SearchFilterValues>({});
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [query, setQuery] = useState({ ...formValues, ...pagination });
  const { money } = useSelector(authSelector);
  const [createOrder] = useCreateOrderMutation();
  const toast = useToast();
  const { data } = useGetKeysQuery(query, { skip: false });
  useEffect(() => {
    setQuery((prev) => ({ ...prev, ...formValues }));
  }, [formValues]);

  useEffect(() => {
    setQuery((prev) => ({ ...prev, ...pagination }));
  }, [pagination]);

  return (
    <Box>
      <Heading>Search</Heading>
      <SearchFilter onSearchSubmit={(values) => setFormValues({ ...values })} />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {data?.data?.map((key) => {
          return (
            <Box className={`${style["key-box"]}`} key={key.id}>
              <Box>
                <Image src={`${baseUrl}key/photo/${key.id}`} />
                <Flex gap={3}>
                  <Text fontSize="xl" fontWeight="bold">
                    {key.name}
                  </Text>
                  <Text color={"blue.500"} fontWeight="semibold">
                    {key.price}
                    {`$`}
                  </Text>
                </Flex>
                <Button
                  onClick={() =>
                    createOrder({ id: key.id })
                      .then(() => {
                        toast({
                          title: "Order created.",
                          description: "Order has been created.",
                          status: "success",
                          duration: 9000,
                          isClosable: true,
                        });
                      })
                      .catch(() => {
                        toast({
                          title: "Error",
                          description: "Error creating the order",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                        });
                      })
                  }
                  backgroundColor={"blackAlpha.300"}
                  disabled={money < key.price}
                >
                  Order
                </Button>
              </Box>
            </Box>
          );
        })}
      </Grid>
      <ReactPaginate
        pageCount={data?.pagination.pageCount || 0}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        className={style.pagination}
        onPageChange={(page) =>
          setPagination({ ...pagination, page: page.selected + 1 })
        }
      ></ReactPaginate>
    </Box>
  );
};

export default Search;
