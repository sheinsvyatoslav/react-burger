import { combineReducers } from "redux";
import ingredientsReducer from "../slices/ingredients";
import popupReducer from "../slices/popups";
import orderReducer from "../slices/order";
import authReducer from "../slices/auth";
import userReducer from "../slices/user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  popups: popupReducer,
  order: orderReducer,
  auth: authReducer,
  user: userReducer,
});
