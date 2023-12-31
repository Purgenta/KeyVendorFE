// api.ts
import { FetchBaseQueryError, createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../baseQuery";
import { base } from "../index";
import { authenticate } from "../../slices/authSlice/index";
import { increaseFailedLoginAttempts } from "../../slices/authSlice/index";
import {
  AuthRequestParams,
  AuthenticationResponse,
  ValidationToken,
} from "./types";
const baseUrl = `${base}/auth`;
export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthenticationResponse, AuthRequestParams>({
      async queryFn(arg, api, _, baseQuery) {
        const { emailAddress } = arg;
        const { dispatch } = api;
        const { data, error } = await baseQuery({
          method: "POST",
          url: "/login",
          data: { emailAddress },
        });
        if (error) {
          dispatch(increaseFailedLoginAttempts());
          return { error: error as FetchBaseQueryError };
        }
        const { verificationToken } = data as ValidationToken;
        const authenticationResponse = await baseQuery({
          url: `${verificationToken}/completeLogin`,
          method: "GET",
        });
        if (authenticationResponse.error) {
          dispatch(increaseFailedLoginAttempts());
          return { error: authenticationResponse.error as FetchBaseQueryError };
        }
        dispatch(
          authenticate(authenticationResponse.data as AuthenticationResponse)
        );
        return { data: authenticationResponse.data as AuthenticationResponse };
      },
    }),
    register: builder.mutation({
      query: ({ emailAdress }) => ({
        url: "/register",
        method: "GET",
        body: { emailAdress },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = api;
