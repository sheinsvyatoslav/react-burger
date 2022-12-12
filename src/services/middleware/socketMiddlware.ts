import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionFailed,
  wsConnectionClosed,
  wsGetAllOrders,
} from "../slices/websocket";
import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../..";
import { TOrder } from "../../utils/constants";

export const socketMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>
) => {
  let socket: WebSocket | null = null;

  return (next) => (action: AnyAction) => {
    const { dispatch } = store;
    if (action.type === wsConnectionStart.type) {
      socket = new WebSocket(`${action.payload}`);
    }

    if (action.type === wsConnectionClosed.type) {
      socket?.close();
    }

    if (socket) {
      socket.onopen = (e) => {
        console.log(e);
        dispatch(wsConnectionSuccess());
      };

      socket.onerror = () => {
        dispatch(wsConnectionFailed());
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        restParsedData.orders.sort(
          (a: TOrder, b: TOrder) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        dispatch(wsGetAllOrders(restParsedData));
      };

      socket.onclose = (e) => {
        console.log(e);
        dispatch(wsConnectionClosed());
      };
    }
    next(action);
  };
};
