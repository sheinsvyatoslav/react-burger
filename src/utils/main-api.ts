import { INGREDIENTS_URL, ORDERS_URL, request, USER_URL } from "./api-constants";
import { getCookie } from "./cookie";

type TUpdateUserRequest = {
  email: string;
  password: number;
  name: string;
};

export const getIngredientsRequest = () => {
  return request(INGREDIENTS_URL);
};

export const createOrderRequest = (ingredients: Array<string>) => {
  return request(ORDERS_URL, {
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
  return request(`${ORDERS_URL}/${number}`);
};

export const getUserRequest = () => {
  return request(USER_URL, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
};

export const updateUserRequest = ({ email, password, name }: TUpdateUserRequest) => {
  return request(USER_URL, {
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
