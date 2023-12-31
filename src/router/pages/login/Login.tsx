import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useLoginMutation } from "../../../redux/api/auth";
const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();
const Login = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [sendLoginRequest, { isError }] = useLoginMutation();
  const toast = useToast();
  return (
    <Box>
      {isError ? (
        <Text
          marginBottom={"10"}
          color={"red.500"}
        >{`Error during Register`}</Text>
      ) : (
        <></>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await sendLoginRequest({ emailAddress: data.email });
            toast({ description: "Succesfully registered the user" });
          } catch (error) {
            toast({ description: "Error while registering" });
          }
        })}
      >
        <label>Email adress</label>
        <br />
        <input type="string" {...register("email")} />
        <br />
        <Button my={2} type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
