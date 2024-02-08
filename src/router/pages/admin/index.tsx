import React from "react";
import { Box } from "@chakra-ui/react";
import { useOverviewQuery } from "../../../redux/api/order";
const Admin = () => {
  const { data } = useOverviewQuery();
  return <Box>Admin</Box>;
};

export default Admin;
