import { createSlice } from "@reduxjs/toolkit";

import { ThunkActionType } from "../../..";
import { DraggingCard } from "../../../components/constructor-card/constructor-card";
import { Card } from "../../../components/ingredient-card/ingredient-card";
import { getIngredientsRequest } from "../../../utils/main-api";

export type IngredientsState = {
  ingredients: Array<Card> | null;
  getIngredientsState: string;
  selectedIngredient: Card | null;
  constructorIngredients: Array<DraggingCard> | null;
};

export const initialState: IngredientsState = {
  ingredients: null,
  getIngredientsState: "idle",

  selectedIngredient: null,
  constructorIngredients: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredientsPending(state) {
      state.getIngredientsState = "pending";
    },
    getIngredientsSuccess(state, action) {
      state.getIngredientsState = "success";
      state.ingredients = action.payload;
    },
    getIngredientsFailed(state) {
      state.getIngredientsState = "failed";
    },
    addConstructorIngredient(state, action) {
      const { draggedIngridient, dragId } = action.payload;

      if (draggedIngridient.type === "bun") {
        state.constructorIngredients = [
          ...(state.constructorIngredients ?? []).filter((ingredient) => ingredient.type !== "bun"),
          draggedIngridient,
        ];
      } else {
        state.constructorIngredients = [
          ...(state.constructorIngredients ?? []),
          { ...draggedIngridient, dragId },
        ];
      }
    },
    deleteConstructorIngredient(state, action) {
      if (state.constructorIngredients) {
        state.constructorIngredients = state.constructorIngredients.filter(
          (item) => item.dragId !== action.payload.dragId
        );
      }
    },
    updateConstructorList(state, action) {
      state.constructorIngredients = [...action.payload];
    },
    clearConstructor(state) {
      state.constructorIngredients = initialState.constructorIngredients;
    },
  },
});

export const {
  getIngredientsPending,
  getIngredientsSuccess,
  getIngredientsFailed,
  addConstructorIngredient,
  deleteConstructorIngredient,
  updateConstructorList,
  clearConstructor,
} = ingredientsSlice.actions;

export const getIngredients = (): ThunkActionType => {
  return async (dispatch) => {
    dispatch(getIngredientsPending());
    return getIngredientsRequest()
      .then((res) => {
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
        console.log(err);
      });
  };
};

export default ingredientsSlice.reducer;
