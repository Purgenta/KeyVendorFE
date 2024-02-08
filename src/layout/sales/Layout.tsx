import { Outlet } from "react-router-dom";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";
import Link from "../../ui/Link/Link";
const Navigation = () => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <UnorderedList
        mb={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
        styleType="none"
      >
        <ListItem>
          <Link
            to="/sales/createkey"
            color="white"
            backgroundColor="teal.500"
            padding="2"
            borderRadius="md"
            _hover={{ textDecoration: "none", backgroundColor: "teal.600" }}
          >
            Create Key
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/sales/createvendor"
            color="white"
            backgroundColor="teal.500"
            padding="2"
            marginTop={"0"}
            borderRadius="md"
            _hover={{ textDecoration: "none", backgroundColor: "teal.600" }}
          >
            Create Vendor
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/sales/orders"
            color="white"
            backgroundColor="teal.500"
            padding="2"
            marginTop={"0"}
            borderRadius="md"
            _hover={{ textDecoration: "none", backgroundColor: "teal.600" }}
          >
            Orders
          </Link>
        </ListItem>
      </UnorderedList>
      <Outlet />
    </Box>
  );
};

export default Navigation;
