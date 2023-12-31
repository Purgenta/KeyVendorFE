import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { AuthenticateUserActionPayload } from "./type";
import { InitialState } from "./type";
const initialState: InitialState = {
  email: "",
  roles: undefined,
  jwt: "",
  isAuthenticated: false,
  failedLoginAttempts: 0,
};
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authenticate: (
      state,
      payload: PayloadAction<AuthenticateUserActionPayload>
    ) => {
      const {
        payload: { email, jwt, roles },
      } = payload;
      state.email = email;
      state.jwt = jwt;
      state.roles = roles;
      state.isAuthenticated = true;
      state.failedLoginAttempts = 0;
    },
    increaseFailedLoginAttempts: (state) => {
      state.failedLoginAttempts += 1;
    },
  },
});
export default authSlice.reducer;
export const { authenticate, increaseFailedLoginAttempts } = authSlice.actions;
export const authSelector = (store: RootState) => store.auth;
