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

const checkResponse = (res: Response) =>
  res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err));

const checkSuccess = (res: { success: boolean } & any) => {
  if (res && res.success) {
    return res;
  } else throw Error("no data");
};

export const request = (url: string, options: RequestInit) =>
  fetch(url, options).then(checkResponse).then(checkSuccess);
