import apiEndpoints from "../../data/api";
import axios from "../../data/axios";
import { useState } from "react";
const useRegister = () => {
  const [error, setError] = useState<null | unknown>(null);
  const sendRegisterRequest = async (email: string) => {
    try {
      await axios.post(apiEndpoints.user.create, { user: { email } });
    } catch (error) {
      setError(error);
      return error;
    }
  };
  return { sendRegisterRequest, error, setError };
};
export default useRegister;
