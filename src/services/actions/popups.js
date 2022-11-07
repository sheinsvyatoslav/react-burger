export const OPEN_ORDER_DETAILS_POPUP = "OPEN_ORDER_DETAILS_POPUP";
export const CLOSE_INGREDIENT_DETAILS_POPUP = "CLOSE_INGREDIENT_DETAILS_POPUP";
export const CLOSE_ORDER_DETAILS_POPUP = "CLOSE_ORDER_DETAILS_POPUP";

export const closeIngredientPopup = () => (dispatch) =>
  dispatch({ type: CLOSE_INGREDIENT_DETAILS_POPUP });

export const openOrderDetailsPopup = () => ({ type: OPEN_ORDER_DETAILS_POPUP });
export const closeOrderPopup = () => ({ type: CLOSE_ORDER_DETAILS_POPUP });
