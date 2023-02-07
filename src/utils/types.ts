import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState } from "..";

export type Card = {
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

export type Order = {
  _id: string;
  name: string;
  number: number;
  status: string;
  createdAt: Date;
  ingredients: ReadonlyArray<string>;
};

export type DraggingCard = { dragId: string } & Card;

export type TThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
