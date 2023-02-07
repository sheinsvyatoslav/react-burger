import { PayloadAction } from "@reduxjs/toolkit";
import { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState } from "../..";
import { WebsocketState, WsActions } from "../slices/websocket/websocket";

export const socketMiddleware =
  (wsActions: WsActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: PayloadAction<string>) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (type === wsInit && socket?.readyState === 1) {
        socket.close();
      }

      if (socket) {
        socket.onopen = (e) => {
          console.log(e);
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event: MessageEvent<string>) => {
          const { data } = event;
          const parsedData = JSON.parse(data) as WebsocketState;
          const { ...restParsedData } = parsedData;

          if (restParsedData.orders) {
            restParsedData.orders.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onclose = (e) => {
          console.log(e);
          dispatch({ type: onClose });
        };
      }
      next(action);
    };
  };
