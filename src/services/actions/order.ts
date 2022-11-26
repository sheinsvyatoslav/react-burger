import { createOrderRequest } from "../../utils/main-api";
import { refreshToken } from "./auth";
import { TThunkAction } from "../../utils/constants";
import { TDraggingCard } from "../../utils/constants";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";

export const createOrder = (ingredients: Array<string>): TThunkAction => {
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
        console.log(err);
        if (err.message === "jwt expired") {
          dispatch(refreshToken(createOrder(ingredients)));
        } else {
          dispatch({ type: CREATE_ORDER_FAILED });
        }
      });
  };
};

export const getTotalPrice = (bun: TDraggingCard, noBunIngredients: Array<TDraggingCard>) => ({
  type: GET_TOTAL_PRICE,
  bun,
  noBunIngredients,
});
