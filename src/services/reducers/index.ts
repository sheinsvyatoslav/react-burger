import { combineReducers } from "redux";
import ingredientsReducer from "../slices/ingredients";
import orderReducer from "../slices/order";
import authReducer from "../slices/auth";
import userReducer from "../slices/user";
import wsReducer from "../slices/websocket";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  user: userReducer,
  ws: wsReducer,
});
