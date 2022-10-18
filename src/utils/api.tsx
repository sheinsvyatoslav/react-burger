export function getIngredients() {
  return fetch(INGREDIENTS_URL)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function createOrder(ingredients: Array<string>) {
  return fetch(ORDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const BASE_API_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDERS_URL = `${BASE_API_URL}/orders`;