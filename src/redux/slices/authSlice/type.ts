import { Role } from "../../../types";
type InitialState = {
  emailAddress: string | undefined;
  roles: undefined | Role[];
  jwtToken: string | undefined;
  isAuthenticated: boolean;
  failedLoginAttempts: number;
  money: number;
};
export type AuthenticateUserActionPayload = {
  emailAddress: string;
  jwtToken: string;
  roles: Role[];
  money: number;
};
export type { InitialState };
