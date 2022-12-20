import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/main-api";
import { TThunkAction, TDraggingCard, TCard } from "../../utils/constants";

type TIngredientsState = {
  ingredients: Array<TCard> | null;
  getIngredientsState: string;
  selectedIngredient: TCard | null;
  constructorIngredients: {
    bun: TDraggingCard | null;
    noBunIngredients: Array<TDraggingCard> | null;
  };
  ingredientsCount: { [id: string]: number } | null;
};

const initialState: TIngredientsState = {
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
    getConstructorIngredients(state, action) {
      state.constructorIngredients = action.payload;
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
        state.ingredientsCount[newId] =
          (state.ingredientsCount[newId] || 0) + 1;
      }
    },
    deleteConstructorIngredient(state, action) {
      state.constructorIngredients.noBunIngredients =
        state.constructorIngredients.noBunIngredients!.filter(
          (item) => item.dragId !== action.payload.dragId
        );
      if (state.ingredientsCount) {
        state.ingredientsCount[action.payload._id]--;
      }
    },
    getIngredientsCount(state, action) {
      state.ingredientsCount = action.payload;
    },
    updateConstructorList(state, action) {
      state.constructorIngredients.noBunIngredients = [...action.payload];
    },
    clearConstructor(state) {
      state.constructorIngredients = initialState.constructorIngredients;
    },
    clearIngredientsCount(state) {
      state.ingredientsCount = initialState.ingredientsCount;
    },
  },
});

export const {
  getIngredientsPending,
  getIngredientsSuccess,
  getIngredientsFailed,
  getConstructorIngredients,
  addConstructorIngredient,
  deleteConstructorIngredient,
  getIngredientsCount,
  updateConstructorList,
  clearConstructor,
  clearIngredientsCount,
} = ingredientsSlice.actions;

export const getIngredients = (): TThunkAction => {
  return (dispatch) => {
    dispatch(getIngredientsPending());
    getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data));
        } else {
          dispatch(getIngredientsFailed);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(getIngredientsFailed);
      });
  };
};

export default ingredientsSlice.reducer;
