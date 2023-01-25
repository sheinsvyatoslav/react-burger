import { combineReducers } from "redux";
import ingredientsReducer from "../slices/ingredients/ingredients";
import orderReducer from "../slices/order/order";
import authReducer from "../slices/auth/auth";
import userReducer from "../slices/user/user";
import wsReducer from "../slices/websocket/websocket";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  user: userReducer,
  ws: wsReducer,
});
