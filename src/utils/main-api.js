import {
  request,
  INGREDIENTS_URL,
  ORDERS_URL,
  USER_URL,
} from "./api-constants";
import { getCookie } from "./cookie";

export const getIngredientsRequest = () => request(INGREDIENTS_URL, {});

export const createOrderRequest = (ingredients) =>
  request(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients,
    }),
  });

export const getUserRequest = () =>
  request(USER_URL, {
    headers: {
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });

export const updateUserRequest = ({ email, password, name }) =>
  request(USER_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
