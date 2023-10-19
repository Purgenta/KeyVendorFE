import { Role } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type InitialState = {
  email: string;
  roles: undefined | Role[];
  jwt: string;
};
const initialState: InitialState = {
  email: "",
  roles: undefined,
  jwt: "",
};
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authenticate: (state, payload: PayloadAction<InitialState>) => {
      const {
        payload: { email, jwt, roles },
      } = payload;
      state.email = email;
      state.jwt = jwt;
      state.roles = roles;
    },
  },
});
export default authSlice.reducer;
export const { authenticate } = authSlice.actions;
export const authSelector = (store: RootState) => store.auth;
