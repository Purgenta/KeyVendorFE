import { Link as ReactRouterLink } from "react-router-dom";
import { LinkProps } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
const Link = (props: Omit<LinkProps, "href"> & { to: string }) => {
  return <ChakraLink {...props} as={ReactRouterLink}></ChakraLink>;
};

export default Link;
