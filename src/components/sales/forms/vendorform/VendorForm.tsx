// src/components/VendorForm/index.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import schema from "./validation";
import { useCreateVendorMutation } from "../../../../redux/api/vendor";
import { useToast } from "@chakra-ui/react";
const VendorForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const [createVendor] = useCreateVendorMutation();
  const onSubmit = ({ name }: { name: string }) => {
    createVendor({ name })
      .then(() =>
        toast({
          title: "Vendor created.",
          description: "Vendor has been created.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      )
      .catch(() => {
        console.log("error");
        toast({
          title: "Error",
          description: "Such a vendor already exists",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="name" isRequired>
          <FormLabel>Vendor Name</FormLabel>
          <Input type="text" {...register("name")} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Create Vendor
        </Button>
      </form>
    </Box>
  );
};

export default VendorForm;
