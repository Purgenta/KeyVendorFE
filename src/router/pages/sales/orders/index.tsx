import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import style from "./index.module.css";

import { Text } from "@chakra-ui/react";
import {
  useStatusOptionsQuery,
  useFindBySellerQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/api/order";
const Orders = () => {
  const [pagination, setPagination] = React.useState({ page: 1, size: 10 });
  const { data } = useFindBySellerQuery(pagination);
  const [updateStatus] = useUpdateOrderStatusMutation();
  const { data: orderStatus } = useStatusOptionsQuery();
  const accepted = orderStatus?.find((status) => status.name === "Completed");
  const rejected = orderStatus?.find((status) => status.name === "Cancelled");
  return (
    <Box>
      Orders
      {orderStatus && (
        <Flex flexDirection={"column"} gap={3}>
          {data?.data.map((order) => {
            const status = orderStatus.find(
              (status) => status.value === order.orderStatus
            );
            return (
              <Flex key={order.id} flexDirection={"column"} gap={3}>
                <Box>
                  <Box>Id: {order.id}</Box>
                  <Box>
                    Status:
                    {status?.name}
                  </Box>
                  <Text>Keys:</Text>
                  {order.keys.map((key) => {
                    return (
                      <Box key={key.id}>
                        {key.name}
                        <Text></Text>
                      </Box>
                    );
                  })}
                  <Box>
                    Created at: {new Date(order.createdAt).toDateString()}
                  </Box>
                </Box>
                <Box>
                  {status?.name === "Pending" ? (
                    <>
                      <Button
                        onClick={() => {
                          updateStatus({
                            status: accepted?.name || "",
                            id: order.id,
                          });
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => {
                          updateStatus({
                            status: rejected?.name || "",
                            id: order.id,
                          });
                        }}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}
                </Box>
              </Flex>
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
