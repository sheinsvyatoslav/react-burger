import { createOrderRequest } from "../../utils/main-api";
import { refreshToken } from "./auth";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";

export const createOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    createOrderRequest(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            orderNumber: res.order.number,
          });
        } else {
          dispatch({ type: CREATE_ORDER_FAILED });
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        if (err.message === "invalid token") {
          dispatch(refreshToken(createOrder()));
        } else {
          dispatch({ type: CREATE_ORDER_FAILED });
        }
      });
  };
};

export const getTotalPrice = (bun, noBunIngredients) => ({
  type: GET_TOTAL_PRICE,
  bun,
  noBunIngredients,
});
