import { createOrderRequest } from "../../utils/main-api";
import { refreshToken } from "../actions/auth";
import { TThunkAction, TCard } from "../../utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createOrderFetched: false,
  createOrderFailed: false,
  orderNumber: 0,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderPending(state) {
      state.createOrderFetched = true;
      state.createOrderFailed = false;
    },
    createOrderSuccess(state, action) {
      state.createOrderFetched = false;
      state.orderNumber = action.payload.orderNumber;
    },
    createOrderFailed(state) {
      state.createOrderFailed = true;
      state.createOrderFetched = false;
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
