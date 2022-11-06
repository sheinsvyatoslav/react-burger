import { getCookie, setCookie } from "./cookie";

const BASE_API_URL = "https://norma.nomoreparties.space/api";
const BASE_AUTH_URL = `${BASE_API_URL}/auth`;
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;
export const RESTORE_URL = `${BASE_API_URL}/password-reset`;
export const REGISTER_URL = `${BASE_AUTH_URL}/register`;
export const LOGIN_URL = `${BASE_AUTH_URL}/login`;
export const REFRESH_TOKEN_URL = `${BASE_AUTH_URL}/token`;
export const LOGOUT_URL = `${BASE_AUTH_URL}/logout`;
export const USER_URL = `${BASE_AUTH_URL}/user`;

const refreshTokenRequest = (token) =>
  request(REFRESH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).catch((err) => console.log(err));

export const request = (url, options) =>
  fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 403) {
      refreshTokenRequest(getCookie("refreshToken"))
        .then((res) => {
          if (res && res.success) {
            let authToken = res.accessToken.split("Bearer ")[1];
            setCookie("accessToken", authToken);
            setCookie("refreshToken", res.refreshToken);
            return authToken;
          }
        })
        .then((token) => {
          options.headers.Authorization = "Bearer " + token;
          request(url, options);
        });
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
