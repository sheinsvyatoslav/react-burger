import { combineReducers } from "redux";

import authReducer from "../slices/auth/auth";
import ingredientsReducer from "../slices/ingredients/ingredients";
import orderReducer from "../slices/order/order";
import userReducer from "../slices/user/user";
import wsReducer from "../slices/websocket/websocket";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  user: userReducer,
  ws: wsReducer,
});
