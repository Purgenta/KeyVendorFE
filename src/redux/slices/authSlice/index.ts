import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { AuthenticateUserActionPayload } from "./type";
import { InitialState } from "./type";
const initialState: InitialState = {
  emailAddress: undefined,
  roles: undefined,
  jwtToken: undefined,
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
        payload: { emailAddress, jwtToken, roles },
      } = payload;
      state.emailAddress = emailAddress;
      state.jwtToken = jwtToken;
      state.roles = roles;
      state.isAuthenticated = true;
      state.failedLoginAttempts = 0;
    },
    increaseFailedLoginAttempts: (state) => {
      state.failedLoginAttempts += 1;
    },
    updateToken: (state, payload: PayloadAction<string>) => {
      state.jwtToken = payload.payload;
    },
    logout: (state) => {
      state.emailAddress = undefined;
      state.jwtToken = undefined;
      state.roles = undefined;
      state.isAuthenticated = false;
      state.failedLoginAttempts = 0;
    },
  },
});
export default authSlice.reducer;
export const {
  authenticate,
  increaseFailedLoginAttempts,
  logout,
  updateToken,
} = authSlice.actions;
export const authSelector = (store: RootState) => store.auth;
