import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../redux/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validation";
import {
  Box,
  Button,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [sendRegisterRequest, { isError: error }] = useRegisterMutation();
  const toast = useToast();

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      {error && (
        <Text marginBottom={4} color="red.500">
          Error during registration
        </Text>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await sendRegisterRequest({ email: data.email });
            toast({ description: "Successfully registered the user" });
          } catch (error) {
            toast({ description: "Error while registering" });
          }
        })}
      >
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email")} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
