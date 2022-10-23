import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  GET_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
  DELETE_CONSTRUCTOR_INGREDIENT,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  selectedIngredient: {},
  constructorIngredients: {},
  ingredientsCount: {},
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        selectedIngredient: action.selectedIngredient,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return { ...state, selectedIngredient: {} };
    }
    case GET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: {
          bun: action.ingredients.find((item) => item.type === "bun"),
          noBunIngredients: action.ingredients.filter(
            (item) => item.type !== "bun"
          ),
        },
      };
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const newItem = action.draggedIngridient;
      const newId = newItem._id;
      const isBun = newItem.type === "bun";
      return {
        ...state,
        ingredientsCount: !isBun
          ? {
              ...state.ingredientsCount,
              [newId]: state.ingredientsCount[newId]
                ? state.ingredientsCount[newId] + 1
                : 1,
            }
          : { ...state.ingredientsCount },
        constructorIngredients: {
          bun: isBun
            ? { ...newItem, dragId: action.dragId }
            : state.constructorIngredients.bun,
          noBunIngredients: !isBun
            ? [
                ...state.constructorIngredients.noBunIngredients,
                { ...newItem, dragId: action.dragId },
              ]
            : state.constructorIngredients.noBunIngredients,
        },
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        ingredientsCount: {
          ...state.ingredientsCount,
          [action.deletedIngredient._id]:
            state.ingredientsCount[action.deletedIngredient._id] - 1,
        },
        constructorIngredients: {
          ...state.constructorIngredients,
          noBunIngredients:
            state.constructorIngredients.noBunIngredients.filter(
              (item) => item.dragId !== action.deletedIngredient.dragId
            ),
        },
      };
    }
    case UPDATE_CONSTRUCTOR_LIST: {
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          noBunIngredients: [...action.newCards],
        },
      };
    }
    default: {
      return state;
    }
  }
};