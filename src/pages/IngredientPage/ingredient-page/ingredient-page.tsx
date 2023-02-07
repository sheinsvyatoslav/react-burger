import { useParams } from "react-router-dom";

import { useAppSelector } from "../../../hooks/redux-hooks";
import { Card } from "../../../utils/types";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

import styles from "./ingredient-page.module.scss";

export const IngredientPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  return (
    <section className={styles.main}>
      {ingredients
        ?.filter((item: Card) => item._id === id)
        .map((item: Card) => (
          <IngredientDetails ingredient={item} key={id} />
        ))}
    </section>
  );
};
