import { request } from "./api-constants";
import { getCookie } from "./cookie";

const BASE_URL = "https://norma.nomoreparties.space/api";

type UpdateUserRequest = {
  email: string;
  password: number;
  name: string;
};

export const getIngredientsRequest = () => {
  return request(`${BASE_URL}/ingredients`);
};

export const createOrderRequest = (ingredients: Array<string>) => {
  return request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};

export const getOrderByNumberRequest = (number: number) => {
  return request(`${BASE_URL}/orders/${number}`);
};

export const getUserRequest = () => {
  return request(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
};

export const updateUserRequest = ({ email, password, name }: UpdateUserRequest) => {
  return request(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};
