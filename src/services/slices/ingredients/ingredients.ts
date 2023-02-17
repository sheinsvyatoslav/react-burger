import { createSlice } from "@reduxjs/toolkit";

import { ThunkActionType } from "../../..";
import { DraggingCard } from "../../../components/constructor-card/constructor-card";
import { Card } from "../../../components/ingredient-card/ingredient-card";
import { getIngredientsRequest } from "../../../utils/main-api";

export type IngredientsState = {
  ingredients: Array<Card> | null;
  getIngredientsState: string;
  selectedIngredient: Card | null;
  constructorIngredients: {
    bun: DraggingCard | null;
    noBunIngredients: Array<DraggingCard> | null;
  };
  ingredientsCount: { [id: string]: number } | null;
};

export const initialState: IngredientsState = {
  ingredients: null,
  getIngredientsState: "idle",

  selectedIngredient: null,
  constructorIngredients: {
    bun: null,
    noBunIngredients: null,
  },
  ingredientsCount: null,
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
      const newId = draggedIngridient._id;
      if (draggedIngridient.type === "bun") {
        state.constructorIngredients.bun = {
          ...draggedIngridient,
          dragId,
        };
      } else {
        state.constructorIngredients.noBunIngredients = [
          ...(state.constructorIngredients.noBunIngredients ?? []),
          { ...draggedIngridient, dragId },
        ];
        if (!state.ingredientsCount) {
          state.ingredientsCount = {};
        }
        state.ingredientsCount[newId] = (state.ingredientsCount[newId] || 0) + 1;
      }
    },
    deleteConstructorIngredient(state, action) {
      if (state.constructorIngredients.noBunIngredients) {
        state.constructorIngredients.noBunIngredients =
          state.constructorIngredients.noBunIngredients.filter(
            (item) => item.dragId !== action.payload.dragId
          );
      }

      if (state.ingredientsCount) {
        state.ingredientsCount[action.payload._id] -= 1;
      }
    },
    updateConstructorList(state, action) {
      state.constructorIngredients.noBunIngredients = [...action.payload];
    },
    clearConstructor(state) {
      state.constructorIngredients = initialState.constructorIngredients;
      state.ingredientsCount = initialState.ingredientsCount;
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
