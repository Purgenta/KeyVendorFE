import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import useRegister from "../../../hooks/requests/useRegister";
const Register = () => {
  const { error, sendRegisterRequest } = useRegister();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  return (
    <Box>
      {error ? (
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
            await sendRegisterRequest(data.email);
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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
