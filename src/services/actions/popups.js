import history from "../../utils/history";

export const OPEN_INGREDIENT_DETAILS_POPUP = "OPEN_INGREDIENT_DETAILS_POPUP";
export const OPEN_ORDER_DETAILS_POPUP = "OPEN_ORDER_DETAILS_POPUP";
export const CLOSE_INGREDIENT_DETAILS_POPUP = "CLOSE_INGREDIENT_DETAILS_POPUP";
export const CLOSE_ORDER_DETAILS_POPUP = "CLOSE_ORDER_DETAILS_POPUP";

export const openIngedientDetailsPopup =
  ({ id, ingredient }) =>
  (dispatch) => {
    localStorage.setItem("isPopupOpened", true);
    localStorage.setItem("ingredient", JSON.stringify(ingredient));
    dispatch({ type: OPEN_INGREDIENT_DETAILS_POPUP });
    history.push(`/ingredients/${id}`);
  };

export const closeIngredientPopup = () => (dispatch) => {
  localStorage.removeItem("isPopupOpened");
  localStorage.removeItem("ingredient");
  dispatch({ type: CLOSE_INGREDIENT_DETAILS_POPUP });
  history.push("/");
};

export const openOrderDetailsPopup = () => ({ type: OPEN_ORDER_DETAILS_POPUP });
export const closeOrderPopup = () => ({ type: CLOSE_ORDER_DETAILS_POPUP });
