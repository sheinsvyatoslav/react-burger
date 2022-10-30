const BASE_API_URL = "https://norma.nomoreparties.space/api";
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const request = (url, options) =>
  fetch(url, options).then(checkResponse);
