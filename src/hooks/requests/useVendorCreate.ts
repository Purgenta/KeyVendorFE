import { useState } from "react";
import useAuthenticatedAxios from "../../data/useAxios";
import apiEndpoints from "../../data/api";
const useVendorCreate = () => {
  const [error, setError] = useState("");
  const axios = useAuthenticatedAxios();
  const sendVendorCreate = async (name: string) => {
    await axios.post(apiEndpoints.vendor.create, { name });
  };
  return { error, setError, sendVendorCreate };
};
export default useVendorCreate;
