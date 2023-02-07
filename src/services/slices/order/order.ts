import { createSlice } from "@reduxjs/toolkit";

import { createOrderRequest, getOrderByNumberRequest } from "../../../utils/main-api";
import { Card, Order, TThunkAction } from "../../../utils/types";
import { refreshToken } from "../auth/auth";

export type OrderState = {
  createOrderState: string;
  getOrderByNumberState: string;
  selectedOrder: Order | null;
  orderNumber: number;
  totalPrice: number;
};

export const initialState: OrderState = {
  createOrderState: "idle",
  getOrderByNumberState: "idle",
  selectedOrder: null,
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
    getOrderByNumberPending(state) {
      state.getOrderByNumberState = "pending";
    },
    getOrderByNumberSuccess(state, action) {
      state.getOrderByNumberState = "success";
      state.selectedOrder = action.payload;
    },
    getOrderByNumberFailed(state) {
      state.getOrderByNumberState = "failed";
    },
    getTotalPrice(state, action) {
      state.totalPrice =
        action.payload.noBunIngredients?.reduce((acc: number, item: Card) => acc + item.price, 0) +
          action.payload.bun?.price * 2 || 0;
    },
  },
});

export const {
  createOrderPending,
  createOrderSuccess,
  createOrderFailed,
  getOrderByNumberPending,
  getOrderByNumberSuccess,
  getOrderByNumberFailed,
  getTotalPrice,
} = orderSlice.actions;

export const createOrder = (ingredients: Array<string>): TThunkAction => {
  return async (dispatch) => {
    dispatch(createOrderPending());
    return createOrderRequest(ingredients)
      .then((res) => {
        dispatch(createOrderSuccess({ orderNumber: res.order.number }));
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "invalid token" || err.message === "jwt expired") {
          dispatch(refreshToken(createOrder(ingredients)));
        } else {
          dispatch(createOrderFailed());
        }
      });
  };
};

export const getOrderByNumber = (number: number): TThunkAction => {
  return async (dispatch) => {
    dispatch(getOrderByNumberPending());
    return getOrderByNumberRequest(number)
      .then((res) => {
        dispatch(getOrderByNumberSuccess(res.orders[0]));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getOrderByNumberFailed());
      });
  };
};

export default orderSlice.reducer;
