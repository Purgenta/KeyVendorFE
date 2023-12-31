import { authenticate } from "../../slices/authSlice/index";
import { increaseFailedLoginAttempts } from "../../slices/authSlice/index";
import { emptySplitApi } from "../baseQuery";
import {
  AuthRequestParams,
  AuthenticationResponse,
  ValidationToken,
} from "./types";
import { AxiosError } from "axios";
export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthenticationResponse, AuthRequestParams>({
      async queryFn(arg, api, _, baseQuery) {
        const { emailAddress } = arg;
        const { dispatch } = api;
        const { data, error } = await baseQuery({
          method: "POST",
          url: "auth/login",
          data: { emailAddress },
        });
        if (error) {
          dispatch(increaseFailedLoginAttempts());
          return { error: error as AxiosError };
        }
        const { verificationToken } = data as ValidationToken;
        const authenticationResponse = await baseQuery({
          url: `${verificationToken}/completeLogin`,
          method: "GET",
        });
        if (authenticationResponse.error) {
          dispatch(increaseFailedLoginAttempts());
          return { error: authenticationResponse.error as AxiosError };
        }
        dispatch(
          authenticate(authenticationResponse.data as AuthenticationResponse)
        );
        return { data: authenticationResponse.data as AuthenticationResponse };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
