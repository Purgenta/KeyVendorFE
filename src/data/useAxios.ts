import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticatedAxios } from "./axios";
import { useNavigate } from "react-router";
import { authSelector, authenticate } from "../redux/authSlice/authSlice";
const useAuthenticatedAxios = () => {
  const { jwt } = useSelector(authSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = authenticatedAxios.interceptors.request.use(
      (config) => {
        if (jwt && !config?.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${jwt}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseInterceptor = authenticatedAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest.sent) {
          previousRequest.sent = true;
          dispatch(authenticate({ email: "", roles: [], jwt: "" }));
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      authenticatedAxios.interceptors.response.eject(responseInterceptor);
      authenticatedAxios.interceptors.request.eject(requestInterceptor);
    };
  }, [jwt, navigate]);
  return authenticatedAxios;
};
export default useAuthenticatedAxios;
