import { shape, string, number } from "prop-types";

// export type Card = {
//   _id: string,
//   name: string,
//   type: string,
//   proteins: number,
//   fat: number,
//   carbohydrates : number,
//   calories: number,
//   price: number,
//   image: string,
//   image_mobile: string,
//   image_large: string,
//   __v: number,
// };

export const cardTypes = shape({
  _id: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  proteins: number.isRequired,
  fat: number.isRequired,
  carbohydrates: number.isRequired,
  calories: number.isRequired,
  price: number.isRequired,
  image: string.isRequired,
  image_mobile: string.isRequired,
  image_large: string.isRequired,
  __v: number.isRequired,
}).isRequired;

export const constructorCardType = shape({
  ...cardTypes,
  dragId: string.isRequired,
}).isRequired;

export const INGREDIENT_TYPES = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};
