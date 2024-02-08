import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import style from "./index.module.css";
import {
  useFindByBuyerQuery,
  useStatusOptionsQuery,
} from "../../../redux/api/order";
import { Text } from "@chakra-ui/react";
const Orders = () => {
  const [pagination, setPagination] = React.useState({ page: 1, size: 10 });
  const { data } = useFindByBuyerQuery(pagination);
  const { data: orderStatus } = useStatusOptionsQuery();
  return (
    <Box>
      Orders
      {orderStatus && (
        <Flex flexDirection={"column"} gap={3}>
          {data?.data.map((order) => {
            return (
              <Box key={order.id}>
                <Box>{order.id}</Box>
                <Box>
                  Status:
                  {
                    orderStatus.find(
                      (status) => status.value === order.orderStatus
                    )?.name
                  }
                </Box>
                {order.keys.map((key) => {
                  return (
                    <Box key={key.id}>
                      {key.name}
                      <Text>{key.value || ""}</Text>
                    </Box>
                  );
                })}
                <Box>{order.createdAt}</Box>
              </Box>
            );
          })}
        </Flex>
      )}
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

export default Orders;
