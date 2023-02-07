import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Order } from "../../../utils/types";

export type WebsocketState = {
  wsConnected: boolean;
  orders: Array<Order> | null;
  total: number;
  totalToday: number;
};

export type WsActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const initialState: WebsocketState = {
  wsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0,
};

const wsSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    wsConnectionStart(state, action) {
      return undefined;
    },
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsConnectionFailed(state) {
      state.wsConnected = false;
    },
    wsConnectionClosed(state) {
      state.wsConnected = false;
    },
    wsGetAllOrders(state, action: any) {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
  },
});

export const { wsConnectionStart, wsConnectionSuccess, wsConnectionFailed, wsConnectionClosed, wsGetAllOrders } =
  wsSlice.actions;

export const wsActions = {
  wsInit: wsConnectionStart.type,
  onOpen: wsConnectionSuccess.type,
  onClose: wsConnectionClosed.type,
  onError: wsConnectionFailed.type,
  onMessage: wsGetAllOrders.type,
};

export default wsSlice.reducer;
