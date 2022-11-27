import { createSlice } from "@reduxjs/toolkit";
import { createOrderRequest } from "../../utils/main-api";
import { refreshToken } from "./auth";
import { TThunkAction, TCard } from "../../utils/constants";

const initialState = {
  createOrderState: "idle",
  orderNumber: 0,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderPending(state) {
      state.createOrderState = "pending";
    },
    createOrderSuccess(state, action) {
      state.createOrderState = "success";
      state.orderNumber = action.payload.orderNumber;
    },
    createOrderFailed(state) {
      state.createOrderState = "failed";
    },
    getTotalPrice(state, action) {
      state.totalPrice =
        action.payload.noBunIngredients?.reduce(
          (acc: number, item: TCard) => acc + item.price,
          0
        ) +
          action.payload.bun?.price * 2 || 0;
    },
  },
});

export const {
  createOrderPending,
  createOrderSuccess,
  createOrderFailed,
  getTotalPrice,
} = orderSlice.actions;

export const createOrder = (ingredients: Array<string>): TThunkAction => {
  return (dispatch) => {
    dispatch(createOrderPending());
    createOrderRequest(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch(createOrderSuccess({ orderNumber: res.order.number }));
        } else {
          dispatch(createOrderFailed());
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "jwt expired") {
          dispatch(refreshToken(createOrder(ingredients)));
        } else {
          dispatch(createOrderFailed());
        }
      });
  };
};

export default orderSlice.reducer;
