import { FC } from "react";

import { Card } from "../../components/ingredient-card/ingredient-card";

import { IngredientFeature } from "./ingredient-feature";

import styles from "./ingredient-page.module.scss";

type IngredientDetailsProps = {
  ingredient: Card;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({ ingredient }) => {
  const { name, image_large, calories, proteins, fat, carbohydrates } = ingredient;
  return (
    <div>
      <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <div className={styles.container}>
        <img className="mb-4" src={image_large} alt={name} />
        <h2
          className={`${styles.name} text text_type_main-medium mb-8 `}
          data-at-selector="ingredient-details-name"
        >
          {name}
        </h2>
        <div className={styles.infoContainer}>
          <IngredientFeature name="Калории, ккал" value={calories} />
          <IngredientFeature name="Белки, г" value={proteins} />
          <IngredientFeature name="Жиры, г" value={fat} />
          <IngredientFeature name="Углеводы, г" value={carbohydrates} />
        </div>
      </div>
    </div>
  );
};
