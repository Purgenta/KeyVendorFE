import { useState } from "react";
import axios from "../../data/axios";
import apiEndpoints from "../../data/api";
import { useDispatch } from "react-redux";
import { authenticate } from "../../redux/authSlice/authSlice";
import { Role } from "../../types";
const useLogin = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const sendLoginRequest = async (email: string) => {
    try {
      const response = (
        await axios.post(apiEndpoints.auth.login, { emailAddress: email })
      ).data as { validationToken: string };
      const authData = (
        await axios.get(apiEndpoints.auth.verifyToken(response.validationToken))
      ).data as {
        roles: Role[];
        jwtToken: string;
        emailAddress: string;
      };
      dispatch(
        authenticate({
          email: authData.emailAddress,
          jwt: authData.jwtToken,
          roles: authData.roles,
        })
      );
    } catch (error) {
      setError("There was an error logging you in...");
    }
  };
  return { error, setError, sendLoginRequest };
};
export default useLogin;
