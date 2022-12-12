import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "..";

export type TCard = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TOrder = {
  _id: string;
  name: string;
  number: number;
  status: string;
  createdAt: Date;
  ingredients: ReadonlyArray<string>;
};

export type TDraggingCard = { dragId: string } & TCard;
export type TThunkAction = ThunkAction<void, RootState, unknown, AnyAction>;

export const maxOrderIngredients = 6;
export const INGREDIENT_TYPES = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};
export const BASE_WEBSOCKET_URL = "wss://norma.nomoreparties.space/orders";
