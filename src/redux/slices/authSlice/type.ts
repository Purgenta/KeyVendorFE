import { Role } from "../../../types";
type InitialState = {
  email: string;
  roles: undefined | Role[];
  jwt: string;
  isAuthenticated: boolean;
  failedLoginAttempts: number;
};
export type AuthenticateUserActionPayload = {
  email: string;
  jwt: string;
  roles: Role[];
};
export type { InitialState };
