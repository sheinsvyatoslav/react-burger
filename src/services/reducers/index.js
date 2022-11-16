import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { popupReducer } from "./popups";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  popups: popupReducer,
  order: orderReducer,
  auth: authReducer,
  user: userReducer,
});
