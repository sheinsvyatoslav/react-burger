export default function getIngridients() {
  return fetch(INGREDIENTS_URL)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const BASE_API_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;