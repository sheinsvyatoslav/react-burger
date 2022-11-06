import {
  OPEN_INGREDIENT_DETAILS_POPUP,
  OPEN_ORDER_DETAILS_POPUP,
  CLOSE_INGREDIENT_DETAILS_POPUP,
  CLOSE_ORDER_DETAILS_POPUP,
} from "../actions/popups";

const initialState = {
  isIngredientPopupOpened: false,
  isOrderPopupOpened: false,
};

export const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS_POPUP: {
      return { ...state, isIngredientPopupOpened: true };
    }
    case OPEN_ORDER_DETAILS_POPUP: {
      return { ...state, isOrderPopupOpened: true };
    }
    case CLOSE_INGREDIENT_DETAILS_POPUP: {
      return { ...state, isIngredientPopupOpened: false };
    }
    case CLOSE_ORDER_DETAILS_POPUP: {
      return { ...state, isOrderPopupOpened: false };
    }
    default: {
      return state;
    }
  }
};
