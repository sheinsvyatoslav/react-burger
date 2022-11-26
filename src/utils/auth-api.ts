import {
  request,
  REGISTER_URL,
  RESTORE_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_TOKEN_URL,
} from "./api-constants";
import { getCookie } from "./cookie";

type TPassword = { password: number }
type TResetPasswordRequest = { token: string } & TPassword
type TLogin = {
  email: string,
} & TPassword
type TRegisterRequest = { name: string } & TLogin

export const registerRequest = ({ email, password, name }: TRegisterRequest) =>
  request(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

export const restorePasswordRequest = (email: string) =>
  request(RESTORE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

export const resetPasswordRequest = ({ password, token }: TResetPasswordRequest) =>
  request(`${RESTORE_URL}/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });

export const loginRequest = ({ email, password }: TLogin) =>
  request(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

export const logoutRequest = () =>
  request(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

export const refreshTokenRequest = () =>
  request(REFRESH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
