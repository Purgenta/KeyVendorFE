import { Role } from "../../../types";
export type AuthRequestParams = {
  emailAddress: string;
};
export type ValidationToken = {
  validationToken: string;
};
export type AuthenticationResponse = {
  roles: Role[];
  jwtToken: string;
  emailAddress: string;
  money: number;
};
