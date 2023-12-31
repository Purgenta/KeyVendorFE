// LoginForm.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validation";
import { useLoginMutation } from "../../redux/api/auth/index";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

const LoginForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [sendLoginRequest, { isLoading, isError }] = useLoginMutation();
  const toast = useToast();

  const onSubmit = (data: { email: string }) => {
    sendLoginRequest({ emailAddress: data.email })
      .unwrap()
      .then(() => toast({ description: "Succesfully registered the user" }))
      .catch(() => toast({ description: "Error while registering" }));
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      {isError && (
        <Text marginBottom={4} color="red.500">
          Error during login
        </Text>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email")} />
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
