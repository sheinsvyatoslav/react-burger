import { request } from "./api-constants";
import { getCookie } from "./cookie";

const BASE_URL = "https://norma.nomoreparties.space/api";

type ResetPasswordRequest = {
  token: string;
  password: number;
};

type LoginRequest = {
  email: string;
  password: number;
};

type RegisterRequest = { name: string } & LoginRequest;

export const registerRequest = ({ email, password, name }: RegisterRequest) =>
  request(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

export const restorePasswordRequest = (email: string) =>
  request(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

export const resetPasswordRequest = ({ password, token }: ResetPasswordRequest) =>
  request(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, token }),
  });

export const loginRequest = ({ email, password }: LoginRequest) =>
  request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

export const logoutRequest = () =>
  request(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });

export const refreshTokenRequest = () =>
  request(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
