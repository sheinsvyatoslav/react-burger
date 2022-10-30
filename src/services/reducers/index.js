import { combineReducers } from "redux";
import { ingredientsReducer } from "../reducers/ingredients";
import { popupReducer } from "../reducers/popups";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  popups: popupReducer,
  order: orderReducer,
});
