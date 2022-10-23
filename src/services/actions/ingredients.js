import { getIngredientsRequest } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_INGREDIENT_DETAILS = "ADD_INGREDIENT_DETAILS";
export const DELETE_INGREDIENT_DETAILS = "DELETE_INGREDIENT_DETAILS";
export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const UPDATE_CONSTRUCTOR_LIST = "UPDATE_CONSTRUCTOR_LIST";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
