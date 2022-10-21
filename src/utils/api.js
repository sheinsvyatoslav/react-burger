import { request, INGREDIENTS_URL, ORDERS_URL } from './api-constants'

export const getIngredients = () => request(INGREDIENTS_URL, {});

export const createOrder = (ingredients) => {
  return request(ORDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients
    })
  })
};