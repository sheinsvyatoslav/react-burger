import { createSlice } from "@reduxjs/toolkit";

import { ThunkActionType } from "../../..";
import { Order } from "../../../components/order-card/order-card";
import { createOrderRequest, getOrderByNumberRequest } from "../../../utils/main-api";
import { refreshToken } from "../auth/auth";

export type OrderState = {
  createOrderState: string;
  getOrderByNumberState: string;
  selectedOrder: Order | null;
  orderNumber: number;
};

export const initialState: OrderState = {
  createOrderState: "idle",
  getOrderByNumberState: "idle",
  selectedOrder: null,
  orderNumber: 0,
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
  },
});

export const {
  createOrderPending,
  createOrderSuccess,
  createOrderFailed,
  getOrderByNumberPending,
  getOrderByNumberSuccess,
  getOrderByNumberFailed,
} = orderSlice.actions;

export const createOrder = (ingredients: Array<string>): ThunkActionType => {
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

export const getOrderByNumber = (number: number): ThunkActionType => {
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
