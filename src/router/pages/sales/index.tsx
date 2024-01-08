import React from "react";
import { Box } from "@chakra-ui/react";
import { useCreatedKeysQuery } from "../../../redux/api/key";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router";
const Sales = () => {
  const { page } = useParams();
  const { data: response } = useCreatedKeysQuery({
    page: Number(page) || 1,
    size: 10,
  });
  console.log(response);
  return (
    <Box>
      {response &&
        response.data?.map((key) => {
          return (
            <Box key={key.id}>
              {key.name}
              <Button variant="contained" color="primary">
                Edit
              </Button>
              <Button variant="contained" color="secondary">
                Delete
              </Button>
            </Box>
          );
        })}
    </Box>
  );
};

export default Sales;
