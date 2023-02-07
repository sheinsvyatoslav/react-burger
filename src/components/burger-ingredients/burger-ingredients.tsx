import { useInView } from "react-intersection-observer";

import { BurgerIngredientsSection } from "../burger-ingredients-section/burger-ingredients-section";
import { BurgerNavigation } from "../burger-navigation/burger-navigation";

import styles from "./burger-ingredients.module.scss";

const INGREDIENT_TYPES = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

export const BurgerIngredients = () => {
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });
  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });

  return (
    <section className={`${styles.container} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerNavigation inViewBuns={inViewBuns} inViewSauces={inViewSauces} inViewFilling={inViewFilling} />
      <div className={styles.sections}>
        <BurgerIngredientsSection name={`Булки`} category={INGREDIENT_TYPES.BUN} innerRef={bunsRef} />

        <BurgerIngredientsSection name={`Соусы`} category={INGREDIENT_TYPES.SAUCE} innerRef={saucesRef} />

        <BurgerIngredientsSection name={`Начинки`} category={INGREDIENT_TYPES.MAIN} innerRef={mainsRef} />
      </div>
    </section>
  );
};
