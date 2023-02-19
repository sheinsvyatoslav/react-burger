import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { App } from "./components/app/app";
import { socketMiddleware } from "./services/middleware/socketMiddlware";
import { rootReducer } from "./services/reducers/index";
import { wsActions } from "./services/slices/websocket/websocket";
import reportWebVitals from "./reportWebVitals";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkActionType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

reportWebVitals();
