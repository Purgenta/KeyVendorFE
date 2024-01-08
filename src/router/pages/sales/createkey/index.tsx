import { Box } from "@chakra-ui/react";
import KeyForm from "../../../../components/sales/forms/keyform/KeyForm";
import { useCreateKeyMutation } from "../../../../redux/api/key";
const CreateKey = () => {
  const [createKey, { error }] = useCreateKeyMutation();
  return (
    <Box>
      <KeyForm
        error={error ? "Something went wrong" : ""}
        onSubmit={(data) => createKey(data)}
        mode="create"
      ></KeyForm>
    </Box>
  );
};

export default CreateKey;
