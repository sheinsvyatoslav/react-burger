import {
  request,
  REGISTER_URL,
  RESTORE_URL,
  LOGIN_URL,
  LOGOUT_URL,
} from "./api-constants";

export const registerRequest = ({ email, password, name }) =>
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

export const restorePasswordRequest = (email) =>
  request(RESTORE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

export const resetPasswordRequest = ({ password, token }) =>
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

export const loginRequest = ({ email, password }) =>
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

export const logoutRequest = (token) =>
  request(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
