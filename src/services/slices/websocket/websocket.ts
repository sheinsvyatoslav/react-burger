import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";

export type TWebsocketState = {
  wsConnected: boolean;
  allOrders: Array<TOrder> | null;
  totalOrders: number;
  totalToday: number;
};

export type TwsActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const initialState: TWebsocketState = {
  wsConnected: false,
  allOrders: null,
  totalOrders: 0,
  totalToday: 0,
};

const wsSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    wsConnectionStart(state, action) {},
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsConnectionFailed(state) {
      state.wsConnected = false;
    },
    wsConnectionClosed(state) {
      state.wsConnected = false;
    },
    wsGetAllOrders(state, action) {
      const { orders, total, totalToday } = action.payload;
      state.allOrders = orders;
      state.totalOrders = total;
      state.totalToday = totalToday;
    },
  },
});

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionFailed,
  wsConnectionClosed,
  wsGetAllOrders,
} = wsSlice.actions;

export const wsActions = {
  wsInit: wsConnectionStart.type,
  onOpen: wsConnectionSuccess.type,
  onClose: wsConnectionClosed.type,
  onError: wsConnectionFailed.type,
  onMessage: wsGetAllOrders.type,
};

export default wsSlice.reducer;
