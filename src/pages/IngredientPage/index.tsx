import { useParams } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux-hooks";

import { IngredientDetails } from "./ingredient-details";

import styles from "./ingredient-page.module.scss";

export const IngredientPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  return (
    <section className={styles.main}>
      {ingredients
        ?.filter((item) => item._id === id)
        .map((item) => (
          <IngredientDetails ingredient={item} key={id} />
        ))}
    </section>
  );
};
