import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderRequest,
  getOrderByNumberRequest,
} from "../../utils/main-api";
import { refreshToken } from "./auth";
import { TThunkAction, TCard, TOrder } from "../../utils/constants";
import { clearIngredientsCount } from "./ingredients";

type TOrderState = {
  createOrderState: string;
  getOrderByNumberState: string;
  selectedOrder: TOrder | null;
  orderNumber: number;
  totalPrice: number;
};

const initialState: TOrderState = {
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
      state.getOrderByNumberState = "failed";
    },
    getOrderByNumberPending(state) {
      state.getOrderByNumberState = "pending";
    },
    getOrderByNumberSuccess(state, action) {
      state.getOrderByNumberState = "success";
      state.selectedOrder = action.payload;
    },
    getOrderByNumberFailed(state) {
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
  getOrderByNumberPending,
  getOrderByNumberSuccess,
  getOrderByNumberFailed,
  getTotalPrice,
} = orderSlice.actions;

export const createOrder = (ingredients: Array<string>): TThunkAction => {
  return (dispatch) => {
    dispatch(createOrderPending());
    createOrderRequest(ingredients)
      .then((res) => {
        dispatch(createOrderSuccess({ orderNumber: res.order.number }));
        dispatch(clearIngredientsCount());
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
  return (dispatch) => {
    dispatch(getOrderByNumberPending());
    getOrderByNumberRequest(number)
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
