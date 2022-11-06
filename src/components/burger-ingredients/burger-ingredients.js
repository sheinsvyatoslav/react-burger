import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";

import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerNavigation from "../burger-navigation/burger-navigation";
import BurgerIngredientsSection from "../burger-ingredients-section/burger-ingredients-section";
import Modal from "../modal/modal";

import { INGREDIENT_TYPES } from "../../utils/constants";
import { closeIngredientPopup } from "../../services/actions/popups";

import burgerIngredientsStyles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });
  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });

  const handleClosePopup = useCallback(() => {
    dispatch(closeIngredientPopup());
    history.replace("/");
  }, [dispatch, history]);

  return (
    <section className={`${burgerIngredientsStyles.container} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation
        inViewBuns={inViewBuns}
        inViewSauces={inViewSauces}
        inViewFilling={inViewFilling}
      />
      <div className={burgerIngredientsStyles.sections}>
        <BurgerIngredientsSection
          name={`Булки`}
          category={INGREDIENT_TYPES.BUN}
          innerRef={bunsRef}
        />

        <BurgerIngredientsSection
          name={`Соусы`}
          category={INGREDIENT_TYPES.SAUCE}
          innerRef={saucesRef}
        />

        <BurgerIngredientsSection
          name={`Начинки`}
          category={INGREDIENT_TYPES.MAIN}
          innerRef={mainsRef}
        />
      </div>
      <Modal
        isOpened={JSON.parse(localStorage.getItem("isPopupOpened"))}
        handleClosePopup={handleClosePopup}
        title="Детали ингридиента"
      >
        <IngredientDetails
          ingredient={JSON.parse(localStorage.getItem("ingredient")) || {}}
        />
      </Modal>
    </section>
  );
};

export default BurgerIngredients;
